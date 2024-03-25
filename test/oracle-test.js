const { expect } = require("chai");
/*const { expect } = require("chai");:
This line imports the expect function from the Chai assertion library. 
Chai is commonly used for writing assertions and testing JavaScript code.*/
const { ethers } = require("hardhat");
/*const { ethers } = require("hardhat");:
This line imports the ethers object from the Hardhat library. 
Hardhat is a development environment for Ethereum smart contracts,
 and ethers provides utilities for interacting with Ethereum contracts and networks.*/
const { WrapperBuilder } = require("redstone-evm-connector");
/*const { WrapperBuilder } = require("redstone-evm-connector");:
This line imports the WrapperBuilder class from the "redstone-evm-connector" library. 
RedStone is a protocol for integrating off-chain data, including price feeds, into Ethereum smart contracts.*/

// You can find more details about RedStone oracles here: https://tinyurl.com/redstone-celo-docs

describe("Oracle", function () {
  /*describe("Oracle", function () { ... });:
This line starts a test suite using Mocha's describe function.
 The test suite is named "Oracle", indicating that it will contain tests related to an Oracle contract.*/
  it("Should correctly calculate CELO tokens amount for $100", async function () {
    /*it("Should correctly calculate CELO tokens amount for $100", async function () { ... });:
  Within the test suite, this line starts an individual test case using Mocha's it function. 
  The test case description is "Should correctly calculate CELO tokens amount for $100", indicating what behavior is being tested.*/
    const Oracle = await ethers.getContractFactory("Oracle");
    /*const Oracle = await ethers.getContractFactory("Oracle");:
This line uses ethers.getContractFactory to obtain a contract factory for the "Oracle" smart contract. 
The contract factory is used to deploy instances of the contract for testing.*/
    const oracle = await Oracle.deploy();
    /*const oracle = await Oracle.deploy();:
  This line deploys an instance of the "Oracle" contract.
 The deployed contract instance is stored in the oracle variable.*/
    await oracle.deployed();
    /*await oracle.deployed();:
    This line waits for the deployed contract instance (oracle) to be fully deployed and initialized 
    on the Ethereum network before proceeding with the tests.*/
    const usdAmount = ethers.utils.parseEther("100");
    /*const usdAmount = ethers.utils.parseEther("100");:
    This line converts the USD amount "$100" into its equivalent in Wei (the smallest unit of Ether) using ethers.
    utils.parseEther.*/
    const wrappedContract = WrapperBuilder
    /*const wrappedContract = WrapperBuilder.wrapLite(oracle).usingPriceFeed("redstone", { asset: "CELO" });:
    This line creates a wrapped contract instance using RedStone's WrapperBuilder.
    It specifies that the wrapped contract uses the "redstone" price feed for the asset "CELO".*/
      .wrapLite(oracle)
      /**/
      .usingPriceFeed("redstone", { asset: "CELO" });
    const celoAmount = await wrappedContract.getCELOAmountForUSDAmount(usdAmount);
    /*const celoAmount = await wrappedContract.getCELOAmountForUSDAmount(usdAmount);:
      This line calls the getCELOAmountForUSDAmount function on the wrapped contract instance
      to calculate the amount of CELO tokens equivalent to the specified USD amount.*/
    const humanFriendlyCeloAmount = ethers.utils.formatEther(celoAmount);
    /*const humanFriendlyCeloAmount = ethers.utils.formatEther(celoAmount);:
    This line converts the CELO token amount from Wei to a human-readable format using ethers.utils.formatEther.*/

    expect(Number(humanFriendlyCeloAmount)).to.be.lessThan(100); // It means that CELO price is higher than $1
      /*expect(Number(humanFriendlyCeloAmount)).to.be.lessThan(100);:
      This line uses Chai's expect function to assert that the converted CELO amount is less than 100.
      This assertion checks if the calculated CELO price is higher than $1, 
      as CELO amount for $100 should be less than 100 CELO tokens.*/
    // Print celo amount
    console.log(`Celo amount for $100: ${humanFriendlyCeloAmount} CELO`);
    /*console.log(Celo amount for $100: ${humanFriendlyCeloAmount} CELO);:
    This line logs the calculated CELO amount in a human-readable format to the console,
    indicating the amount of CELO tokens equivalent to $100.*/
  });
});
