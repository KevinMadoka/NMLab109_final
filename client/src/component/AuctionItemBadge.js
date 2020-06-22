import React from "react";
import {
  Badge, Button
} from 'reactstrap';


class AuctionItemBadge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      id: this.props.id,
      seller: this.props.seller,
      winner: this.props.winner
    };
  }

  componentDidMount = async () => {
  }
  confirmOnClick = async () => {
    await this.state.contract.methods.confirm(this.state.id).send();
    var status = await this.state.contract.methods.getAuctionStateById(this.state.id).call();
    this.setState({
      status
    });
  }
  releaseOnClick = async () => {
  }
  badgeRender = async () => {
    var element =
      <div>
        {this.state.accounts[0] === this.state.seller ? <Badge color='secondary' pill>Owner</Badge> : ''}
        {this.state.accounts[0] === this.state.winner ? <Badge color='primary' pill>Winner</Badge> : ''}
        {this.state.accounts[0] === this.state.winner ? <Button color='danger' onClick={this.confirmOnClick}>confirm</Button> : ''}
        {this.state.accounts[0] === this.state.seller ? <Button color='warning' onClick={this.releaseOnClick}>release</Button> : ''}

      </div>
  }

  render() {
    return(
      <div>

      </div>
    );
  }
}
export default AuctionItemBadge;
