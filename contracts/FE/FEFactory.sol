pragma solidity ^0.6.0;

import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./FE.sol";

contract FEFactory {
    using EnumerableSet for EnumerableSet.AddressSet;
    using SafeMath for uint256;
    using Address for address payable;


    // Emits when an document is created
    event LogTokenCreated(address indexed token);
    event LogTokenRemoved(address indexed token);
    event Withdrawn(address indexed payee, uint256 weiAmount);
    address public owner;
    uint256 fee = 0.002*1e18;
    // tokens
    EnumerableSet.AddressSet internal tokens;



    constructor()  public {
        owner = msg.sender;
    }

    function setFee(uint256 _fee) public {
        require(msg.sender == owner, "INVALID_USER");
        fee = _fee;
    }

    function getFee() public returns (uint256) {
        return fee;
    }

    function withdraw(address payable payee) public {
        require(msg.sender == owner, "INVALID_USER");
        uint256 b = address(this).balance;
        payee.sendValue(address(this).balance);

        emit Withdrawn(payee, b);
    }

    function mint(string memory tokenURI)
    public payable returns (address) {

        require(msg.value == fee, "MUST SEND FEE BEFORE USE");

        address token = address(new FE());
        FE(token).mint(tokenURI);
        bool ok = tokens.add(token);
        emit LogTokenCreated(token);

        return token;
    }

    function removeTokenTemplate(address token) public returns (bool) {
        require(msg.sender == owner, "INVALID_USER");

        bool ok = tokens.remove(token);

        emit LogTokenRemoved(token);

        return ok;
    }

    function count() public view returns (uint256) {
        return tokens.length();
    }
    
    function get(uint256 index) public view returns (address) {
        return tokens.at(index);
    }

}