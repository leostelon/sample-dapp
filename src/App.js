import { useEffect, useState } from "react";
import "./App.css";
import { getWalletAddress, signTransaction } from "./utils/wallet";

function App() {
	const [walletAddress, setWalletAddress] = useState();

	async function connect() {
		const address = await getWalletAddress()
		setWalletAddress(address);
		signTransaction();
	}

	useEffect(() => {
		connect();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{walletAddress ?? "Wallet Not Connected"}
			</header>
		</div>
	);
}

export default App;
