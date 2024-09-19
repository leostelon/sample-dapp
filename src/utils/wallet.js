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
	try {
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});
		return accounts;
	} catch (error) {
		alert("user rejected request!")
		return []
	}
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

export async function getTxByHash(txHash) {
	try {
		const params = [
			"0x2bc80eb47fe6886604ce1f370b8725ba64d28863f9f2b430bab4f15b3c868640",
		];

		const tx = await window.ethereum.request({
			method: "eth_getTransactionByHash",
			params: params,
		});
		console.log("Transaction:", tx);
	} catch (error) {
		alert(error.message);
	}
}

export async function evmCall() {
	try {
		const params = [
			{
				to: "0x1f98415757620b543a52e61c46b32eb19261f984",
				data: "0x1749e1e300000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000000000000000000000001f98415757620b543a52e61c46b32eb19261f98400000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000244d2301cc000000000000000000000000134a62028a5583f156156a292edf127e5528a49d000000000000000000000000000000000000000000000000000000000000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c3359000000000000000000000000000000000000000000000000000000000002d2a80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002470a08231000000000000000000000000134a62028a5583f156156a292edf127e5528a49d00000000000000000000000000000000000000000000000000000000",
			},
			"0x60785507",
		];

		const receipt = await window.ethereum.request({
			method: "eth_call",
			params: params,
		});
		console.log("evm_call data: ", receipt);
	} catch (error) {
		alert(error.message);
	}
}

export async function ethGasPrice() {
	try {
		const gas = await window.ethereum.request({
			method: "eth_gasPrice",
		});
		console.log("Gas price: ", gas);
	} catch (error) {
		alert(error.message);
	}
}

export async function signMsg() {
	try {
		const msg = await window.ethereum.request({
			method: "personal_sign",
			params: [
				"0x4c6179657233204f6e652d54696d65204b65793a2052524f4f4c573858374e3545",
				"0x134A62028a5583f156156a292eDF127e5528A49d",
			],
		});
		console.log("Sign msg: ", msg);
	} catch (error) {
		alert(error.message);
	}
}