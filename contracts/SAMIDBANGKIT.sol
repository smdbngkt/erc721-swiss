// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SAMIDBANGKIT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public constant MAX_SUPPLY = 666;

    constructor() ERC721("SAMIDBANGKIT", "SMD") {}

    function mint(address to) external onlyOwner {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        _mint(to, _tokenIdCounter);
        _tokenIdCounter++;
    }

    function mintMany(address to, uint256 amount) external onlyOwner {
        require(_tokenIdCounter + amount <= MAX_SUPPLY, "Exceeds max supply");
        for (uint256 i = 0; i < amount; i++) {
            _mint(to, _tokenIdCounter);
            _tokenIdCounter++;
        }
    }

    function currentSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
