require("dotenv").config()
const hre = require("hardhat")

const STAYKING_CONTRACT = "0x482ffb67795e7352D5cC719B809aB5dC9295f9bA"

const ABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "becomeKing",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "king",
		"outputs": [
			{
				"internalType": "contract King",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = new hre.ethers.Contract(STAYKING_CONTRACT, ABI, signer)

	console.log("Sending transaction to become king...")
	const tx = await contract.becomeKing({ value: hre.ethers.utils.parseEther("0.05"), gasLimit: 1000000 })
	await provider.waitForTransaction(tx.hash)

	console.log("You should be king now.")
}

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
	});
