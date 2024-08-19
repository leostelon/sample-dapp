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
		const params = [
			{
				gas: "0x8D94069",
				// value: Web3.utils.toWei(value, "ether"),
				value: "0x2386f26fc10000",
				from: "0x134a62028a5583f156156a292edf127e5528a49d",
				to: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
				data: "0xd0e30db0",
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
				value: "0x38d7ea4c68000",
				from: "0x134a62028a5583f156156a292edf127e5528a49d",
				to: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14",
				data: "0xd0e30db0",
			},
		];

		const gas = await window.ethereum.request({
			method: "eth_estimateGas",
			params: params,
		});
		console.log("Gas:", gas);
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

export async function transactionReciept() {
	try {
		const params = [
			"0xc50915e35386aedd09d0f36150e71445504cc4d375955deeffd9b8d6bc135120",
		];

		const receipt = await window.ethereum.request({
			method: "eth_getTransactionReceipt",
			params: params,
		});
		console.log("Transaction Receipt:", receipt);
	} catch (error) {
		alert(error.message);
	}
}
