require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
    networks: {
        sepolia: {
            url: process.env.ALCHEMY_SEPOLIA_URL
        }
    },
    accounts: [process.env.SEPOLIA_PK]
};
