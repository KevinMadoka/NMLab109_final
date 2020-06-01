

function getAuctionTest() {
    // console.log("Hi!");
    var auction = new Auction(0);
    auction._itemInfo = "A dog. 3 years old. https://noImage";
    auction._price = 500;
    auction._remainTime = 2000;
    auction._seller = "A seller.";
    auction._winner = "A lucky guy.";
    return auction;
}
function getAuctionTest2() {
    // console.log("Hi!");
    var auction = new Auction(0);
    auction._itemInfo = "Nothing. I'm poor. Please give me money. https://noImage";
    auction._price = 10;
    auction._remainTime = 40000;
    auction._seller = "A begger.";
    auction._winner = "No one";
    return auction;
}
function getAuctionTest3() {
    // console.log("Hi!");
    var auction = new Auction(0);
    auction._itemInfo = "It's time " + Date.now() ;
    auction._price = 0;
    auction._remainTime = 86400;
    auction._seller = "Debugger.";
    auction._winner = "Unsellable";
    return auction;
}

// I use a document.write to complete the html, 
// so you could only call global function or global variable
// (the function or variable outside).


function printAuctionList(list) {
    list.forEach(function (auction, index, array) {
        auctionlist = ["<h3>", "Auction ", index ,": ", "</h3>",
            "<p>", auction._itemInfo, "</p>",
            "<p>", "Price: ", auction._price, "\t\t",
            "RemainTime: ", auction._remainTime, "</p>",
            "<p>", "Seller: ", auction._seller, "    ",
            "Winner: ", auction._winner, "</p>",
            "<button type=\"button\" onclick=interface.buyAuction(", index,")>我是按鈕</button>",
            "<p>", "----------------------------------------------", "</p>"
        ]
        auctionlist.forEach(function (item, index, array) {
            document.write(item);
        });
    });
}
// function buyAuction(i)
// {
//     alert("Buy auction " +i+"\n"+interface._auctions[i]._itemInfo);

// }

// function testCall(i)
// {
//     alert(i);
// }

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
class Interface{
    constructor(contract) {
        this._auctions = []
    }
    get auctions(){
        return this._auctions;
    }
    // get auction(idx) {
    //     return this._auctions[idx];
    // }
    
    buyAuction(i) {
        alert("Buy auction " + i + "\n" + this._auctions[i]._itemInfo);
        this._auctions.push(getAuctionTest3());

    }

}
var interface = new Interface(0);
interface._auctions = [getAuctionTest(), getAuctionTest2(), getAuctionTest3(), getAuctionTest2()];
printAuctionList(interface._auctions);

// while (1) {

//     printAuctionList(interface._auctions);

// }
