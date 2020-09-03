import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import Register from './contracts/Register.json';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [data, setData] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          'Non-Ethereum browser detected. You should consider trying MetaMask!',
        );
      }
    }

    async function loadBlockchainData() {
      try {
        const web3 = window.web3;
        // Load first account
        const [account] = await web3.eth.getAccounts();
        setAccount(account);

        // Check which network is active on web3
        const networkId = await web3.eth.net.getId();

        // Check if the smart contract has been published on that network
        const networkData = Register.networks[networkId];
        if (networkData) {
          const contract = new web3.eth.Contract(
            Register.abi,
            networkData.address,
          );
          setContract(contract);
          const info = await contract.methods.getInfo().call();
          setData(info);
        } else {
          window.alert('Smart contract not deployed to detected network.');
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadWeb3().then(() => loadBlockchainData());
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    contract.methods
      .setInfo(inputValue)
      .send({ from: account })
      .once('receipt', receipt => {
        setData(inputValue);
        setInputValue('');
      });
  };

  return (
    <div className="App">
      <div>
        <h1>Register using React</h1>
        {contract && <p>Contract Address: {contract._address}</p>}
        <p>Information: {data}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit">Set</button>
      </form>
    </div>
  );
}

export default App;
