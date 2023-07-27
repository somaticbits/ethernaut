# Ethernaut walkthrough
The Ethernaut is a Web3/Solidity based wargame inspired on overthewire.org.  

*Note:* The levels labelled with ``console`` can be solved using only the developer console

## Level 0 - Hello Ethernaut  
*Console*  

Use the developer console to access the functionalities.  
Then call the contract methods and follow the trail to find the final password.

## Level 1 - Fallback  
*Console*  

This one can also be solved by using the developer console.  
In this case, the ``receive`` fallback function allows to take ownership of the contract.
First send a contribution via the ``contribute`` method:  
````contract.contribute({value: toWei("0.001")})````  

Then send any ether value above 0 to the contract:  
````contract.sendTransaction({value: toWei("0.001")})````

You can check that the ownership of the contract changed to your address by calling the ``contract.owner()`` method.

## Level 2 - Fallout  
*Console*  

If you check the contract code, you will notice that there's a typo in the function serving as constructor.  
Just call the ``Fal1out`` method to get the ownership of the contract:  
````contract.Fal1out()````

## Level 3 - Coin Flip  


## Level 4 - Telephone  


## Level 5 - Token  


## Level 6 - Delegation  


## Level 7 - Force  


## Level 8 - Vault  

