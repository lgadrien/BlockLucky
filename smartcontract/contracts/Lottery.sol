// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    
    // Propriétaire du contrat
    address private owner;
    // Nombre de participants
    uint public participantsCount;
    // Nombre minimum de participants requis pour tirer un gagnant
    uint public minParticipants;
    // Montant total des mises
    uint public totalBets;
    // Durée restante avant la fin de la loterie
    uint public timeLeft;
    // Prix d'un ticket
    uint public ticketPrice;
    // Adresse du gagnant
    address public winner;

    constructor( ) {
        
        owner = msg.sender;
        participantsCount = 0;
        minParticipants = 3;
        totalBets = 0;
        timeLeft = 0;
        ticketPrice = 0.0016 ether;
        winner = address(0);
    }

    // Fonction pour acheter un ticket de loterie
    function buyTicket() public payable {
        // Vérifier que le montant envoyé est égal au prix du ticket
        require(msg.value == ticketPrice, "Le montant envoye doit etre egal au prix du ticket.");
        // Incrémenter le nombre de participants et le total des mises
        participantsCount += 1;
        // Ajouter le montant de la mise au total des mises
        totalBets += msg.value;
    }
}
