//pragma solidity >=0.5.0 <0.6.0;   // Not works
pragma experimental ABIEncoderV2;   // It seems that using user-defined struct objects must use this compiler version

//import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bidchain {

    event NewAuction(uint32 auctionId, uint32 endTime, uint256 beginPrice, address seller, string[] itemInfo);
    event Bidding(uint32 auctionId, uint32 endTime, uint256 newPrice, address bidder);
    event Released(uint32 auctionId);
    event Locked(uint32 auctionId);
    event Waited(uint32 auctionId);
    event Closed(uint32 auctionId);


    struct ItemInfo {
        string name;                // Item's name
        string descript;            // Item description
        string imageURL;            // Maybe imgur URL
    }

/*
 * State object is Created when seller call createAuction()
 * State object is Active when some bidder call bidding()
 * State object is Waited when the auction exists bidder and time up
 * State object is Locked when seller send money to the contract
 *                    |
 *                      We use security deposit at auction creation, and don't need this state
 * State object is Released when bidder confirm the deal
 * State object is Closed when the auction is inactive
 */
    enum State { Created, Active, Waited,/* Locked,*/ Released, Closed }

    struct Auction {
        uint32              endTime;    // Auction will close after endTime
        uint256             price;      // Current offered max price
        uint256             deposit;    // security deposit when this auction is created.
        address payable     seller;     // Seller's account address
        address payable     winner;     // After auction closed, the max price's account address
        ItemInfo            itemInfo;   // Item's information, e.g. name, description, imageURL
        State               state;      // Auction's state, see above
    }

    Auction[] public auctions;
    mapping (address => uint32[])   public seller2Auction;
    mapping (uint32 => address)     public auction2Seller;
    uint256 public securityDeposit;
    address payable owner;

    modifier onlySeller(uint32 auctionId) {
        require(msg.sender == auction2Seller[auctionId], "Only seller can call this!");
        _;
    }

    modifier onlyWinner(uint32 auctionId) {
        require(msg.sender == auctions[auctionId].winner, "Only winner can call this!");
        _;
    }

    modifier validAuction(uint32 period, uint32 infoNum) {
        require(period <= 3 days && infoNum == 3, "Invalid auction creation!");
        require(msg.value >= securityDeposit, "Need to send security deposit!");
        _;
    }
    modifier validBidding(uint32 auctionId) {
        require(auctionId < auctions.length, "Invalid auction ID!");
        require(msg.sender.balance >= msg.value, "Insufficient account balance!");
        require(msg.value > auctions[auctionId].price, "Your price is less than current price!");
        require(uint32(now) < auctions[auctionId].endTime, "Auction has closed!");
        require(auctions[auctionId].state == State.Created ||
                auctions[auctionId].state == State.Active, "Auction is inactive!");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not contract owner!");
        _;
    }

    constructor() public {
        securityDeposit = 0.1 ether;   // 600 NTD 2020/05/19
        owner = msg.sender;
    }
/*
 * Create the new auction by seller,
 * you can access seller's auction by first query seller2Auction[seller-address],
 * then auctions[seller2Auction[seller-address][specify-seller's-auction-id]]
 */
    function createAuction(uint32 period,
                           uint256 beginPrice,
                           string[] calldata itemInfo)
                           external
                           payable
                           validAuction(period, uint32(itemInfo.length)) {

        uint32 id = uint32(auctions.push(Auction(uint32(now) + period,
                                                 beginPrice,
                                                 securityDeposit,
                                                 msg.sender,
                                                 address(0),
                                                 ItemInfo(itemInfo[0],
                                                          itemInfo[1],
                                                          itemInfo[2]),
                                                 State.Created))) - 1;
        seller2Auction[msg.sender].push(id);
        auction2Seller[id] = msg.sender;
        emit NewAuction(id, uint32(now) + period, beginPrice, msg.sender, itemInfo);
    }

    function bidding(uint32 auctionId) external payable validBidding(auctionId) {
        if (auctions[auctionId].state == State.Active)
            auctions[auctionId].winner.transfer(auctions[auctionId].price);  // Refund to the original bidder
        auctions[auctionId].winner  = msg.sender;
        auctions[auctionId].price   = msg.value;
        auctions[auctionId].state   = State.Active;
        emit Bidding(auctionId, auctions[auctionId].endTime, msg.value, msg.sender);
    }


    // Checking the time up auctions and emit event
    function checking() external {
        for (uint32 i = 0; i < auctions.length; i++) {
            if (auctions[i].endTime < uint32(now)) {
                if (auctions[i].state == State.Created) {
                    auctions[i].seller.transfer(auctions[i].deposit);
                    auctions[i].state = State.Closed;
                    emit Closed(i);
                }
                else if (auctions[i].state == State.Active) {
                    auctions[i].state = State.Waited;
                    emit Waited(i);
                }
            }
        }
    }

    /*
     * No need this function anymore because we use security deposit at the createAuction()
    function locking(uint32 auctionId) external payable onlySeller(auctionId) {
        require(auctions[auctionId].state == State.Waited, "Invalid state!");
        require(msg.sender.balance >= msg.value && msg.value == auctions[auctionId].price, "Insufficient token!");
        auctions[auctionId].state = State.Locked;
        emit Locked(auctionId);
    }
   */

    function confirm(uint32 auctionId) external onlyWinner(auctionId) {
        require(auctions[auctionId].state == State.Waited, "Invalid state!");
        auctions[auctionId].state = State.Released;
        emit Released(auctionId);
    }

    function release(uint32 auctionId) external onlySeller(auctionId) {
        require(auctions[auctionId].state == State.Released, "Invalid state!");
        auctions[auctionId].seller.transfer(auctions[auctionId].price + auctions[auctionId].deposit);
        auctions[auctionId].state = State.Closed;
        emit Closed(auctionId);
    }
    // Getter and Setter
    function getAuctions() external view returns (Auction[] memory) {
        return auctions;
    }
    function getPrice(uint32 auctionId) external view returns(uint256) {
        require(auctionId < auctions.length);
        return auctions[auctionId].price;
    }
    function getRemainTime(uint32 auctionId) external view returns(uint32) {
        require(auctionId < auctions.length);
        require(uint32(now) < auctions[auctionId].endTime);
        return auctions[auctionId].endTime - uint32(now);
    }
    function getSeller(uint32 auctionId) external view returns(address) {
        require(auctionId < auctions.length);
        return auctions[auctionId].seller;
    }
    function getWinner(uint32 auctionId) external view returns(address) {
        require(auctionId < auctions.length);
        return auctions[auctionId].winner;
    }
    function getItemInfo(uint32 auctionId) external view returns(ItemInfo memory) {
        require(auctionId < auctions.length);
        return auctions[auctionId].itemInfo;
    }
    function setTime(uint32 auctionId, uint32 newTime) external returns(bool) {
        require(auctionId < auctions.length);
        require(msg.sender == auctions[auctionId].seller);
        if (newTime <= uint32(now))
            return false;
        auctions[auctionId].endTime = newTime;
    }
    function setItemInfo(uint32 auctionId, string[] calldata newItemInfo) external returns(bool) {
        require(auctionId < auctions.length);
        require(msg.sender == auctions[auctionId].seller);
        require(newItemInfo.length == 3);
        auctions[auctionId].itemInfo = ItemInfo(newItemInfo[0], newItemInfo[1], newItemInfo[2]);
    }
    function getSecurityDeposit() external view returns(uint256) {
        return securityDeposit;
    }
    function setSecurityDeposit(uint256 newDeposit) external onlyOwner {
        securityDeposit = newDeposit;
    }


}

