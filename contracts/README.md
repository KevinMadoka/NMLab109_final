# Bidding Process & Steps
- First, seller call the `createAuction()` function
```
createAuction(period, beginPrice, ["name", "description", "imageURL"], {from:sellerAddress, value:securityDeposit})
```
- Bidder call the `bidding()` function
```
bidding(auctionId, {from:buyerAddress, value:biddingPrice})
```
- After time up and buyer received the item, buyer call the confirm() function
```
confirm(auctionId, {from:buyerAddress})
```
- Seller withdraw money from the contract
```
release(auctionId, {from:sellerAddress})
```
