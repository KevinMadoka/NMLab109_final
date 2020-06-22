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
      checking: false
    };
  }

  componentDidMount = async () => {
    var intervalId = setInterval( async () => {
      if (!this.state.checking) {
        const nowTime = Date.now()/1000;
        var remainTime = 0;
        var status = 0;
        const num = await this.state.contract.methods.getAuctionNum().call();
        for (var i = 0; i < num; i++) {
          remainTime = await this.state.contract.methods.getRemainTime(i).call();
          status = await this.state.contract.methods.getAuctionStateById(i).call();
          console.log('remaintime: ', remainTime)
          if (remainTime === '0' && (status === '1' || status === '0')) {
            this.setState({checking: true});
            break;
          }
        }
      }
    }, 5000);
  }


  render() {
    return(
      <div>
        <div className='auctionpage-title'>
          <h1>Online Auctions</h1>
        </div>
        <div className='auctionpage-button'>
          {this.state.checking ? <Button size='lg' color='danger'>checking</Button> : <Button size='lg' color='success'>checking</Button>}
        </div>
        <div>
          <AuctionList type='active' pageType='bidding' web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />
        </div>
      </div>
    );
  }
}
export default AuctionPage;
