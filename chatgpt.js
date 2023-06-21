const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  
  const { expect } = require("chai");
  
  describe("TokenBoundAccountTests", function () {
    let owner;
    let signer1;
    let signer2;
    let otherAccount;
    let accountContract;
    let accountRegistryContract;
    let ERC721Contract;
  
    beforeEach(async () => {
      [owner, signer1, signer2, otherAccount] = await ethers.getSigners();
  
      const AccountContract = await ethers.getContractFactory("Account");
      accountContract = await AccountContract.deploy(signer1.address);
      await accountContract.waitForDeployment();
  
      const AccountRegistryContract = await ethers.getContractFactory("AccountRegistry");
      accountRegistryContract = await AccountRegistryContract.deploy(accountContract);
  
      const NFTRegistryContract = await ethers.getContractFactory("MYERC721");
      ERC721Contract = await NFTRegistryContract.deploy();
    });
  
    describe("Deployment", function () {
      it("should deploy all contracts", async function () {
        console.log("Owner address:", owner.address);
        console.log("Account contract address:", accountContract.address);
        console.log("Account registry contract address:", accountRegistryContract.address);
        console.log("NFT registry contract address:", ERC721Contract.address);
  
        expect(await ERC721Contract.name()).to.equal("MyToken");
      });
  
      it("should set the correct name and symbol", async function () {
        expect(await ERC721Contract.name()).to.equal("MyToken");
        expect(await ERC721Contract.symbol()).to.equal("MTK");
      });
    });
  
    // Rest of your test cases...
  });
  