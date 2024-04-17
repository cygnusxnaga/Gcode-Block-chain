// SPDX-License-Identifier: MIT



/*
 //TODO`

GENERAL DESCRIPTION ( AP-ERC721A ):
    This is a low gas ERC721A NFT smart contract that utilizes
the Merkle Proof library to store a large pre-selected allowlist.
This contract has 2 mint functions that can be toggled independently.
This Contract includes The ERC-721A Burnable Library with a Toggle function.
All Predefined state variables include onlyOwner SET functions. 
WARNING! - Toggle functions CANNOT be reverted 

CONTRACT INFO:
- Deployment price: 0.05 ETH
- State Variable #: 9 

SETUP INSTRUCTIONS: 
1. Set Contract name
2. Set Max Supply
3. Set Mint Price
4. Set Max per wallet
5. Set Max per TX

POST DEPLOYMENT INSTRUCTIONS:
1. Set BaseURI (No json Extensions)
2. Collect WL wallets - Derive Merkle Root
3. Toggle WL Open (CANNOT REVERT)
4. Toggle Public Open (CANNOT REVERT)

TEST INSTRUCTIONS: 
1. Check if Metadata is showing
2. Check if Merkle Leafs can mint WL

 */

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ContractName is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * 10 ** 18; // Maximum total supply
    uint256 public constant INITIAL_SUPPLY = 0; // Initial supply, can be minted by owner
    uint256 public constant MAX_MINT_AMOUNT = 10000 * 10 ** 18; // Maximum amount that can be minted at once
    uint256 public constant MAX_MINT_PER_TX = 1000 * 10 ** 18; // Maximum mint amount per transaction

    string public constant NAME = "ContractName"; // Token name
    string public constant SYMBOL = "CN"; // Token symbol
    uint8 public constant DECIMALS = 18; // Token decimals

    bool public mintingActive = false; // Flag to toggle minting

    constructor() ERC20(NAME, SYMBOL) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        require(amount <= MAX_MINT_AMOUNT, "Exceeds max mint amount");
        _mint(to, amount);
    }

    function mintMultiple(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        uint256 totalAmount;
        for (uint256 i = 0; i < recipients.length; i++) {
            require(totalSupply() + totalAmount + amounts[i] <= MAX_SUPPLY, "Exceeds max supply");
            require(amounts[i] <= MAX_MINT_PER_TX, "Exceeds max mint per tx");
            totalAmount += amounts[i];
            _mint(recipients[i], amounts[i]);
        }
    }

    function toggleMinting() external onlyOwner {
        mintingActive = !mintingActive;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        super._beforeTokenTransfer(from, to, amount);
        require(mintingActive || from == owner(), "Token minting is not active");
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}