const fs = require('fs');
const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const gasPriceTestnetRaw = fs
  .readFileSync('.testnet.gas-price.json')
  .toString()
  .trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error(
    'unable to retrieve testnet gas price from .testnet.gas-price.json',
  );
}

module.exports = {
  contracts_build_directory: path.join(__dirname, 'src/contracts'),
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    regtest: {
      protocol: 'http',
      host: '127.0.0.1',
      port: 4444,
      network_id: 33,
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.TESTNET_SEED_PHRASE,
          'https://public-node.testnet.rsk.co/2.0.1/',
          0,
          10,
          false,
          // Ref: https://developers.rsk.co/rsk/architecture/account-based/#derivation-path-info
          `m/44'/37310'/0'/0/`,
        ),
      // Ref: http://developers.rsk.co/rsk/architecture/account-based/#chainid
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.5.16',
    },
  },
};
