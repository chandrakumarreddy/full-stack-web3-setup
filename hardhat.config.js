require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/e528c3d18928427e9478b68709ebcde8",
      accounts: [
        "e49e00933ec6730f8ff9ba981d1c64dc71ace0c9ec705e946235de60ea4129dc",
      ],
    },
  },
};
