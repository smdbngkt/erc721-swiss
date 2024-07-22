const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x5A451C9f1c01a1355d950403AdDE8188e074b60d";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SAMIDBANGKIT");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mintMany";
  const mintManyTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [signer.address, 100]),
    0
  );

  await mintManyTx.wait();
  console.log("Transaction Receipt: ", "https://explorer-evm.testnet.swisstronik.com/tx/"+mintManyTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
