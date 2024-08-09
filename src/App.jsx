import { useEffect, useState } from "react";
import "./App.css";
import { getWalletAddress, signTransaction } from "./utils/wallet";

function App() {
	const [walletAddress, setWalletAddress] = useState();

	async function connect() {
		const address = await getWalletAddress();
		setWalletAddress(address);
		signTransaction();
		// const address = await getWalletAddressNew();
		// setWalletAddress(address[0]);
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
