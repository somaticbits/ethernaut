# Ethernaut walkthrough
The Ethernaut is a Web3/Solidity based wargame inspired on overthewire.org.  

The solutions are not exhaustive, these are the ones I've been using to solve the challenges.

*Note:* The levels labelled with ``console`` can be solved using only the developer console.  
The ones with ``repo`` need to be compiled, deployed and solved using this repository.

<details><summary><h2>Level 0 - Hello Ethernaut</h2></summary> 
*Console*  

Use the developer console to access the functionalities.  
Then call the contract methods and follow the trail to find the final password.
</details>

<details><summary><h2>Level 1 - Fallback</h2></summary>
<i>Console</i>

### Code hint
````solidity
  receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
````

In this case, the ``receive`` fallback function allows to take ownership of the contract.
First send a contribution via the ``contribute`` method:  
````contract.contribute({value: toWei("0.001")})````  

Then send any ether value above 0 to the contract:  
````contract.sendTransaction({value: toWei("0.001")})````

The ownership of the contract can be checked with the ``contract.owner()`` method.
</details>

<details><summary><h2>Level 2 - Fallout</h2></summary>
<i>Console</i> 

### Code hint
````solidity
  /* constructor */
    function Fal1out() public payable {
        owner = msg.sender;
        allocations[owner] = msg.value;
    }
````

There's a vulnerability in the ``Fal1out`` method serving as constructor. The contract has a typo which allows to take ownership of it:  
````contract.Fal1out()````  

The ownership of the contract can be checked with the ``contract.owner()`` method.
</details>

<details><summary><h2>Level 3 - Coin Flip</h2></summary>
<i>Repo - <a href="https://github.com/somaticbits/ethernaut/tree/main/CoinFlip">CoinFlip</a></i>

### Code hint
````solidity
    uint256 blockValue = uint256(blockhash(block.number - 1));
````
</details>

<details><summary><h2>Level 4 - Telephone</h2></summary>
<i>Repo - <a href="https://github.com/somaticbits/ethernaut/tree/main/Telephone">Telephone</a></i>

### Code hint
````solidity
    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
````
</details>

<details><summary><h2>Level 5 - Token</h2></summary>
<i>Console</i>

### Code hint
````solidity
    function transfer(address _to, uint _value) public returns (bool) {
        require(balances[msg.sender] - _value >= 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }
````

This contract has been written with Solidity 0.6.0, so this exploit isn't valid in the current versions (0.8.19) but still good for knowledge. Also, if you need to work with this version of Solidity, use OpenZeppelin's SafeMath library checking for over/underflows.  

Here's a bit more information: [Hack Solidity: Integer Overflow and Underflow](https://hackernoon.com/hack-solidity-integer-overflow-and-underflow)  

The ``transfer`` method is vulnerable to an integer overflow. That can be triggered like this:  
````contract.transfer(player, 21)````

Player has a balance of 20 tokens, so using 21 as value will trigger the overflow.
With the ``balanceOf`` method, the balance of the player can be checked.
</details>

<details><summary><h2>Level 6 - Delegation</h2></summary>
<i>Repo - <a href="https://github.com/somaticbits/ethernaut/tree/main/Delegation">Delegation</a></i>

### Code hint
````solidity
    fallback() external {
        (bool result,) = address(delegate).delegatecall(msg.data);
        if (result) {
            this;
        }
    }
````
</details>

<details><summary><h2>Level 7 - Force</h2></summary>
<i>Repo - <a href="https://github.com/somaticbits/ethernaut/tree/main/Force">Force</a></i>

This article gives the solution: [Selfdestruct Solidity](https://www.alchemy.com/overviews/selfdestruct-solidity)  

The main way to solve this level is to use the ``selfdestruct`` method.  
</details>

<details><summary><h2>Level 8 - Vault</h2></summary>
<i>Repo - <a href="https://github.com/somaticbits/ethernaut/tree/main/Vault">Vault</a></i>

### Code hint
````solidity
    function unlock(bytes32 _password) public {
        if (password == _password) {
            locked = false;
        }
    }
````
The ``password`` state variable of the contract is ``private`` but it can be read by anyone. ``private`` variables are only private for the smart contract scope which means they can't be accessed or modified from other smart contracts.
But to read them, all one needs to do is to find the storage slot of the variable and read it.

Here's a bit more information: [How to keep secrets on Ethereum](https://medium.com/hackernoon/your-private-solidity-variable-is-not-private-save-it-before-it-becomes-public-52a723f29f5e)
</details>
