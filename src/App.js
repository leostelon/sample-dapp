import { useEffect, useState } from "react";
import "./App.css";
import { connectWalletToSite, getWalletAddress } from "./utils/wallet";

function App() {
	const [walletAddress, setWalletAddress] = useState();

	async function connect() {
		const connected = await connectWalletToSite();
		if (connected) {
			const address = await getWalletAddress();
			setWalletAddress(address);
		}
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
