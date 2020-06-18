import React from "react";
import BidchainContract from "../../build/contracts/Bidchain.json";
import getWeb3 from "./utils/getWeb3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import BidNavbar from "./component/BidNavbar";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null
    };
  }
  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BidchainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BidchainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({
        web3,
        accounts,
        contract: instance
      });
    }
    catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return(
        <div>
          Loading web3...
        </div>
      );
    }
    else {
      return(
        <div className='bg'>
          <Router>
            <div className='navbar'>
              <BidNavbar />
            </div>
            <div className='bidchain'>
              <Switch>
                <Route exact path='/home' render={(props) => <HomePage {...props} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />}/>
                <Route exact path='/' render={(props) => <Page {...props} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />}/>
                <Route exact path='/' render={(props) => <Page {...props} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />}/>
                <Route exact path='/' render={(props) => <Page {...props} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />}/>
                <Route exact path='/' render={(props) => <Page {...props} web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} />}/>
                <Redirect from='/' to='/home' />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}
export default App;
