# Ethernaut walkthrough
The Ethernaut is a Web3/Solidity based wargame inspired on overthewire.org.  

The solutions are not exhaustive, these are the ones I've been using to solve the challenges.

*Note:* The levels labelled with ``console`` can be solved using only the developer console.  
The ones with ``repo`` need to be compiled, deployed and solved using this repository.

## Level 0 - Hello Ethernaut  
*Console*  

Use the developer console to access the functionalities.  
Then call the contract methods and follow the trail to find the final password.

## Level 1 - Fallback  
*Console*  

In this case, the ``receive`` fallback function allows to take ownership of the contract.
First send a contribution via the ``contribute`` method:  
````contract.contribute({value: toWei("0.001")})````  

Then send any ether value above 0 to the contract:  
````contract.sendTransaction({value: toWei("0.001")})````

The ownership of the contract can be checked with the ``contract.owner()`` method.

## Level 2 - Fallout  
*Console*  

There's a vulnerability in the ``Fal1out`` method serving as constructor. The contract has a typo which allows to take ownership of it:  
````contract.Fal1out()````  

The ownership of the contract can be checked with the ``contract.owner()`` method.

## Level 3 - Coin Flip  
*Repo - [CoinFlip](CoinFlip)*

## Level 4 - Telephone  
*Repo - [Telephone](Telephone)*

## Level 5 - Token  
*Console*

This contract has been written with Solidity 0.6.0, so this exploit isn't valid in the current versions (0.8.19) but still good for knowledge. Also, if you need to work with this version of Solidity, use OpenZeppelin's SafeMath library checking for over/underflows.  

Here's a bit more information: [Hack Solidity: Integer Overflow and Underflow](https://hackernoon.com/hack-solidity-integer-overflow-and-underflow)  

The ``transfer`` method is vulnerable to an integer overflow. That can be triggered like this:  
````contract.transfer(player, 21)````

Player has a balance of 20 tokens, so using 21 as value will trigger the overflow.
With the ``balanceOf`` method, the balance of the player can be checked.

## Level 6 - Delegation  
*Repo - [Delegation](Delegation)*

## Level 7 - Force  
*Repo - [Force](Force)*

## Level 8 - Vault  
*Repo - [Vault](Vault)*

