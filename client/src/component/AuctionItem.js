import React from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  CardHeader, Collapse
} from 'reactstrap';
import "../css/style.css";

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      id: this.props.id,
      endTime: null,
      price: null,
      seller: null,
      winner: null,
      name: null,
      descript: null,
      imgURL: null,
      status: null,
      isOpen: false
    };
  }

  componentDidMount = async () => {
    var obj = await this.state.contract.methods.getAuctionById(this.state.id).call();
    this.setState({
      entTime: obj[0],
      price: obj[1],
      seller: obj[3],
      winner: obj[4],
      name: obj[5],
      descript: obj[6],
      imgURL: obj[7],
      status: obj[8]
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return(
      <div className='itemCard'>
        <Card>
          <CardHeader tag="h3">{this.state.name}</CardHeader>
          <div className='itemImage'>
            <img src={this.state.imgURL} alt="Item Image" />
          </div>
          <CardBody>
            <CardText>{this.state.descript}</CardText>
          </CardBody>
          <Button outline color="info" onClick={this.toggle}>Info</Button>
          <Collapse isOpen={this.state.isOpen}>
            <Card>
              <CardBody>
                <CardText>EndTime: {Date(this.state.endTime*1000).toLocaleString()}</CardText>
                <CardText>Price: {this.state.price} Ether</CardText>
                <CardText>Seller: {this.state.seller}</CardText>
                <CardText>Winner: {this.state.winner}</CardText>
              </CardBody>
            </Card>
          </Collapse>
        </Card>
      </div>
    );
  }
}
export default AuctionItem;
