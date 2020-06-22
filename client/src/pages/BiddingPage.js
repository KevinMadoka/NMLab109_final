
import React from "react";
import AuctionList from "../component/AuctionList"


class BiddingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract
    };
  }
  render() {
    return(
      <div>
        <div className='biddingpage-title'>
          <h1>Your Release and Confirm Auctions</h1>
        </div>
        <AuctionList type='ended' web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />
      </div>
    );
  }
}
export default BiddingPage;
