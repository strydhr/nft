require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
require('dotenv').config();

const RINKEBY_RPC_URL = "https://eth-rinkeby.alchemyapi.io/v2/Lwc8O_G6KPJ86Bsv3WwQeOVFfNK6gwyj";
const MNEMONIC ="taxi rate evil alert coin alien sustain asset captain analyst alien lyrics";
const ETHERSCAN_API_KEY ="FZG3I81I81UKH2HJT1KZJD4EJ91UZQJMAC";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    hardhat: { },
    rinkeby:{
      url:RINKEBY_RPC_URL,
      accounts:{
          mnemonic: MNEMONIC,
      },
      saveDeployment:true
    }
  },
  etherscan:{
    apiKey: ETHERSCAN_API_KEY
  },

  solidity: "0.8.0",
  namedAccounts:{
    deployer:{
      default:0
    }
  }
};
