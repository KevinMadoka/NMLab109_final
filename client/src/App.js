import React, { Component } from "react";
import BidchainContract from "./build/contracts/Bidchain.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.runExample = this.runExample.bind(this);
        this.state = {web3:null, accounts:null, contract:null};
    }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BidchainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BidchainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      //console.log(deployedNetwork.address)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, OK:1});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    //const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await this.state.contract.methods.createAuction(1000, 50, ["qq", "qqq", "qqqqq"]).send({from: this.state.accounts[0], value: 100000000000000000});

    await this.state.contract.methods.createAuction(1000, 50, ["q","gg","qgq"]).send({from: this.state.accounts[0]});
    // Get the value from the contract to prove it worked.
    //const response = await this.state.contract.methods.getAuctions();

    // Update state with the result.
    //this.setState({ storageValue: response.length });
  };

  render() {
    if (!this.state.OK) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div>
            <div>The contract address: {this.state.contract.address} </div>
            <button onClick={this.runExample}>createAuction!</button>
            <div>The stored value is: {this.state.storageValue}</div>
        </div>
    );
  }
}

export default App;
