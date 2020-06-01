

function getAuctionTest() {
    // console.log("Hi!");
    var auction = new Auction(0);
    auction._itemInfo = "A dog. 3 years old. https://noImage"
    auction._price = 500;
    auction._remainTime = 2000;
    auction._seller = "A seller."
    auction._winner = "A lucky guy."
    return auction;
}
function getAuctionTest2() {
    // console.log("Hi!");
    var auction = new Auction(0);
    auction._itemInfo = "Nothing. I'm poor. Please give me money. https://noImage"
    auction._price = 10;
    auction._remainTime = 40000;
    auction._seller = "A begger."
    auction._winner = "No one"
    return auction;
}
function printAuctionList(list) {
    list.forEach(function (auction, index, array) {
        auctionlist = ["<h3>", "Auction ", index ,": ", "</h3>",
            "<p>", auction._itemInfo, "</p>",
            "<p>", "Price: ", auction._price, "\t\t",
            "RemainTime: ", auction._remainTime, "</p>",
            "<p>", "Seller: ", auction._seller, "    ",
            "Winner: ", auction._winner, "</p>",
            "<button type=\"button\" onclick=buyAuction(", index,")>我是按鈕</button>",
            "<p>", "----------------------------------------------", "</p>"
        ]
        auctionlist.forEach(function (item, index, array) {
            document.write(item);
        });
    });
}
function buyAuction(i)
{
    alert("Buy auction "+i);

}

function testCall(i)
{
    alert(i);
}

class Auction{
    constructor(contract){
        // .........
        this._itemInfo = 0;
        this._price = 0;
        // this._imgURL = 0;
        this._remainTime = 0;
        this._seller = 0;
        this._winner = 0;
    }
    get itemInfo(){
        return this._itemInfo;
    }
    get price() {
        return this._price;
    }
    // get imgURL() {
    //     return this._imgURL;
    // }
    get remainTime() {
        return this._remainTime;
    }
    get seller() {
        return this._seller;
    }
    get winner() {
        return this._winnere;
    }

}
list = [getAuctionTest(), getAuctionTest2(), getAuctionTest2()];
printAuctionList(list);
