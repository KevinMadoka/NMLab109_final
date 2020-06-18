import React from "react";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      ownedId: null,
      obj:null,
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

    var obj = [];
    obj = await this.state.contract.methods.getAuctionById(ownedId[0]).call();

    this.setState({
      ownedId,
      obj,
      winnedId
    });
  };

  loadAuction = async () => {
  };

  render() {
    if (this.state.obj)
    return(
      <div>
        <h1>OwnedId: {this.state.ownedId}</h1>
        <h1>WinnedId: {this.state.winnedId}</h1>
        <h1>Obj: {this.state.obj[8]}</h1>
      </div>
    );
    else return <div></div>
  }
}
export default HomePage;
