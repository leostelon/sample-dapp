import { useEffect, useState } from "react";
import "./App.css";
import { getTxByHash, signMsg } from "./utils/wallet";

function App() {
	const [walletAddress, setWalletAddress] = useState();

	async function connect() {
		// const address = await getWalletAddress();
		// setWalletAddress(address);
		// switchChain();
		// ethGasPrice();
		// console.log("data sent");
		// const message = await window.AndroidInterface.showToast("New Message");
		// console.log(message);
		// alert(message);
		// return;
		// Transaction
		// const address = await getWalletAddressNew();
		// setWalletAddress(address[0]);
		// const gas = await estimateGas();
		// if (!gas || gas === "") return;
		// const tx = await signTransaction(gas);
		// if (tx) transactionReciept(tx);
		await signMsg();
	}

	useEffect(() => {
		connect();
		console.log("Entering");
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{walletAddress ?? "Wallet Not Connected"}
				<div>
					<p
						onClick={() => {
							// chrome.runtime.sendMessage(
							// 	{ action: "buttonClicked" },
							// 	(response) => {
							// 		console.log("Background response:", response);
							// 	}
							// );
						}}
					>
						Click
					</p>
				</div>
			</header>
		</div>
	);
}

export default App;
