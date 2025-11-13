// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Storage
 * @dev Smart contract simple pour stocker et récupérer une valeur
 */
contract Storage {
    // Variable d'état pour stocker un nombre
    uint256 private storedValue;
    
    // Event émis lors de la modification de la valeur
    event ValueChanged(uint256 oldValue, uint256 newValue);
    
    /**
     * @dev Constructeur - initialise la valeur à 0
     */
    constructor() {
        storedValue = 0;
    }
    
    /**
     * @dev Stocke une nouvelle valeur
     * @param _value La valeur à stocker
     */
    function set(uint256 _value) public {
        uint256 oldValue = storedValue;
        storedValue = _value;
        emit ValueChanged(oldValue, _value);
    }
    
    /**
     * @dev Récupère la valeur stockée
     * @return La valeur actuelle
     */
    function get() public view returns (uint256) {
        return storedValue;
    }
}
