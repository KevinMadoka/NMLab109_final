import React from "react";
import AuctionItem from "./AuctionItem";
import {CardGroup} from "reactstrap";

class AuctionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      type: this.props.type,
      pageType: this.props.pageType,
      idList: []
    };
  }

  componentDidMount = async() => {
    var num = 0;
    var idList = [];
    if (this.state.type === "owned") {
      num = await this.state.contract.methods.seller2AuctionNum(this.state.accounts[0]).call();
      for (var i = 0; i < num; i++) {
        idList.push(await this.state.contract.methods.seller2Auction(this.state.accounts[0], i).call());
      }
    }
    else if (this.state.type === "winned") {
      num = await this.state.contract.methods.winner2AuctionNum(this.state.accounts[0]).call();
      for (var i = 0; i < num; i++) {
        idList.push(await this.state.contract.methods.winner2Auction(this.state.accounts[0], i).call());
      }
    }
    else if (this.state.type === "active") {
      num = await this.state.contract.methods.getAuctionNum().call();
      var state = 0;
      for (var i = 0; i < num; ++i) {
        state = await this.state.contract.methods.getAuctionStateById(i).call();
        if (state === '0' || state === '1')
          idList.push(i);
      }
    }
    else if (this.state.type === "ended") {
      num = await this.state.contract.methods.getAuctionNum().call();
      for (var i = 0; i < num; i++) {
        var auc = await this.state.contract.methods.getAuctionById(i).call();
        if ((auc[3] === this.state.accounts[0] && auc[8] === '3') || (auc[4] === this.state.accounts[0] && auc[8] === '2') )
          idList.push(i);
      }
    }
    this.setState({
      idList
    });
  };

  render() {
    return (
      <div>
        {this.state.idList.map(
          (auctionId, idx) => {
            return(
              <AuctionItem key={idx.toString()} id={auctionId} type={this.state.type} pageType={this.state.pageType} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />
            );
          }
        )}
      </div>
    );
  }
}

export default AuctionList;
