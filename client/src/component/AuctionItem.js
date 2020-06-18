import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      id: this.props.id,
      name: null,
      descript: null,
      imgURL: null,
      active: false
    };
  }

  componentDidMount = async () => {
    var obj = await this.state.contract.methods.getAuctionById(this.state.id).call();
  };

  render() {
    return(

    );
  }
}
export default AuctionItem;
