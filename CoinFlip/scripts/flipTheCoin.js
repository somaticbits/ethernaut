require("dotenv").config();
const hre = require("hardhat");

const COINFLIPPER_CONTRACT = "0xC8788a31B794Ba7FC95822AF77543963E39FDB1e"
const COINFLIP_CONTRACT = "0x46A52996B4e73cf21fcC9E4527B7d5D1ccb5BA99"

const ABI = [
	{
		"inputs": [],
		"name": "coinFlip",
		"outputs": [
			{
				"internalType": "contract CoinFlip",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "flipToWin",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const COINFLIP_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "consecutiveWins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_guess",
				"type": "bool"
			}
		],
		"name": "flip",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const main = async () => {
	const provider = new hre.ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL)
	const signer = new hre.ethers.Wallet(process.env.SEPOLIA_PK, provider)
	const contract = new hre.ethers.Contract(COINFLIPPER_CONTRACT, ABI, signer)

	const coinFlipContract = new hre.ethers.Contract(COINFLIP_CONTRACT, COINFLIP_ABI, signer)

	provider.on("block", async (blockNumber) => {
		console.log("New block mined:", blockNumber)
		await contract.flipToWin()
		const consecutiveWins = await coinFlipContract.consecutiveWins()
		console.log("Consecutive wins:", consecutiveWins)
		if (consecutiveWins >= 10) {
			console.log("You won!")
			process.exit(0)
		}
	})
}

main()
	.then()
	.catch(error => {
		console.error(error)
		process.exit(1)
});
