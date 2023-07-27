require("dotenv").config()
const hre = require("hardhat")

const TAKETHEETH_CONTRACT = "0x3b19C554770C57640fa2344C2d108Dd032A0Ac06"

const ABI = [
	{
		"inputs": [],
		"name": "takeIt",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]


const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = new hre.ethers.Contract(TAKETHEETH_CONTRACT, ABI, signer)

	await contract.takeIt({ value: 10000 })
}

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
	});
