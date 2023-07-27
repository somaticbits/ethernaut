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

Check the ownership of the contract by calling the ``contract.owner()`` method.

## Level 2 - Fallout  
*Console*  

Check the contract code, you will notice that there's a typo in the function serving as constructor.  
Just call the ``Fal1out`` method to get the ownership of the contract:  
````contract.Fal1out()````  

Check the ownership of the contract by calling the ``contract.owner()`` method.

## Level 3 - Coin Flip  
*Repo - [CoinFlip](CoinFlip)*

## Level 4 - Telephone  
*Repo - [Telephone](Telephone)*

## Level 5 - Token  
*Console*

This contract has been written with Solidity 0.6.0, so this exploit isn't valid in the current versions (0.8.19) but still good for knowledge. Also, if you need to work with this version of Solidity, you should use OpenZeppelin's SafeMath library that checks for over/underflows.  

Here's a bit more information: [Hack Solidity: Integer Overflow and Underflow](https://hackernoon.com/hack-solidity-integer-overflow-and-underflow)  

The ``transfer`` method is vulnerable to an integer overflow. Which can be triggered like this:  
````contract.transfer(player, 21)````

Player has a balance of 20 tokens, so using 21 as value will trigger the overflow.
If you check the ``balanceOf`` method, you will see that the balance of the player is now a lot larger than the original 20 tokens.

## Level 6 - Delegation  
*Repo - [Delegation](Delegation)*

## Level 7 - Force  
*Repo - [Force](Force)*

## Level 8 - Vault  
*Repo - [Vault](Vault)*

