const { expect } = require("chai");

/*This line imports the expect function from the Chai library. 
Chai is an assertion library commonly used for writing assertions and testing JavaScript code. 
The expect function is used to define assertions within test cases.*/
const { ethers } = require("hardhat");
/*This line imports the ethers object from the Hardhat library. 
Hardhat is a development environment for Ethereum smart contracts, 
and ethers provides utilities for interacting with Ethereum contracts and networks.*/
describe("Storage", function () {
  /*This line starts a test suite using Mocha's describe function.
   The test suite is named "Storage", indicating that it will contain tests related to a "Storage" contract.*/
  it("Should return the new storaged value once it's changed", async function () {
    /*Within the test suite, this line starts an individual test case using Mocha's it function.
     The test case description is "Should return the new storaged value once it's changed",
      indicating what behavior is being tested.*/
    const Storage = await ethers.getContractFactory("Storage");
    /*This line uses ethers.getContractFactory to obtain a contract factory for the "Storage" smart contract.
     The contract factory is used to deploy instances of the contract for testing.*/
    const storage = await Storage.deploy();
    /*This line deploys an instance of the "Storage" contract. 
    The deployed contract instance is stored in the storage variable.*/
    await storage.deployed();
    /*This line waits for the deployed contract instance (storage) to be fully deployed and
     initialized on the Ethereum network before proceeding with the tests.*/
    expect(await storage.retrieve()).to.equal(1);
    /*This line uses Chai's expect function to assert that the value returned by 
    calling the retrieve function on the storage contract instance is equal to 1. 
    This is an initial check to ensure the contract starts with a specific value.*/
    const setStorageTx = await storage.store(42220);
    /*This line calls the store function on the storage contract instance to change the storage value to 42220.
     It captures the transaction object returned by this function call in the setStorageTx variable.*/
    // wait until the transaction is mined
    await setStorageTx.wait();
    /*This line waits until the transaction represented by setStorageTx is mined and 
    confirmed on the Ethereum network before proceeding with the tests.
     This ensures that the contract state has been updated with the new storage value.*/
    expect(await storage.retrieve()).to.equal(42220);
    /*Finally, this line uses Chai's expect function again to assert that the value returned by calling the 
    retrieve function on the storage contract instance is equal to the new storage value of 42220.
     This confirms that the contract's state was successfully updated.*/
  });
});
