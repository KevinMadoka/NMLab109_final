var Bidchain = artifacts.require("./Bidchain.sol");

module.exports = function(deployer) {
  deployer.deploy(Bidchain);
};
