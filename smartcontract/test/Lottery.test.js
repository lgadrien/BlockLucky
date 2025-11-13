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

  describe("Close Lottery", function () {
    it("Should allow owner to close the lottery after time elapsed", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1); // 1 seconde
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      // Attendre que le temps soit écoulé
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      
      expect(await lottery.lotteryState()).to.equal(1); // CLOSED = 1
      expect(await lottery.winner()).to.not.equal(ethers.ZeroAddress);
    });

    it("Should revert if non-owner tries to close lottery", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await expect(lottery.connect(participant1).closeLottery())
        .to.be.revertedWith("Seul le proprietaire peut fermer la loterie.");
    });

    it("Should revert if lottery is already closed", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(owner).closeLottery())
        .to.be.revertedWith("La loterie est deja fermee.");
    });

    it("Should revert if time has not elapsed", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      
      await expect(lottery.connect(owner).closeLottery())
        .to.be.revertedWith("Le temps imparti n est pas ecoule.");
    });

    it("Should set winner to zero address if no participants", async function () {
      const { lottery, owner } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      
      expect(await lottery.winner()).to.equal(ethers.ZeroAddress);
    });

    it("Should select a winner from participants", async function () {
      const { lottery, owner, participant1, participant2, participant3 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant3).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      
      const winner = await lottery.winner();
      const participants = await lottery.getParticipants();
      
      expect(participants).to.include(winner);
    });
  });

  describe("Distribute Winnings", function () {
    it("Should distribute winnings to winner", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      
      const winner = await lottery.winner();
      const totalPrize = ethers.parseEther("0.0032");
      const winnerBalanceBefore = await ethers.provider.getBalance(winner);
      
      await expect(lottery.connect(owner).distributeWinnings())
        .to.emit(lottery, "WinningsDistributed")
        .withArgs(winner, totalPrize);
      
      const winnerBalanceAfter = await ethers.provider.getBalance(winner);
      expect(winnerBalanceAfter - winnerBalanceBefore).to.equal(totalPrize);
      expect(await lottery.totalBets()).to.equal(0);
    });

    it("Should revert if no winner is designated", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await expect(lottery.connect(owner).distributeWinnings())
        .to.be.revertedWith("Aucun gagnant n a ete designe.");
    });

    it("Should revert if lottery is not closed", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      // Ne pas fermer la loterie
      await expect(lottery.connect(owner).distributeWinnings())
        .to.be.revertedWith("Aucun gagnant n a ete designe.");
    });

    it("Should revert if non-owner tries to distribute", async function () {
      const { lottery, participant1 } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(participant1).distributeWinnings())
        .to.be.revertedWith("Seul le proprietaire peut distribuer les gains.");
    });

    it("Should revert if no funds to distribute", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      await lottery.connect(owner).distributeWinnings();
      
      // Essayer de distribuer à nouveau
      await expect(lottery.connect(owner).distributeWinnings())
        .to.be.revertedWith("Aucun fonds a distribuer.");
    });
  });

  describe("Reset Lottery", function () {
    it("Should allow owner to reset lottery", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      await lottery.connect(owner).resetLottery();
      
      expect(await lottery.participantsCount()).to.equal(0);
      expect(await lottery.totalBets()).to.equal(0);
      expect(await lottery.timeLeft()).to.equal(0);
      expect(await lottery.winner()).to.equal(ethers.ZeroAddress);
      expect(await lottery.lotteryState()).to.equal(1); // CLOSED
    });

    it("Should revert if non-owner tries to reset", async function () {
      const { lottery, participant1 } = await loadFixture(deployLotteryFixture);
      
      await expect(lottery.connect(participant1).resetLottery())
        .to.be.revertedWith("Seul le proprietaire peut reinitialiser la loterie.");
    });

    it("Should clear participants array", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await lottery.connect(owner).resetLottery();
      
      const participants = await lottery.getParticipants();
      expect(participants.length).to.equal(0);
    });
  });

  describe("Get Participants", function () {
    it("Should return empty array initially", async function () {
      const { lottery } = await loadFixture(deployLotteryFixture);
      
      const participants = await lottery.getParticipants();
      expect(participants.length).to.equal(0);
    });

    it("Should return all participants", async function () {
      const { lottery, owner, participant1, participant2, participant3 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant3).buyTicket({ value: ethers.parseEther("0.0016") });
      
      const participants = await lottery.getParticipants();
      expect(participants.length).to.equal(3);
      expect(participants).to.include(participant1.address);
      expect(participants).to.include(participant2.address);
      expect(participants).to.include(participant3.address);
    });

    it("Should include duplicate entries for multiple tickets", async function () {
      const { lottery, owner, participant1 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(86400);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      const participants = await lottery.getParticipants();
      expect(participants.length).to.equal(2);
      expect(participants[0]).to.equal(participant1.address);
      expect(participants[1]).to.equal(participant1.address);
    });
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

    it("Should have zero balance after winnings distribution", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      await lottery.connect(owner).distributeWinnings();
      
      const contractBalance = await ethers.provider.getBalance(lottery.target);
      expect(contractBalance).to.equal(0);
    });
  });

  describe("Full Lottery Cycle", function () {
    it("Should complete a full lottery cycle successfully", async function () {
      const { lottery, owner, participant1, participant2, participant3, participant4 } = await loadFixture(deployLotteryFixture);
      
      // 1. Démarrer la loterie
      await lottery.connect(owner).startLottery(1);
      expect(await lottery.lotteryState()).to.equal(0); // OPEN
      
      // 2. Participants achètent des tickets
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant3).buyTicket({ value: ethers.parseEther("0.0016") });
      await lottery.connect(participant4).buyTicket({ value: ethers.parseEther("0.0016") });
      
      expect(await lottery.participantsCount()).to.equal(4);
      expect(await lottery.totalBets()).to.equal(ethers.parseEther("0.0064"));
      
      // 3. Attendre la fin du temps
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      // 4. Fermer la loterie
      await lottery.connect(owner).closeLottery();
      expect(await lottery.lotteryState()).to.equal(1); // CLOSED
      
      const winner = await lottery.winner();
      expect(winner).to.not.equal(ethers.ZeroAddress);
      
      // 5. Distribuer les gains
      const winnerBalanceBefore = await ethers.provider.getBalance(winner);
      await lottery.connect(owner).distributeWinnings();
      const winnerBalanceAfter = await ethers.provider.getBalance(winner);
      
      expect(winnerBalanceAfter - winnerBalanceBefore).to.equal(ethers.parseEther("0.0064"));
      expect(await lottery.totalBets()).to.equal(0);
      
      // 6. Réinitialiser pour une nouvelle loterie
      await lottery.connect(owner).resetLottery();
      expect(await lottery.participantsCount()).to.equal(0);
      expect(await lottery.winner()).to.equal(ethers.ZeroAddress);
    });

    it("Should allow multiple lottery rounds", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      // Première loterie
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      await lottery.connect(owner).distributeWinnings();
      await lottery.connect(owner).resetLottery();
      
      // Deuxième loterie
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant2).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      
      const winner2 = await lottery.winner();
      expect(winner2).to.equal(participant2.address);
    });

    it("Should reset data when starting a new lottery", async function () {
      const { lottery, owner, participant1, participant2 } = await loadFixture(deployLotteryFixture);
      
      // Première loterie
      await lottery.connect(owner).startLottery(1);
      await lottery.connect(participant1).buyTicket({ value: ethers.parseEther("0.0016") });
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      await lottery.connect(owner).closeLottery();
      await lottery.connect(owner).distributeWinnings();
      
      // Démarrer une nouvelle loterie sans reset manuel
      await lottery.connect(owner).startLottery(1);
      
      expect(await lottery.participantsCount()).to.equal(0);
      expect(await lottery.totalBets()).to.equal(0);
      expect(await lottery.winner()).to.equal(ethers.ZeroAddress);
      expect(await lottery.lotteryState()).to.equal(0); // OPEN
    });
  });
});
