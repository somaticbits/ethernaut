require("dotenv").config();
const hre = require("hardhat");

const GETTHEPHONE_CONTRACT = "0x328d3De6bbb2Ba846064582BcC16382783617778"

const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = new hre.ethers.Contract(GETTHEPHONE_CONTRACT, ABI, signer)

	await contract.changeOwner()
	console.log("Owner changed to:", await contract.owner())
}

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
	});
