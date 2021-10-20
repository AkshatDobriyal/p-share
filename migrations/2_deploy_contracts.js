var SimpleStorage = artifacts.require("./PShare.sol");

module.exports = function(deployer) {
  deployer.deploy(PShare);
};
