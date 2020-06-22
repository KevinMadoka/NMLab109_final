import React from "react";
import { Col,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'


class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      ownedId: null,
      winnedId: null
    }
    this.onSubmit=this.onSubmit.bind(this)
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
  }

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target)
    var Houritlast = data.get('Time')
    var Timeitlast = Houritlast*60*60
    var Initialprice = parseInt(data.get('Price'))*parseInt(this.state.web3.utils.toWei('1', 'ether'));
    var Title = data.get('Title')
    var Description = data.get('Description')
    var ImgUrl = data.get('Imgurl')

    // var newitem = {
    //     title: Title,
    //     owner: Owner,
    //     email: Email,
    //     address: Address,
    //     timeitlast: Timeitlast,
    //     description: Description,
    //     imgUrl: ImgUrl,
    //     price: Initialprice
    // }
    this.refs.form.reset()
    this.state.contract.methods.createAuction(Timeitlast,Initialprice,Title,Description,ImgUrl)
    .send({from:this.state.accounts[0], value:this.state.web3.utils.toWei('0.1', 'ether')});
  }

  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} >
        
        {/* <p>type in the title if your auction:</p>
        <input
            type="text"
            ref="item_title"
            placeholder="ex:jump auction of one piece manga!!!"
        /> */}
        <FormGroup row>
        <Label for="Title" sm={2}>Auction title</Label>
          <Col sm={6}>
            <Input type="textarea" name="Title" id="Title" placeholder="ex:jump auction of one piece manga!!!" />
          </Col>
        </FormGroup>

        <FormGroup row>
        <Label for="Email" sm={2}>Email</Label>
          <Col sm={6}>
            <Input type="email" name="Email" id="Email" placeholder="ex:b06901044@ntu.edu.tw" />
          </Col>
        </FormGroup>
        
        {/* <br />
        <p>set how long your auction will hold(in numbers of hours) :</p> 
        <input 
            ref="lastingtime"
            placeholder="ex:2"
        />
        <br /> */}

        <FormGroup row>
        <Label for="Time" sm={2}>how long your auction will last</Label>
          <Col sm={6}>
            <Input type="text" name="Time" id="Time" placeholder="type in number of hours,ex:2(means 2 hours)" />
          </Col>
        </FormGroup>

        {/* <p>please type in the description of your goods</p>
        <textarea
            ref="description"
        />
        <br /> */}
        <FormGroup row>
        <Label for="Description" sm={2}>Description about your goods</Label>
          <Col sm={6}>
            <Input type="textarea" name="Description" id="Description" placeholder="" />
          </Col>
        </FormGroup>

        {/* <p>type in your image's url</p>              
        <input
            ref="imgurl"
        /> */}
        <FormGroup row>
        <Label for="Imgurl" sm={2}>Url of your goods' picture</Label>
          <Col sm={6}>
            <Input type="textarea" name="Imgurl" id="Imgurl" placeholder="" />
          </Col>
        </FormGroup>
        {/* <br />
        <p>type in the starting price</p>
        <input
            ref="startingprice"
        /> */}
        <FormGroup row>
        <Label for="Price" sm={2}>Decide the starting price</Label>
          <Col sm={6}>
            <Input type="textarea" name="Price" id="Price" placeholder="" />
          </Col>
        </FormGroup>
        <button type="submit" className="ui primary button">Add</button>


    </form>
    )
  }
}
export default UploadPage
