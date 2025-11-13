// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {

// Structure pour stocker l'historique des loteries
    struct LotteryHistory {
        uint lotteryId;
        address winner;
        uint totalBets;
        uint participantsCount;
        uint startTime;
        uint endTime;
        uint ticketsSold;
    }

    // Tableau pour stocker l'historique
    LotteryHistory[] public lotteryHistory;
    // ID de la loterie actuelle
    uint public currentLotteryId;

// Variables d'état
    enum LotteryState { OPEN, CLOSED }
    // État actuel de la loterie
    LotteryState public lotteryState;
    // Propriétaire du contrat
    address private owner;
    // Adresse des participants
    address[] public participants;
    mapping(address => uint) public ticketBought;
    // Nombre de participants
    uint public participantsCount;
    // Montant total des mises
    uint public totalBets;
    // Durée restante avant la fin de la loterie
    uint public timeLeft;
    // Prix d'un ticket
    uint public ticketPrice;
    // Adresse du gagnant
    address public winner;
    // Timestamp de début de la loterie
    uint public startTime;
    // Nombre total de tickets vendus
    uint public ticketsSold;



    // Constructeur pour initialiser les variables d'état
    constructor( ) {
        
        owner = msg.sender;
        participantsCount = 0;
        totalBets = 0;
        timeLeft = 86400; // 24 heures en secondes
        ticketPrice = 0.0016 ether;
        winner = address(0);
        lotteryState = LotteryState.CLOSED;
        currentLotteryId = 0;
        ticketsSold = 0;
    
    }



// Event pour lancer le temps de la loterie
event LotteryStarted(uint duration);
    
    // Fonction pour démarrer la loterie
    function startLottery(uint duration) public {
        // Vérifier que seul le propriétaire peut démarrer la loterie
        require(msg.sender == owner, "Seul le proprietaire peut demarrer la loterie.");
        // Vérifier que la loterie est fermée avant de la démarrer
        require(lotteryState == LotteryState.CLOSED, "La loterie est deja ouverte.");
        // Vérifier que la durée est valide
        require(duration > 0, "La duree doit etre superieure a zero.");
        // Réinitialiser les données de la loterie précédente
        delete participants;
        // Réinitialiser les compteurs
        participantsCount = 0;
        totalBets = 0;
        winner = address(0);
        ticketsSold = 0;
        // Incrémenter l'ID de la loterie
        currentLotteryId++;
        // Démarrer la loterie
        lotteryState = LotteryState.OPEN;
        //  Initialiser le temps restant
        timeLeft = block.timestamp + duration;
        // Enregistrer l'heure de début
        startTime = block.timestamp;
        // Émettre un événement pour le démarrage de la loterie
        emit LotteryStarted(duration);
    }



// Event pour l'achat d'un ticket
event TicketPurchased(address indexed participant, uint amount);

    // Fonction pour acheter un ticket de loterie
    function buyTicket() public payable {
        // Vérifier que la loterie est ouverte
        require(lotteryState == LotteryState.OPEN, "La loterie est fermee.");
        // Vérifier que le montant envoyé est égal au prix du ticket
        require(msg.value == ticketPrice, "Le montant envoye doit etre egal au prix du ticket.");
        // Incrémenter le nombre de participants et le total des mises
        participantsCount += 1;
        // Ajouter le montant de la mise au total des mises
        totalBets += msg.value;
        // Ajouter le participant à la liste et incrémenter le nombre de tickets achetés
        participants.push(msg.sender);
        // Incrémenter le nombre de tickets achetés par le participant
        ticketBought[msg.sender] += 1;
        // Incrémenter le nombre total de tickets vendus
        ticketsSold++;
        // Émettre un événement pour l'achat du ticket
        emit TicketPurchased(msg.sender, msg.value);
    }



    // Fonction pour tirer un gagnant

    // Event pour la distribution des gains
    event WinningsDistributed(address indexed winner, uint amount);
    
    // Fonction pour distribuer les gains au gagnant
    function distributeWinnings() public {
        // Vérifier que seul le propriétaire peut distribuer les gains
        require(msg.sender == owner, "Seul le proprietaire peut distribuer les gains.");
        // Vérifier qu'un gagnant a été désigné
        require(winner != address(0), "Aucun gagnant n a ete designe.");
        // Vérifier que la loterie est fermée
        require(lotteryState == LotteryState.CLOSED, "La loterie doit etre fermee.");
        // Vérifier qu'il y a des fonds à distribuer
        require(totalBets > 0, "Aucun fonds a distribuer.");
        // Stocker le montant à transférer
        uint amountToTransfer = totalBets;
        // Réinitialiser totalBets avant le transfert (protection contre la réentrance)
        totalBets = 0;
        // Transférer les gains au gagnant
        (bool success, ) = payable(winner).call{value: amountToTransfer}("");
        require(success, "Le transfert a echoue.");
        // Émettre un événement pour la distribution des gains
        emit WinningsDistributed(winner, amountToTransfer);
    }



    // Fonction pour fermer la loterie avec une seed du frontend
    function closeLottery(uint256 frontendSeed) public {
        // Vérifier que seul le propriétaire peut fermer la loterie
        require(msg.sender == owner, "Seul le proprietaire peut fermer la loterie.");
        // Vérifier que la loterie est ouverte
        require(lotteryState == LotteryState.OPEN, "La loterie est deja fermee.");
        // Vérifier que le temps imparti est écoulé
        require(block.timestamp >= timeLeft, "Le temps imparti n est pas ecoule.");
        // Vérifier que la seed n'est pas nulle
        require(frontendSeed > 0, "La seed du frontend doit etre superieure a zero.");
        // Fermer la loterie
        lotteryState = LotteryState.CLOSED;
        // Désigner un gagnant aléatoire parmi les participants avec seed du frontend
        if (participantsCount > 0) {
            uint randomIndex = uint(keccak256(abi.encodePacked(
                block.timestamp,
                block.prevrandao,
                frontendSeed,
                msg.sender,
                participantsCount
            ))) % participantsCount;
            winner = participants[randomIndex];
        } else {
            winner = address(0); // Aucun participant, pas de gagnant
        }
        
        // Enregistrer dans l'historique
        lotteryHistory.push(LotteryHistory({
            lotteryId: currentLotteryId,
            winner: winner,
            totalBets: totalBets,
            participantsCount: participantsCount,
            startTime: startTime,
            endTime: block.timestamp,
            ticketsSold: ticketsSold
        }));
    }



    // Fonction pour effacer les données de la loterie (à implémenter)
    function resetLottery() public {
        // Vérifier que seul le propriétaire peut réinitialiser la loterie
        require(msg.sender == owner, "Seul le proprietaire peut reinitialiser la loterie.");
        // Réinitialiser les données de la loterie
        delete participants;
        participantsCount = 0;
        totalBets = 0;
        timeLeft = 0;
        winner = address(0);
        lotteryState = LotteryState.CLOSED;
    }

    // Fonction pour obtenir la liste des participants
    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    // Fonction pour obtenir l'historique complet des loteries
    function getLotteryHistory() public view returns (LotteryHistory[] memory) {
        return lotteryHistory;
    }

    // Fonction pour obtenir une loterie spécifique de l'historique
    function getLotteryById(uint _lotteryId) public view returns (LotteryHistory memory) {
        require(_lotteryId > 0 && _lotteryId <= lotteryHistory.length, "ID de loterie invalide");
        return lotteryHistory[_lotteryId - 1];
    }

    // Fonction pour obtenir le nombre total de loteries passées
    function getTotalLotteries() public view returns (uint) {
        return lotteryHistory.length;
    }


}
