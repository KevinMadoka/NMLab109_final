import React from "react"

export default class AuctionItem extends React.Component  {
    constructor(props) {
        super(props)
        console.log(this.props.goods_info.value.email)
        this.state = {
            _index: this.props.index,
        
            //initial item information
            _price: this.props.goods_info.value.price,
            _itemInfo: this.props.goods_info.value.description,
            _itemName: this.props.goods_info.value.title,
            _imgURL: this.props.goods_info.value.imgUrl,
            _remainTime: this.props.goods_info.value.timeitlast,

            //seller's information
            _seller: this.props.goods_info.value.owner,
            _seller_email: this.props.goods_info.value.email,
            _seller_address: this.props.goods_info.value.address,
        
            //info at the end of the auction
            _winner: "",
            _ending_price: ""
        }
        
    }
    handleClick(i) { 
        var str = "You want to buy Auction " + this.state._index;
        alert(str);
    }
    // renderInput()
    // {
    //     <input type="text" placeholder="add a price..." onChange={this.inputChangeHandler}/>
    // }
    renderButton(){
        return(
            <button onClick={this.handleClick}>Add</button>
        );
    }
    // constructor(contract) {
    //     // .........
    //     this._itemInfo = 0;
    //     this._price = 0;
    //     // this._imgURL = 0;
    //     this._remainTime = 0;
    //     this._seller = 0;
    //     this._winner = 0;
    // }
    // get itemInfo() {
    //     return this._itemInfo;
    // }
    // get price() {
    //     return this._price;
    // }
    // // get imgURL() {
    // //     return this._imgURL;
    // // }
    // get remainTime() {
    //     return this._remainTime;
    // }
    // get seller() {
    //     return this._seller;
    // }
    // get winner() {
    //     return this._winner;
    // }
    render() {
        //let str1 = "".concat(...["Auction ", this._index, ": "])
        // let str2 = "".concat(...["Price: ", this._price, "\t\t"])
        //var strs = [str1, "Price: "+this._price]
        return (
            <div class="ui card">
                <h2>Auction {this.state._index} information:</h2>
                <p>item Name:{this.state._itemName}</p>
                <p>starting price:{this.state._price}</p>
                <p>seller name: {this.state._seller}</p>
                <p>seller's email: {this.state._seller_email}</p>
                <p>seller's address: {this.state._seller_address}</p>
                <p>remaining time of this auction{this.state._remainTime}</p>
                <p>item description: {this.state._itemInfo}</p>
                <p>the item's img is at :{this.state._imgURL}</p>
            </div>
            
        )
    }

}