var Membership = artifacts.require("./Membership.sol");

module.exports = function(deployer) {
  deployer.deploy(Membership);
};
