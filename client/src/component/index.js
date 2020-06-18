import React from "react"
import ReactDOM from "react-dom"
//import {Router, Route, Switch} from "react-router"

import AuctionList from "./pages/auctionList"
import AuctionItem from "./pages/auctionItem"
import FormAuction from "./pages/FormAuction"

var auctiongoods = []
class Final extends React.Component {
  constructor (props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    //this.removeItem = this.removeItem.bind(this)
    //this.markTodoDone = this.markTodoDone.bind(this)
    this.go_out = this.go_out.bind(this)
    this.state = {
      wholegoodlist: this.props.initAuctions, 
      //web3: null, 
      //accounts: null, 
      //contract: null 
    }
  }


  addItem (newauction) {
    //console.log(newauction)
    auctiongoods.unshift({
      index: auctiongoods.length+1, 
      value: newauction,
    })
    this.setState({wholegoodlist: auctiongoods});
  }
  // removeItem (newauction) {
  //   auctiongoods.splice(itemIndex, 1);
  //   this.setState({wholegoodlist: auctiongoods});
  // }
  go_out (){
    console.log(auctiongoods)
  }
  render() {
    //if (!this.state.web3) {
    //  return <div>Loading Web3, accounts, and contract...</div>;
    //}
    //this.go_out()
    return (
      <div id="main">
        {/* <accountpage> 顯示目前所有account發起的auction*/}
        {/* <bidding page> 喊價用的 直接用城auctionitem裡的一個button的功能*/}
        <AuctionList items={this.state.wholegoodlist} />
        <FormAuction addItem={this.addItem} />
      </div>
    )
  }
}

ReactDOM.render(
  <Final initAuctions={auctiongoods}/>,
  document.getElementById('root')
);