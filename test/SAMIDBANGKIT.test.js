const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SAMIDBANGKIT Contract", function () {
    let SAMIDBANGKIT;
    let samidbangkit;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        SAMIDBANGKIT = await ethers.getContractFactory("SAMIDBANGKIT");
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy a new instance of the contract before each test
        samidbangkit = await SAMIDBANGKIT.deploy();
        // Wait for the deployment transaction to be mined
        await samidbangkit.deployTransaction.wait();
    });

    it("Should deploy with the correct name and symbol", async function () {
        expect(await samidbangkit.name()).to.equal("SAMIDBANGKIT");
        expect(await samidbangkit.symbol()).to.equal("SMD");
    });

    it("Should mint tokens correctly", async function () {
        await samidbangkit.mint(addr1.address);

        expect(await samidbangkit.ownerOf(0)).to.equal(addr1.address);
        expect(await samidbangkit.currentSupply()).to.equal(1);
    });

    it("Should not mint more than MAX_SUPPLY", async function () {
        for (let i = 0; i < 666; i++) {
            await samidbangkit.mint(addr1.address);
        }

        await expect(samidbangkit.mint(addr1.address)).to.be.revertedWith("Max supply reached");
    });

    it("Should return the correct current supply", async function () {
        await samidbangkit.mint(addr1.address);
        expect(await samidbangkit.currentSupply()).to.equal(1);
    });
});
