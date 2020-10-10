pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";


contract FE  is ERC721, ERC721Burnable {
    using Counters for Counters.Counter;
    using Address for address payable;

    address owner;
    Counters.Counter private _tokenIds;

    constructor() ERC721("FacturaElectronicaDGI", "FE") public {
        owner = msg.sender;
    }

    function mint(string memory tokenURI) public returns (uint256) {
       require(msg.sender == owner);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}