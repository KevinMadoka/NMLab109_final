import React from "react";
import AuctionList from "../component/AuctionList";
import {CardGroup} from "reactstrap";
import "../css/style.css";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      ownedId: null,
      winnedId: null
    };
  }

  componentDidMount = async () => {
    {/*Loading users owned auctions and winning auctions*/}
    var num = await this.state.contract.methods.seller2AuctionNum(this.state.accounts[0]).call();
    var ownedId = [];
    for (var i = 0; i < num; i++) {
       ownedId.push(await this.state.contract.methods.seller2Auction(this.state.accounts[0], i).call());
    }
    num = await this.state.contract.methods.winner2AuctionNum(this.state.accounts[0]).call();
    var winnedId = [];
    for (i = 0; i < num; i++) {
      winnedId.push(await this.state.contract.methods.winner2Auction(this.state.accounts[0], i).call());
    }


    this.setState({
      ownedId,
      winnedId
    });
  };

  loadAuction = async () => {
  };

  render() {
    return(
      <div>
        <h1>OwnedId: {this.state.ownedId}</h1>
        <h1>WinnedId: {this.state.winnedId}</h1>
        <h1>{Math.floor(Date.now()/1000)}</h1>
        <div>
          <AuctionList
            web3={this.state.web3}
            accounts={this.state.accounts}
            contract={this.state.contract}
            type="owned" />
          <AuctionList
            web3={this.state.web3}
            accounts={this.state.accounts}
            contract={this.state.contract}
            type="winned" />
        </div>
      </div>
    );
  }
}
export default HomePage;
