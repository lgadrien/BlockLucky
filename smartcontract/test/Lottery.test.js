const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Lottery", function () {
  
  // Fixture pour déployer le contrat
  async function deployLotteryFixture() {
    const [owner, participant1, participant2, participant3, participant4] = await ethers.getSigners();
    
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy();
    
    return { lottery, owner, participant1, participant2, participant3, participant4 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      // Le contrat n'expose pas owner, donc on teste via startLottery
      await expect(lottery.connect(owner).startLottery(86400))
        .to.not.be.reverted;
    });

    it("Should initialize with CLOSED state", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);
      expect(await lottery.lotteryState()).to.equal(1); // CLOSED = 1
    });

    it("Should set the correct ticket price", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);
      expect(await lottery.ticketPrice()).to.equal(ethers.parseEther("0.0016"));
    });

    it("Should initialize with zero participants", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);
      expect(await lottery.participantsCount()).to.equal(0);
    });

    it("Should initialize with zero total bets", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);
      expect(await lottery.totalBets()).to.equal(0);
    });
  });

  describe("Start Lottery", function () {
    it("Should allow owner to start the lottery", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(owner).startLottery(86400))
        .to.emit(lottery, "LotteryStarted")
        .withArgs(86400);
      
      expect(await lottery.lotteryState()).to.equal(0); // OPEN = 0
    });

    it("Should revert if non-owner tries to start lottery", async function () {
      const { lottery, participant1 } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(participant1).startLottery(86400))
        .to.be.revertedWith("Seul le proprietaire peut demarrer la loterie.");
    });

    it("Should revert if lottery is already open", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await expect(lottery.connect(owner).startLottery(86400))
        .to.be.revertedWith("La loterie est deja ouverte.");
    });

    it("Should revert if duration is zero", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(owner).startLottery(0))
        .to.be.revertedWith("La duree doit etre superieure a zero.");
    });

    it("Should reset previous lottery data", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      // Première loterie
      await lottery.connect(owner).startLottery(86400);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      // Fermer et redémarrer (simulé pour le test)
      // Note: Il faudra implémenter closeLottery pour un vrai test
      
      expect(await lottery.participantsCount()).to.equal(1);
    });
  });

  describe("Buy Ticket", function () {
    it("Should allow participant to buy ticket", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await expect(lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") }))
        .to.emit(lottery, "TicketPurchased")
        .withArgs(participant1.address, ethers.parseEther("0.0016"));
      
      expect(await lottery.participantsCount()).to.equal(1);
      expect(await lottery.totalBets()).to.equal(ethers.parseEther("0.0016"));
      expect(await lottery.ticketBought(participant1.address)).to.equal(1);
    });

    it("Should allow same participant to buy multiple tickets", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      expect(await lottery.participantsCount()).to.equal(2);
      expect(await lottery.ticketBought(participant1.address)).to.equal(2);
      expect(await lottery.totalBets()).to.equal(ethers.parseEther("0.0032"));
    });

    it("Should revert if lottery is closed", async function () {
      const { lottery, participant1 } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") }))
        .to.be.revertedWith("La loterie est fermee.");
    });

    it("Should revert if wrong amount is sent", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await expect(lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.001") }))
        .to.be.revertedWith("Le montant envoye doit etre egal au prix du ticket.");
      
      await expect(lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.002") }))
        .to.be.revertedWith("Le montant envoye doit etre egal au prix du ticket.");
    });

    it("Should track multiple participants correctly", async function () {
      const { lottery, owner, participant1, participant2, participant3 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant3).buyTicket({ value: ethers.parseEther("0.0016") });
      
      expect(await lottery.participantsCount()).to.equal(3);
      expect(await lottery.totalBets()).to.equal(ethers.parseEther("0.0048"));
    });
  });

  describe("Distribute Winnings", function () {
    it("Should revert if no winner is designated", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      // Il faudrait fermer la loterie d'abord, mais testons la vérification du gagnant
      await expect(lottery.connect(owner).distributeWinnings())
        .to.be.revertedWith("Aucun gagnant n a ete designe.");
    });

    it("Should revert if lottery is not closed (no winner)", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      // Comme il n'y a pas de gagnant, ça va revert avec ce message en premier
      await expect(lottery.connect(owner).distributeWinnings())
        .to.be.revertedWith("Aucun gagnant n a ete designe.");
    });

    it("Should revert if non-owner tries to distribute", async function () {
      const { lottery, participant1 } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(participant1).distributeWinnings())
        .to.be.revertedWith("Seul le proprietaire peut distribuer les gains.");
    });

    // Note: Les tests complets de distribution nécessiteront l'implémentation
    // des fonctions pickWinner() et closeLottery()
  });

  describe("View Functions", function () {
    it("Should return correct participants count", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      expect(await lottery.participantsCount()).to.equal(0);
      
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      expect(await lottery.participantsCount()).to.equal(1);
      
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      expect(await lottery.participantsCount()).to.equal(2);
    });

    it("Should return correct total bets", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      expect(await lottery.totalBets()).to.equal(ethers.parseEther("0.0032"));
    });

    it("Should return correct ticket price", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);
      
      expect(await lottery.ticketPrice()).to.equal(ethers.parseEther("0.0016"));
    });

    it("Should track tickets bought per participant", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      expect(await lottery.ticketBought(participant1.address)).to.equal(3);
    });
  });

  describe("Contract Balance", function () {
    it("Should receive and hold ETH from ticket purchases", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      const contractBalance = await ethers.provider.getBalance(lottery.target);
      expect(contractBalance).to.equal(ethers.parseEther("0.0032"));
    });
  });
});
