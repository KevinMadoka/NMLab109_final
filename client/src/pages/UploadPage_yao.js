import React from "react";


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
    var Title = this.refs.item_title.value
    //var Owner = this.refs.ownerName.value
    //var Email = this.refs.owneremail.value
    //var Address = this.refs.owneraddress.value
    var Houritlast = parseInt(this.refs.lastingtime.value)
    var Timeitlast = Houritlast*60*60
    var Description = this.refs.description.value
    var ImgUrl = this.refs.imgurl.value
    var Initialprice = parseInt(this.refs.startingprice.value,10)

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
        
        <p>type in the title if your auction:</p>
        <input
            type="text"
            ref="item_title"
            placeholder="ex:jump auction of one piece manga!!!"
        />
        {/* <br />
        <p>type in your name:</p>
        <input 
            ref="ownerName" 
            placeholder="Owner Name" 
        /> 
        <br />
        <p>type in your email(for communication):</p>
        <input 
            ref="owneremail"
            placeholder="Your email" 
        /> 
        <br />
        <p>type in your address</p>
        <input
            ref="owneraddress"
            placeholder="Your address"
        /> */}
        <br />
        <p>set how long your auction will hold(in numbers of hours) :</p> 
        <input 
            ref="lastingtime"
            placeholder="ex:2"
        />
        <br />
        <p>please type in the description of your goods</p>
        <textarea
            ref="description"
        />
        <br />
        <p>type in your image's url</p>              
        <input
            ref="imgurl"
        />
        <br />
        <p>type in the starting price</p>
        <input
            ref="startingprice"
        />
        <br />
        <button type="submit" class="ui primary button">Add</button>


    </form>
    )
  }
}
export default UploadPage
