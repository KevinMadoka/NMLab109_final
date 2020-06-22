import React from "react";
import AuctionList from "../component/AuctionList";
import "../css/style.css";
import {Button} from "reactstrap";


class AuctionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      checking: false,
      intervalId: null
    };
  }

  componentDidMount = async () => {
    var intervalId = setInterval( async () => {
      if (!this.state.checking) {
        var status = 0;
        var endTime = 0;
        const num = await this.state.contract.methods.getAuctionNum().call();
        for (var i = 0; i < num; i++) {
          endTime = await this.state.contract.methods.getAuctionEndTime(i).call();
          status = await this.state.contract.methods.getAuctionStateById(i).call();
          if (Date.now() >= parseInt(endTime)*1000 && (status === '1' || status === '0')) {
            this.setState({checking: true});
            break;
          }
        }
      }
    }, 1000);
    this.setState({intervalId});
  }
  componentWillUnmount = async () => {
    clearInterval(this.state.intervalId);
  };

  onClick = async () => {
    await this.state.contract.methods.checking().send({from:this.state.accounts[0]});
    this.setState({
      checking: false
    });
    window.location.reload(false);
  };

  render() {
    return(
      <div>
        <div className='auctionpage-title'>
          <h1>Online Auctions</h1>
        </div>
        <div className='auctionpage-button'>
          {this.state.checking ? <Button onClick={this.onClick} size='lg' color='danger'>checking</Button> : <Button onClick={this.onClick} size='lg' color='success'>checking</Button>}
        </div>
        <div>
          <AuctionList type='active' pageType='bidding' web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />
        </div>
      </div>
    );
  }
}
export default AuctionPage;
