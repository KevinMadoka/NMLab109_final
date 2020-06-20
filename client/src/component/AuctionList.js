import React from "react";
import AuctionItem from "./AuctionItem";
import {CardGroup} from "reactstrap";
import "../css/style.css";

class AuctionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      type: this.props.type,
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
    else if (this.state.type == "winned") {
      num = await this.state.contract.methods.winner2AuctionNum(this.state.accounts[0]).call();
      for (var i = 0; i < num; i++) {
        idList.push(await this.state.contract.methods.winner2Auction(this.state.accounts[0], i).call());
      }
    }
    this.setState({
      idList
    });
  };

  render() {
    return (
      <div>
        <CardGroup>
          {this.state.idList.map(
            (auctionId) => {
              return(
                <AuctionItem id={auctionId} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />
              );
            }
          )}
        </CardGroup>
      </div>
    );
  }
}

export default AuctionList;
