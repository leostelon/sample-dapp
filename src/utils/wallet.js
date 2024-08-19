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

export async function addChain() {
	const config = { ...CHAIN };
	config.chainId = Web3.utils.toHex(CHAIN.chainId);

	try {
		await window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [config],
		});
	} catch (error) {
		console.error(error);
	}
}

export async function getChain() {
	try {
		const chainId = await window.ethereum.request({
			method: "eth_chainId",
			params: [],
		});
		console.log("Chain ID: ", chainId);
	} catch (error) {
		console.error(error);
	}
}

export async function signTransaction(gas) {
	try {
		const params = [
			{
				gas: gas,
				// value: Web3.utils.toWei(value, "ether"),
				value: "0x3EFD6584C5588",
				from: "0x134a62028a5583f156156a292edf127e5528a49d",
				to: "0xbA9eEfaDb0A52F21E41B41f87E4325C3C7433AE2",
				data: "",
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

export async function estimateGas() {
	try {
		const params = [
			{
				value: "0x3EFD6584C5588",
				from: "0x134a62028a5583f156156a292edf127e5528a49d",
				to: "0xbA9eEfaDb0A52F21E41B41f87E4325C3C7433AE2",
				data: "",
			},
		];

		const gas = await window.ethereum.request({
			method: "eth_estimateGas",
			params: params,
		});
		console.log("Gas:", gas);
		return gas;
	} catch (error) {
		alert(error.message);
	}
}

export async function getWalletAddress() {
	try {
		let address =
			(await window.ethereum.selectedAddress) ||
			(await window.ethereum.address);
		return address;
	} catch (error) {
		console.log(error);
	}
}

export async function getWalletAddressNew() {
	const accounts = await window.ethereum.request({
		method: "eth_accounts",
	});
	return accounts;
}

export async function transactionReciept(txHash) {
	try {
		const params = [txHash];

		const receipt = await window.ethereum.request({
			method: "eth_getTransactionReceipt",
			params: params,
		});
		console.log("Transaction Receipt:", receipt);
	} catch (error) {
		alert(error.message);
	}
}
