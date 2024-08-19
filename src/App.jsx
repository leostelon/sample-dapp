import { useEffect, useState } from "react";
import "./App.css";
import {
	estimateGas,
	evmCall,
	getChain,
	getWalletAddressNew,
	signTransaction,
	switchChain,
	transactionReciept,
} from "./utils/wallet";

function App() {
	const [walletAddress, setWalletAddress] = useState();

	async function connect() {
		// const address = await getWalletAddress();
		// setWalletAddress(address);
		evmCall();
		return;
		// Transaction
		// const address = await getWalletAddressNew();
		// setWalletAddress(address[0]);
		// const gas = await estimateGas();
		// if (!gas || gas === "") return;
		// const tx = await signTransaction(gas);
		// if (tx) transactionReciept(tx);
	}

	useEffect(() => {
		connect();
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
