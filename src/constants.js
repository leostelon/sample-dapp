export const ChainsConfig = {
	POLYGON_TESTNET: {
		chainId: 80001,
		rpcUrl: ["https://matic-mumbai.chainstacklabs.com"],
		chainName: "Polygon Testnet",
		nativeCurrency: {
			name: "tMATIC",
			symbol: "tMATIC",
			decimals: 18,
		},
		blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
		nftContract: "0xd1e21Bdb3eb28d4c6A3612FF01f9fF81c01d5a17",
		nft1155Contract: "0xd1e21Bdb3eb28d4c6A3612FF01f9fF81c01d5a17",
		marketContract: "0x227D59C0C96C90Be57f772FE6354c40EcC91CD90",
	},
	CELO: {
		chainId: "0xaef3",
		chainName: "Celo Alfajores Testnet",
		nativeCurrency: {
			name: "CELO",
			symbol: "CELO",
			decimals: 18,
		},
		rpcUrls: [
			"https://alfajores-forno.celo-testnet.org",
			"wss://alfajores-forno.celo-testnet.org/ws",
		],
		blockExplorerUrls: ["https://alfajores.celoscan.io"],
	},
};

export const CHAIN = ChainsConfig["CELO"];
