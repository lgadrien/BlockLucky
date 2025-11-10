const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("BlockLucky", function () {
  let blockLucky;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  const TICKET_PRICE = ethers.parseEther("0.01"); // 0.01 ETH
  const LOTTERY_DURATION = 3600; // 1 heure

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    
    const BlockLucky = await ethers.getContractFactory("BlockLucky");
    blockLucky = await BlockLucky.deploy(TICKET_PRICE);
    await blockLucky.waitForDeployment();
  });

  describe("Déploiement", function () {
    it("Devrait définir le bon propriétaire", async function () {
      expect(await blockLucky.owner()).to.equal(owner.address);
    });

    it("Devrait définir le bon prix du ticket", async function () {
      expect(await blockLucky.ticketPrice()).to.equal(TICKET_PRICE);
    });

    it("Devrait initialiser lotteryId à 0", async function () {
      expect(await blockLucky.lotteryId()).to.equal(0);
    });
  });

  describe("Création de loterie", function () {
    it("Devrait permettre au propriétaire de créer une loterie", async function () {
      const tx = await blockLucky.createLottery(LOTTERY_DURATION);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);
      
      await expect(tx)
        .to.emit(blockLucky, "LotteryCreated")
        .withArgs(1, TICKET_PRICE, block.timestamp + LOTTERY_DURATION);
      
      expect(await blockLucky.lotteryId()).to.equal(1);
    });

    it("Ne devrait pas permettre à un non-propriétaire de créer une loterie", async function () {
      await expect(
        blockLucky.connect(addr1).createLottery(LOTTERY_DURATION)
      ).to.be.revertedWith("Seul le proprietaire peut executer cette fonction");
    });
  });

  describe("Achat de tickets", function () {
    beforeEach(async function () {
      await blockLucky.createLottery(LOTTERY_DURATION);
    });

    it("Devrait permettre d'acheter un ticket avec le bon montant", async function () {
      await expect(
        blockLucky.connect(addr1).buyTicket({ value: TICKET_PRICE })
      ).to.emit(blockLucky, "TicketPurchased")
        .withArgs(1, addr1.address);
      
      expect(await blockLucky.getPlayersCount(1)).to.equal(1);
    });

    it("Ne devrait pas permettre d'acheter un ticket avec un mauvais montant", async function () {
      await expect(
        blockLucky.connect(addr1).buyTicket({ value: ethers.parseEther("0.005") })
      ).to.be.revertedWith("Le montant envoye doit etre egal au prix du ticket");
    });

    it("Devrait permettre à plusieurs joueurs d'acheter des tickets", async function () {
      await blockLucky.connect(addr1).buyTicket({ value: TICKET_PRICE });
      await blockLucky.connect(addr2).buyTicket({ value: TICKET_PRICE });
      await blockLucky.connect(addr3).buyTicket({ value: TICKET_PRICE });
      
      expect(await blockLucky.getPlayersCount(1)).to.equal(3);
    });

    it("Ne devrait pas permettre d'acheter un ticket après la fin de la loterie", async function () {
      await time.increase(LOTTERY_DURATION + 1);
      
      await expect(
        blockLucky.connect(addr1).buyTicket({ value: TICKET_PRICE })
      ).to.be.revertedWith("La loterie est terminee");
    });
  });

  describe("Sélection du gagnant", function () {
    beforeEach(async function () {
      await blockLucky.createLottery(LOTTERY_DURATION);
      await blockLucky.connect(addr1).buyTicket({ value: TICKET_PRICE });
      await blockLucky.connect(addr2).buyTicket({ value: TICKET_PRICE });
      await blockLucky.connect(addr3).buyTicket({ value: TICKET_PRICE });
    });

    it("Ne devrait pas permettre de sélectionner un gagnant avant la fin", async function () {
      await expect(
        blockLucky.selectWinner()
      ).to.be.revertedWith("La loterie n'est pas encore terminee");
    });

    it("Devrait sélectionner un gagnant après la fin de la loterie", async function () {
      await time.increase(LOTTERY_DURATION + 1);
      
      await expect(blockLucky.selectWinner())
        .to.emit(blockLucky, "WinnerSelected");
      
      const lottery = await blockLucky.lotteries(1);
      expect(lottery.isActive).to.be.false;
      expect(lottery.winner).to.not.equal(ethers.ZeroAddress);
    });

    it("Ne devrait pas permettre à un non-propriétaire de sélectionner le gagnant", async function () {
      await time.increase(LOTTERY_DURATION + 1);
      
      await expect(
        blockLucky.connect(addr1).selectWinner()
      ).to.be.revertedWith("Seul le proprietaire peut executer cette fonction");
    });
  });

  describe("Modification du prix du ticket", function () {
    it("Devrait permettre au propriétaire de modifier le prix", async function () {
      const newPrice = ethers.parseEther("0.02");
      await blockLucky.setTicketPrice(newPrice);
      
      expect(await blockLucky.ticketPrice()).to.equal(newPrice);
    });

    it("Ne devrait pas permettre à un non-propriétaire de modifier le prix", async function () {
      const newPrice = ethers.parseEther("0.02");
      
      await expect(
        blockLucky.connect(addr1).setTicketPrice(newPrice)
      ).to.be.revertedWith("Seul le proprietaire peut executer cette fonction");
    });
  });
});
