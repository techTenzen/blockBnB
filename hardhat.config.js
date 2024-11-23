require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545', // Hardhat node default
    },
    ganache: {
      url: 'http://127.0.0.1:7545', // Ganache default
      accounts: GANACHE_PRIVATE_KEY ? [GANACHE_PRIVATE_KEY] : [],
      gas: 6000000,
      gasPrice: 20000000000,
    },
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000, // Increase for longer tests
  },
}
