// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title BlockLucky
 * @dev Contrat de loterie décentralisée sur Ethereum
 * @notice Ce contrat permet de créer une loterie transparente et équitable
 */
contract BlockLucky {
    // État du contrat
    address public owner;
    uint256 public lotteryId;
    uint256 public ticketPrice;
    
    // Structure pour une loterie
    struct Lottery {
        uint256 id;
        uint256 prizePool;
        address[] players;
        address winner;
        bool isActive;
        uint256 endTime;
    }
    
    // Mapping pour stocker les loteries
    mapping(uint256 => Lottery) public lotteries;
    
    // Events
    event LotteryCreated(uint256 indexed lotteryId, uint256 ticketPrice, uint256 endTime);
    event TicketPurchased(uint256 indexed lotteryId, address indexed player);
    event WinnerSelected(uint256 indexed lotteryId, address indexed winner, uint256 prizeAmount);
    
    // Modificateurs
    modifier onlyOwner() {
        require(msg.sender == owner, "Seul le proprietaire peut executer cette fonction");
        _;
    }
    
    modifier lotteryExists(uint256 _lotteryId) {
        require(_lotteryId <= lotteryId && _lotteryId > 0, "Cette loterie n'existe pas");
        _;
    }
    
    /**
     * @dev Constructeur du contrat
     * @param _ticketPrice Prix d'un ticket en wei
     */
    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        lotteryId = 0;
    }
    
    /**
     * @dev Créer une nouvelle loterie
     * @param _duration Durée de la loterie en secondes
     */
    function createLottery(uint256 _duration) external onlyOwner {
        lotteryId++;
        
        Lottery storage newLottery = lotteries[lotteryId];
        newLottery.id = lotteryId;
        newLottery.prizePool = 0;
        newLottery.isActive = true;
        newLottery.endTime = block.timestamp + _duration;
        
        emit LotteryCreated(lotteryId, ticketPrice, newLottery.endTime);
    }
    
    /**
     * @dev Acheter un ticket pour la loterie active
     */
    function buyTicket() external payable lotteryExists(lotteryId) {
        Lottery storage currentLottery = lotteries[lotteryId];
        
        require(currentLottery.isActive, "La loterie n'est pas active");
        require(block.timestamp < currentLottery.endTime, "La loterie est terminee");
        require(msg.value == ticketPrice, "Le montant envoye doit etre egal au prix du ticket");
        
        currentLottery.players.push(msg.sender);
        currentLottery.prizePool += msg.value;
        
        emit TicketPurchased(lotteryId, msg.sender);
    }
    
    /**
     * @dev Sélectionner un gagnant aléatoire
     * @notice Utilise un générateur de nombre pseudo-aléatoire (à améliorer en production)
     */
    function selectWinner() external onlyOwner lotteryExists(lotteryId) {
        Lottery storage currentLottery = lotteries[lotteryId];
        
        require(currentLottery.isActive, "La loterie n'est pas active");
        require(block.timestamp >= currentLottery.endTime, "La loterie n'est pas encore terminee");
        require(currentLottery.players.length > 0, "Aucun participant");
        
        // Génération d'un nombre pseudo-aléatoire (à améliorer avec Chainlink VRF en production)
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            currentLottery.players.length
        ))) % currentLottery.players.length;
        
        address winner = currentLottery.players[randomIndex];
        currentLottery.winner = winner;
        currentLottery.isActive = false;
        
        uint256 prizeAmount = currentLottery.prizePool;
        
        // Transfert du prix au gagnant
        (bool success, ) = winner.call{value: prizeAmount}("");
        require(success, "Le transfert a echoue");
        
        emit WinnerSelected(lotteryId, winner, prizeAmount);
    }
    
    /**
     * @dev Obtenir les joueurs d'une loterie
     * @param _lotteryId L'ID de la loterie
     */
    function getPlayers(uint256 _lotteryId) external view lotteryExists(_lotteryId) returns (address[] memory) {
        return lotteries[_lotteryId].players;
    }
    
    /**
     * @dev Obtenir le nombre de joueurs d'une loterie
     * @param _lotteryId L'ID de la loterie
     */
    function getPlayersCount(uint256 _lotteryId) external view lotteryExists(_lotteryId) returns (uint256) {
        return lotteries[_lotteryId].players.length;
    }
    
    /**
     * @dev Modifier le prix du ticket
     * @param _newPrice Le nouveau prix en wei
     */
    function setTicketPrice(uint256 _newPrice) external onlyOwner {
        ticketPrice = _newPrice;
    }
}
