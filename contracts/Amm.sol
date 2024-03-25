// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
/**
  A liquidity pool refers to a reserve of tokens locked in a smart contract on a 
  decentralized finance (DeFi) platform. These pools are used to facilitate trading,
  lending, and other financial activities within the DeFi ecosystem. Liquidity providers
  deposit their tokens into these pools and, in return, receive rewards such as transaction fees or interest.
   */
contract AmmSwap {

  // The constant product.
  uint256 constantProduct;

  // The mapping of token addresses to balances.
  mapping(address => uint256) balances;

  // The mapping of token addresses to trading fees.
  mapping(address => uint256) fees;

  // The constructor.
  constructor() {
    constantProduct = 1e18;
  }

  // The function to create a liquidity pool.
  function createLiquidityPool( address tokenA, address tokenB,uint256 amountA, uint256 amountB) public returns (uint256 liquidity) {
    require(amountA > 0 && amountB > 0, "Amounts must be greater than zero");     // Check that the amounts are not zero.

    liquidity = amountA * amountB;     // Calculate the liquidity.

    // Add the liquidity to the pool.
    balances[tokenA] += amountA;
    balances[tokenB] += amountB;

    return liquidity;   // Return the liquidity.
  }

  // The function to swap tokens.
  function swap( address tokenA, address tokenB, uint256 amountA, uint256 minAmountB) public returns (uint256 amountB) {
    require(amountA > 0 && minAmountB > 0, "Amounts must be greater than zero");     // Check that the amounts are not zero.

    amountB = calculateAmountB(amountA, minAmountB);     // Calculate the amount of B that will be received.

    require(amountB > 0, "Insufficient liquidity");     // Check that the amount of B is not zero.

    swapTokens(tokenA, amountA, tokenB, amountB);      // Swap the tokens.
    return amountB;      // Return the amount of B that was received.
  }

  // The function to calculate the amount of B that will be received in a swap.
  function calculateAmountB(uint256 amountA, uint256 minAmountB) public view returns (uint256) {
    uint256 newConstantProduct = constantProduct - amountA * minAmountB;     // Calculate the constant product.

    uint256 amountB = newConstantProduct / amountA;     // Calculate the amount of B that will be received.

    amountB = amountB < minAmountB ? minAmountB : amountB;     // Ensure that the amount of B is not less than the minimum amount.

    return amountB;     // Return the amount of B.
  }
  
function swapTokens( address tokenA,uint256 amountA, address tokenB, uint256 amountB) internal {
    require(amountA > 0 && amountB > 0, "Amounts must be greater than zero");     // Check that the amounts are not zero.

    uint256 newConstantProduct = constantProduct - amountA * amountB;     // Calculate the new constant product.

    // Update the balances of the pool.
    balances[tokenA] -= amountA;
    balances[tokenB] += amountB;

    constantProduct = newConstantProduct;     // Update the constant product.

    // Transfer the tokens to the user.
    (bool success, ) = tokenA.call(abi.encodePacked(amountA));
    require(success, "Failed to transfer tokens");

    (success, ) = tokenB.call(abi.encodePacked(amountB));
    require(success, "Failed to transfer tokens");
  }

  // The function to calculate the trading fee.
  function calculateTradingFee(uint256 amount) public pure returns (uint256) {
    uint256 fee = amount * 3e18 / 10000;     // The trading fee is 0.03%.
    // Return the trading fee.
    return fee;
  }

  // The function to calculate the price of a token.
  function calculatePrice(address tokenA, address tokenB) public view returns (uint256) {
    // Get the amounts of tokens in the pool.
    uint256 amountA = balances[tokenA];
    uint256 amountB = balances[tokenB];

    uint256 constantProduct = amountA * amountB;     // Calculate the constant product.
    uint256 priceA = constantProduct / amountB;       // Calculate the price of token A.

    return priceA;     // Return the price of token A.
  }
}
