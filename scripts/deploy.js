const { ethers } = require('hardhat')
const fs = require('fs')
const path = require('path')

async function deployContract() {
  const [deployer] = await ethers.getSigners()

  // Explicitly check and log balance
  const balance = await ethers.provider.getBalance(deployer.address)
  console.log('Raw Balance:', balance)
  console.log('Formatted Balance:', ethers.formatEther(balance), 'ETH')

  // Define the contract and deployment parameters
  const taxPercent = 7
  const securityFeePercent = 5

  try {
    // Deploy the contract
    const DappBnbContract = await ethers.getContractFactory('DappBnb')
    const contract = await DappBnbContract.deploy(taxPercent, securityFeePercent)

    // Wait for the contract to be deployed
    await contract.waitForDeployment()

    // Get the contract address
    const contractAddress = await contract.getAddress()

    console.log('Contract deployed at address:', contractAddress)
    return contract
  } catch (error) {
    console.error('Deployment Error:', error.message)
    console.error('Detailed Error:', error)
    throw error
  }
}

async function saveContractAddress(contract) {
  const contractAddress = await contract.getAddress()
  const addressData = {
    dappBnbContract: contractAddress,
    deployedAt: new Date().toISOString(),
  }

  const addressFilePath = path.join(__dirname, '..', 'contracts', 'contractAddress.json')

  try {
    fs.writeFileSync(addressFilePath, JSON.stringify(addressData, null, 4), 'utf8')
    console.log('Deployed contract address saved:', JSON.stringify(addressData, null, 4))
  } catch (error) {
    console.error('Error saving contract address:', error)
    throw error
  }
}

async function main() {
  try {
    // Deploy the contract and save the address
    const contract = await deployContract()
    await saveContractAddress(contract)
    console.log('Contract deployment completed successfully.')
  } catch (error) {
    console.error('Deployment failed:', error)
    process.exitCode = 1
  }
}

main()
