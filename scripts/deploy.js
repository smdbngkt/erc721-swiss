async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const SAMIDBANGKIT = await ethers.getContractFactory("SAMIDBANGKIT");
    const samidbangkit = await SAMIDBANGKIT.deploy();
  
    console.log("SAMIDBANGKIT deployed to:", samidbangkit.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  