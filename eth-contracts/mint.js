const HDWalletProvider = require('truffle-hdwallet-provider');
const web3 = require('web3');
const fs = require("fs");
const MNEMONIC = fs.readFileSync(".secret").toString().trim();
const INFURA_KEY = "467560308ba64c28b783cf1d3bc2ecd9";
const NFT_CONTRACT_ADDRESS = "0x4249A815fe1a17139A49e0F2b3344C8B56965268";
const OWNER_ADDRESS = "0x662dcBF22Eca26564684Bc79e1fEA33ed6b91620";
const NETWORK = "rinkeby";
const NUM_TOKENS = 10;

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    'Please set a mnemonic, infura key, owner, network, and contract address.'
  );
  return;
}

const NFT_ABI = require("./build/contracts/SolnSquareVerifier.json").abi;

async function main() {
  const network =
    NETWORK === 'mainnet' || NETWORK === 'live' ? 'mainnet' : 'rinkeby'
  const provider = new HDWalletProvider(
    MNEMONIC,
    `https://${network}.infura.io/v3/${INFURA_KEY}`
  )
  const web3Instance = new web3(provider)

  if (NFT_CONTRACT_ADDRESS) {
    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
      { gasLimit: '1000000' }
    )

    // Creatures issued directly to the owner.
    for (var i = 0; i < NUM_TOKENS; i++) {
      try {
        const result = await nftContract.methods
          .mint(
            OWNER_ADDRESS, i,
            )
          .send({ from: OWNER_ADDRESS });
        console.log('Minted Token. Transaction: ' + result.transactionHash);
      } catch(e) {
        console.log(e);
      }
    }
  } else {
    console.error(
      'Add NFT_CONTRACT_ADDRESS to the environment variables'
    )
  }
}

main()