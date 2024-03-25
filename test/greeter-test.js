const { expect } = require("chai");
/*const { expect } = require("chai");:
This line imports the expect function from the Chai assertion library.
 Chai is commonly used for writing assertions and testing JavaScript code.*/
const { ethers } = require("hardhat");
/*const { ethers } = require("hardhat");:
This line imports the ethers object from the Hardhat library. 
Hardhat is a development environment for Ethereum smart contracts,
 and ethers provides utilities for interacting with Ethereum contracts and networks*/

describe("Greeter", function () {
  /*describe("Greeter", function () { ... });:
This line starts a test suite using Mocha's describe function. The test suite is named "Greeter", 
indicating that it will contain tests related to the "Greeter" smart contract.*/
  it("Should return the new greeting once it's changed", async function () {
    /*it("Should return the new greeting once it's changed", async function () { ... });:
Within the test suite, this line starts an individual test case using Mocha's it function.
 The test case description is "Should return the new greeting once it's changed",
  indicating what behavior is being tested.*/
    const Greeter = await ethers.getContractFactory("Greeter");
    /*const Greeter = await ethers.getContractFactory("Greeter");:
  This line uses ethers.getContractFactory to obtain a contract factory for the "Greeter" smart contract.
  The contract factory is used to deploy instances of the contract for testing.*/
    const greeter = await Greeter.deploy("Hello, world!");
    /*const greeter = await Greeter.deploy("Hello, world!");:
  This line deploys an instance of the "Greeter" contract with an initial greeting message of "Hello, world!".
 The deployed contract instance is stored in the greeter variable.*/
    await greeter.deployed();
    /*await greeter.deployed();:
  This line waits for the deployed contract instance (greeter) to be fully 
  deployed and initialized on the Ethereum network before proceeding with the tests.*/
    expect(await greeter.greet()).to.equal("Hello, world!");
      /*expect(await greeter.greet()).to.equal("Hello, world!");:
This line uses Chai's expect function to assert that the value
 returned by calling the greet function on the greeter contract instance is equal to "Hello, world!". This is the initial greeting set during contract deployment.*/
    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    /*const setGreetingTx = await greeter.setGreeting("Hola, mundo!");:
    This line calls the setGreeting function on the greeter contract instance 
    to change the greeting message to "Hola, mundo!". 
    It captures the transaction object returned by this function call in the setGreetingTx variable.*/
    
    await setGreetingTx.wait();
    /*await setGreetingTx.wait();:
    This line waits until the transaction represented by setGreetingTx is mined and confirmed on
     the Ethereum network before proceeding with the tests. This ensures that the contract state has been updated with the new greeting.*/
    expect(await greeter.greet()).to.equal("Hola, mundo!");
    /*expect(await greeter.greet()).to.equal("Hola, mundo!");:
    Finally, this line uses Chai's expect function again to assert that the value
     returned by calling the greet function on the greeter contract instance is equal to the new 
     greeting message "Hola, mundo!". This confirms that the contract's state was successfully updated.*/
  });
});
