require("dotenv").config()
const hre = require("hardhat")

const VAULT_CONTRACT = "0xbA50c2D8F2c22A326433e181268015407e3DeC20"

const ABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_password",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "locked",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_password",
				"type": "bytes32"
			}
		],
		"name": "unlock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = new hre.ethers.Contract(VAULT_CONTRACT, ABI, signer)

	const password = await provider.getStorageAt(VAULT_CONTRACT, 1)
	const tx = await contract.unlock(password)
	await provider.waitForTransaction(tx.hash)

	console.log("Console is locked:", await contract.locked())
}

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
	});