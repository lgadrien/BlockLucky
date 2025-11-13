// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {



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



    // Constructeur pour initialiser les variables d'état
    constructor( ) {
        
        owner = msg.sender;
        participantsCount = 0;
        totalBets = 0;
        timeLeft = 86400; // 24 heures en secondes
        ticketPrice = 0.0016 ether;
        winner = address(0);
        lotteryState = LotteryState.CLOSED;
    
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
        // Démarrer la loterie
        lotteryState = LotteryState.OPEN;
        //  Initialiser le temps restant
        timeLeft = block.timestamp + duration;
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



    // Fonction pour fermer la loterie (à implémenter)



    // Fonction pour effacer les données de la loterie (à implémenter)


}
