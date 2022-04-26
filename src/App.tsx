import React, { useState } from "react";
import { Transactions } from "./Transactions";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState<string>("");
  const [block, setBlock] = useState<string>("");

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setWallet(e.target.value);
  }

  const handleBlockChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setBlock(e.target.value);
  }

  return (
    <div className="App">
      <div className="App-body">
        <div className="App-input">
          <label>Wallet Address: </label>
          <input value={wallet} onChange={handleWalletChange} />
        </div>
        <div className="App-input">
          <label>Start Block: </label>
          <input value={block} onChange={handleBlockChange} />
        </div>
        <Transactions wallet={wallet} block={block} />
      </div>
    </div>
  );
}

export default App;
