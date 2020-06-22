import React from "react";
import "../css/style.css";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader
} from 'reactstrap';
import {
  Toast, ToastBody, ToastHeader,
  Spinner, Media, ListGroup, ListGroupItem,
  ListGroupItemHeading, ListGroupItemText,
  Form, FormGroup, Label, Input, FormFeedback,
  FormText, Button, Container, Row, Col

} from 'reactstrap';
import {
  Dropdown, DropdownToggle, Badge,
  DropdownMenu, DropdownItem
} from 'reactstrap';
const imgPlaceHolder = "https://lakelandescaperoom.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg";
const statusMap = [
  "Created",
  "Active",
  "Waited",
  "Released",
  "Closed"
];
const statusBg = [
  "p-3 bg-success my-2 rounded",
  "p-3 bg-primary my-2 rounded",
  "p-3 bg-danger my-2 rounded",
  "p-3 bg-warning my-2 rounded",
  "p-3 bg-secondary my-2 rounded"
];


class AuctionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      id: this.props.id,
      pageType: this.props.pageType,
      endTime: null,
      price: null,
      seller: null,
      winner: null,
      name: null,
      descript: null,
      imgURL: null,
      status: null,
      isOpen: false,
      invalid: false,
      value: ''
    };
  }

  componentDidMount = async () => {
    var obj = await this.state.contract.methods.getAuctionById(this.state.id).call();
    var date = new Date(parseInt(obj[0])*1000);
    this.setState({
      endTime: date.toString(),
      price: parseInt(obj[1])/parseInt(this.state.web3.utils.toWei('1', 'ether')),
      seller: obj[3],
      winner: obj[4],
      name: obj[5],
      descript: obj[6],
      imgURL: obj[7],
      status: obj[8]
    });
  };

  confirmOnClick = async () => {
    await this.state.contract.methods.confirm(this.state.id).send({from:this.state.accounts[0]});
    var status = await this.state.contract.methods.getAuctionStateById(this.state.id).call();
    this.setState({
      status
    });
  }
  releaseOnClick = async () => {
    await this.state.contract.methods.release(this.state.id).send({from:this.state.accounts[0]});
    var status = await this.state.contract.methods.getAuctionStateById(this.state.id).call();
    this.setState({
      status
    });
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    var invalid = false;
    if (this.state.value > this.state.price) {
      await this.state.contract.methods.bidding(this.state.id)
        .send({from:this.state.accounts[0], value:this.state.web3.utils.toWei(this.state.value, 'ether')});
    }
    else {
      invalid = true;
    }
    var obj = await this.state.contract.methods.getAuctionById(this.state.id).call();
    this.setState({
      invalid,
      price: parseInt(obj[1])/parseInt(this.state.web3.utils.toWei('1', 'ether')),
      winner: obj[4],
      status: obj[8]
    });
  };

  render() {
    if (this.state.pageType === 'bidding') {
      return(
        <div className='card-bg'>
          <div className={statusBg[this.state.status]}>
            <Container>
              <Card>
                <CardHeader>
                  <Container>
                    <Row>
                      <h3>
                        <Row>
                          {this.state.name}
                          {this.state.accounts[0] === this.state.seller ? <Badge  color='success'>Owner</Badge> : <div></div>}
                          {this.state.accounts[0] === this.state.seller && this.state.winner !== '0x0000000000000000000000000000000000000000' ? <Badge  color='secondary'>Sold</Badge> : <div></div>}
                          {this.state.accounts[0] === this.state.winner ? <Badge  color='primary'>Winner</Badge> : <div></div>}
                        </Row>
                      </h3>
                      <div className='ml-auto'>
                        {this.state.accounts[0] === this.state.winner && statusMap[this.state.status] === 'Waited' ? <Button color='danger' onClick={this.confirmOnClick}>confirm</Button> : <div></div>}
                        {this.state.accounts[0] === this.state.seller && statusMap[this.state.status] === 'Released' ? <Button color='warning' onClick={this.releaseOnClick}>release</Button> : <div></div>}
                      </div>
                    </Row>
                  </Container>
                </CardHeader>
                <div>
                  <Media>
                    <Media left href="#">
                      <Card>
                        <div className='media-img'>
                          <CardImg src={this.state.imgURL} alt={imgPlaceHolder} />
                        </div>
                      </Card>
                    </Media>
                    <Media body>
                      <div className='listgroup'>
                        <ListGroup>
                          <ListGroupItem>
                            <ListGroupItemHeading>Description</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.descript}</ListGroupItemText>
                          </ListGroupItem>
                          <ListGroupItem>
                            <div className='dropdown'>
                              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                                <DropdownToggle caret size='lg' outline color='primary'>Info</DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Current Price</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.price} Ether</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Current Winner</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.winner}</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>EndTime</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.endTime}</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Seller</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.seller}</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Status</ListGroupItemHeading>
                                      <ListGroupItemText>{statusMap[this.state.status]}</ListGroupItemText>
                                    </ListGroupItem>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </ListGroupItem>
                          <ListGroupItem>
                            <Form>
                              <FormGroup>
                                <Label for='biddingPrice'>Input Bidding Price</Label>
                                <Input onChange={this.onChange} value={this.state.value} invalid={this.state.invalid} name='price' id='biddingPrice' placeholder='In Ether' />
                                <FormFeedback>Oops! Your input price is less than current price!</FormFeedback>
                                <FormText>Your input price should > current price</FormText>
                              </FormGroup>
                              <Button onClick={this.onSubmit}>Submit</Button>
                            </Form>
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                    </Media>
                  </Media>
                </div>
              </Card>
            </Container>
          </div>
        </div>
      );
    }
    else {
      return(
        <div className='card-bg'>
          <div className={statusBg[this.state.status]}>
            <Container>
              <Card>
                <CardHeader>
                  <Container>
                    <Row>
                      <h3>
                        <Row>
                          {this.state.name}
                          {this.state.accounts[0] === this.state.seller ? <Badge  color='success'>Owner</Badge> : <div></div>}
                          {this.state.accounts[0] === this.state.seller && this.state.winner !== '0x0000000000000000000000000000000000000000' ? <Badge  color='secondary'>Sold</Badge> : <div></div>}
                          {this.state.accounts[0] === this.state.winner ? <Badge  color='primary'>Winner</Badge> : <div></div>}
                        </Row>
                      </h3>
                      <div className='ml-auto'>
                        {this.state.accounts[0] === this.state.winner && statusMap[this.state.status] === 'Waited' ? <Button color='danger' onClick={this.confirmOnClick}>confirm</Button> : <div></div>}
                        {this.state.accounts[0] === this.state.seller && statusMap[this.state.status] === 'Released' ? <Button color='warning' onClick={this.releaseOnClick}>release</Button> : <div></div>}
                      </div>
                    </Row>
                  </Container>
                </CardHeader>
                <div>
                  <Media>
                    <Media left href="#">
                      <Card>
                        <div className='media-img'>
                          <CardImg src={this.state.imgURL} alt={imgPlaceHolder} />
                        </div>
                      </Card>
                    </Media>
                    <Media body>
                      <div className='listgroup'>
                        <ListGroup>
                          <ListGroupItem>
                            <ListGroupItemHeading>Description</ListGroupItemHeading>
                            <ListGroupItemText>{this.state.descript}</ListGroupItemText>
                          </ListGroupItem>
                          <ListGroupItem>
                            <div className='dropdown'>
                              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                                <DropdownToggle caret size='lg' outline color='primary'>Info</DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Current Price</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.price} Ether</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Current Winner</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.winner}</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>EndTime</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.endTime}</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Seller</ListGroupItemHeading>
                                      <ListGroupItemText>{this.state.seller}</ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                      <ListGroupItemHeading>Status</ListGroupItemHeading>
                                      <ListGroupItemText>{statusMap[this.state.status]}</ListGroupItemText>
                                    </ListGroupItem>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                    </Media>
                  </Media>
                </div>
              </Card>
            </Container>
          </div>
        </div>
      );
    }
  }
}
export default AuctionItem;
