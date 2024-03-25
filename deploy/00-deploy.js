// deploy/00_deploy_my_contract.js

// const { ethers } = require("hardhat");

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments }) => {
  /**module.exports = async ({ getNamedAccounts, deployments }) => { ... };:
  This line exports an asynchronous function that takes an object containing
  getNamedAccounts and deployments as arguments. Hardhat uses this function 
  during the deployment process to deploy contracts and interact with the Ethereum network.
   */
  const { deploy } = deployments;
  /**const { deploy } = deployments;:
  Destructures the deploy function from the deployments object, which is provided as an
  argument to the exported function. This deploy function is used to deploy contracts in the script. */
  const { deployer } = await getNamedAccounts();
  /**const { deployer } = await getNamedAccounts();:
  Destructures the deployer account from the result of calling the getNamedAccounts function. 
  getNamedAccounts is a Hardhat helper function that retrieves the named accounts configured
  in the Hardhat environment, such as the default deployment account. */

  await deploy("Greeter", {
    /**await deploy("Greeter", { ... });:
  Deploys a contract named "Greeter" using the deploy function. 
  It specifies the from address as the deployer account obtained earlier,
  passes an array of arguments (in this case, just the string "hello world") 
  to the contract constructor using args, and logs deployment information (log: true). */
    from: deployer,
    args: ["hello world"],
    log: true,
  });

  await deploy("Storage", {
    /**await deploy("Storage", { ... });:
    Similar to the previous line, deploys a contract named "Storage" using the deploy function.
    The arguments (args) for this contract deployment are not provided in the script but can be added if required. */
  
    from: deployer,
    log: true,
  });

  await deploy("SupportToken", {
    /*await deploy("SupportToken", { ... });:
    Deploys a contract named "SupportToken" using the deploy function. 
    Like the "Storage" contract, the arguments (args) for this deployment are not 
    specified in the script but can be added if necessary..*/
    from: deployer,
    
    log: true,
  });


};

module.exports.tags = ["Greeter", "Storage", "SupportToken"];
/*module.exports.tags = ["Greeter", "Storage", "SupportToken"];:
Tags the deployed contracts with the specified names ("Greeter", "Storage", "SupportToken"). 
These tags can be used in other scripts or commands to refer to these contracts,
 making it easier to interact with them in subsequent tasks or tests.*/
