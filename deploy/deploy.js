const hre = require("hardhat");
// /This line imports the Hardhat runtime environment (hre) module into the script.
//  Hardhat is a development environment that provides tools for compiling, 
//  testing, and deploying Ethereum smart contracts. By requiring the "hardhat"
//   module, the script gains access to Hardhat's functionalities./

const main = async () => {
  
// Here, a function named main is defined using an asynchronous arrow function syntax (async () =>
//  { ... }). This function is responsible for deploying the contract and logging its address.
  const contractFactory = await hre.ethers.getContractFactory('AmmSwap');

  /**const contractFactory = await hre.ethers.getContractFactory('AmmSwap');:
  Inside the main function, this line uses hre.ethers.getContractFactory to obtain 
  a contract factory for the smart contract named 'AmmmSwap'. The contract factory 
  is a JavaScript object that contains the necessary information and methods to deploy 
  instances of the contract. */
  const contract = await contractFactory.deploy();
  /**const contract = await contractFactory.deploy();:
  The script then calls the deploy method on the contract factory (contractFactory.deploy())
  to deploy a new instance of the 'AmmmSwap' contract to the Ethereum blockchain.
  This line returns a promise that resolves to the deployed contract instance. */
  await contract.deployed();
  /**await contract.deployed();:
  After deploying the contract, the script waits for the deployed contract instance to be fully 
  deployed and initialized on the blockchain.
  The await contract.deployed() line ensures that subsequent operations 
  are performed on a fully deployed contract. */
  console.log("Contract deployed to this address:", contract.address);
  /**console.log("Contract deployed to this address:", contract.address);:
  Finally, the script logs a message to the console, indicating that the contract has been deployed successfully 
  and displaying its Ethereum address (contract.address). The contract address is the unique identifier of the
  deployed contract on the Ethereum blockchain. */
  
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();