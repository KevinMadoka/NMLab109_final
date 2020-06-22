import React from "react";
import AuctionList from "../component/AuctionList";
import "../css/style.css";

const testAuctions = [
  [
    "Niva Lamp Table",
    "Scandinavian FeelThe Scandinavian-inspired Niva Lamp Table will complement any room in your house. The combination of engineered and solid timber components mean it’s signature legs and curved edges work beautifully with your home décor while providing a soothing, natural feel.",
    "https://www.fantasticfurniture.com.au/medias/NIVLTB2DWOOOFOIOAK-DIM-1-CONTAINER-original-FantasticFurniture-WF-Dimension-Large?context=bWFzdGVyfGltYWdlcy9OSVZMVEIyRFdPT09GT0lPQUt8NzEzNjZ8aW1hZ2UvanBlZ3xpbWFnZXMvTklWTFRCMkRXT09PRk9JT0FLL2hhMi9oMWQvODk3MzkzODcyMDc5OC5qcGd8MThjYzhiOWQxZWZlZjliMDUzNzhkYmI3Njk5M2QwYjE0N2QzNGZkMzhmMDRkYzQyZTJlYWI2MGQ3NGJjYjU3ZQ"
  ],
  [
    "Indivi Sofa",
    "Seasons pass and trends come and go, but the modern elegance of the Indivi sofa is timeless. With low armrests that provide a grounded and contemporary look",
    "https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sw=2000"
  ],
  [
    "Louise PVC figure",
    "Zero no Tsukaima Louise Uniform Ver. [1/8 Scale PVC]",
    "https://images-na.ssl-images-amazon.com/images/I/41Y7dnuytML._AC_.jpg"
  ],
  [
    "Switch",
    "Custom used switch",
    "https://i.imgur.com/u6xjqd3.jpg"
  ],
  [
    "Case bound thick books",
    "Standard export corrugated carton and eco-friendly pallet, film wrapping",
    "https://sc01.alicdn.com/kf/HTB1hld2KFXXXXaJaXXXq6xXFXXXF.jpg"
  ]
];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      ownedId: null,
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


    this.setState({
      ownedId,
      winnedId
    });
  };

  toggle = async () => {
    for (var i = 0; i < testAuctions.length; i++) {
      await this.state.contract.methods.createAuction(60*(i+1), this.state.web3.utils.toWei((i+5).toString(), 'ether'), testAuctions[i][0], testAuctions[i][1], testAuctions[i][2])
        .send({from:this.state.accounts[0], value:this.state.web3.utils.toWei('0.1', 'ether')});
    }
  };

  render() {
    return(
      <div>
        <div className='homepage-title'>
          <h1>Owned and Winned Auctions</h1>
        </div>
        <div>
          <AuctionList
            web3={this.state.web3}
            accounts={this.state.accounts}
            contract={this.state.contract}
            type="owned" />
          <AuctionList
            web3={this.state.web3}
            accounts={this.state.accounts}
            contract={this.state.contract}
            type="winned" />
        </div>
        <div>
          test:
          <button onClick={this.toggle}>createAuctionTest</button>
        </div>
      </div>
    );
  }
}
export default HomePage;
