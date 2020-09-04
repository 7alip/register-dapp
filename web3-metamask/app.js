//connection with node
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider);
} else {
  window.alert(
    'Non-Ethereum browser detected. You should consider trying MetaMask!',
  );
}

const ABI =
  '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]';

const DATA =
  '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610389806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80635a9b0b89146100465780638da5cb5b146100c9578063937f6e7714610113575b600080fd5b61004e6101ce565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561008e578082015181840152602081019050610073565b50505050905090810190601f1680156100bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d1610270565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101cc6004803603602081101561012957600080fd5b810190808035906020019064010000000081111561014657600080fd5b82018360208201111561015857600080fd5b8035906020019184600183028401116401000000008311171561017a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610295565b005b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102665780601f1061023b57610100808354040283529160200191610266565b820191906000526020600020905b81548152906001019060200180831161024957829003601f168201915b5050505050905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600190805190602001906102ab9291906102af565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102f057805160ff191683800117855561031e565b8280016001018555821561031e579182015b8281111561031d578251825591602001919060010190610302565b5b50905061032b919061032f565b5090565b61035191905b8082111561034d576000816000905550600101610335565b5090565b9056fea265627a7a723158202fe365a0ac02bf64026efe2a4af52a02bb478fcff9b33874240012730c483dda64736f6c63430005100032';

(async function () {
  let contractAddress;
  let account;

  const registerContract = new web3.eth.Contract(JSON.parse(ABI));

  await web3.eth.getAccounts((err, accs) => {
    if (err != null) return alert('There was an error fetching your accounts.');

    if (accs.length == 0)
      return alert(
        'No account found! Check that the Ethereum client is configured correctly.',
      );

    account = accs[0];
    web3.eth.defaultAccount = account;
  });

  await registerContract
    .deploy({ data: DATA })
    .send({
      from: '0x23c41A883EefC8b01BbD35FF8566a3305B8c78Fc',
      gas: '4700000',
    })
    .on('receipt', receipt => {
      console.log('Contract mined successfully', receipt.contractAddress);
      contractAddress = receipt.contractAddress;
    });

  const deployedContract = new web3.eth.Contract(
    JSON.parse(ABI),
    contractAddress,
  );

  async function newRegister() {
    let info = document.getElementById('newInfo').value;
    await deployedContract.methods.setInfo(info).send({ from: account });
    document.getElementById('newInfo').value = '';
    document.getElementById('lastInfo').innerHTML = info;
  }

  async function loadRegister() {
    const info = await deployedContract.methods.getInfo().call();
    document.getElementById('lastInfo').innerHTML = info + ' (verified)';
  }

  document
    .getElementById('btn-register')
    .addEventListener('click', newRegister);
  document.getElementById('btn-verify').addEventListener('click', loadRegister);
})();
