require("dotenv").config();
const hre = require("hardhat");

const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = await hre.ethers.deployContract("CoinFlipper", [], { signer: signer })

	await contract.deployed()
	console.log("Contract deployed to:", contract.address)
};

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
	});
