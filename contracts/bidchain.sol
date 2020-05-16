//pragma solidity >=0.5.0 <0.6.0;       // Not works
pragma experimental ABIEncoderV2;       // It seems that using user-defined struct objects must use this compiler version

//import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Bidchain {

    event NewAuction(uint32 auctionId, uint32 endTime, uint32 beginPrice, address seller, string[] itemInfo);
    event Bidding(uint32 auctionId, uint32 endTime, uint32 newPrice, address bidder);

    struct ItemInfo {
        string name;                // Item's name
        string descript;            // Item description
        string imageURL;            // Maybe imgur URL
    }
    struct Auction {
        uint32      endTime;        // Auction will close after endTime
        uint32      price;          // Current offered max price
        address     seller;         // Seller's account address
        address     winner;         // After auction closed, the max price's account address
        ItemInfo    itemInfo;
    }

    Auction[] public auctions;
    mapping (address => uint32[]) public seller2Auction;


/*
 * Create the new auction by seller,
 * you can access seller's auction by first query seller2Auction[seller-address],
 * then auctions[seller2Auction[seller-address][specify-seller's-auction-id]]
 */
    function createAuction(uint32 period, uint32 beginPrice, string[] calldata itemInfo) external returns(bool) {
        if (itemInfo.length != 3 || period > 3 days)
            return false;
        uint32 id = uint32(auctions.push(Auction(uint32(now) + period, beginPrice, msg.sender, address(0), ItemInfo(itemInfo[0], itemInfo[1], itemInfo[2])))) - 1;
        seller2Auction[msg.sender].push(id);
        emit NewAuction(id, uint32(now) + period, beginPrice, msg.sender, itemInfo);
        return true;
    }
    
    function bidding(uint32 auctionId, uint32 newPrice) external returns(bool) {
        // Checking auction exists
        if (auctionId >= auctions.length)
            return false;
        // Checking whether auction has closed or newPrice is less than current price
        // Here we can decide the price's offset
        if (uint32(now) > auctions[auctionId].endTime || newPrice <= auctions[auctionId].price)
            return false;
        auctions[auctionId].winner  = msg.sender;
        auctions[auctionId].price   = newPrice;
        emit Bidding(auctionId, auctions[auctionId].endTime, newPrice, msg.sender);
    }

    // Getter and Setter
    function getAuctions() external view returns (Auction[] memory) {
        return auctions;
    }
    function getPrice(uint32 auctionId) external view returns(uint32) {
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

}

