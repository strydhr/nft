const fs = require('fs')
let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {
  const {deploy, log} = deployments
  const {deployer} = await getNamedAccounts()
  const chainId = await getChainId()

  log("--------------------")
  const SlimeNFT = await deploy("Slime",{
    from:deployer,
    log:true
  })

  log(`NFT contract added to ${SlimeNFT.address}`)
  let filepath = "./img/test.svg"
  let svg = fs.readFileSync(filepath,{ encoding:"utf8"})

  const svgNFTContract = await ethers.getContractFactory("Slime")
  const accounts = await hre.ethers.getSigners()
  const signer = accounts[0]
  const NFT = new ethers.Contract(SlimeNFT.address,svgNFTContract.interface,signer)
  const networkName = networkConfig[chainId]['name']
  log(`Verify with: npx hardhat verify --network ${networkName} ${NFT.address}`)

  let transactionResponse = await NFT.create(svg)
  let receipt = await transactionResponse.wait(1)
  log(`NFT Made`)
  log(`View NFT here: ${await NFT.tokenURI(0)}`)
}
