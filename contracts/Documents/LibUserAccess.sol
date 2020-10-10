pragma solidity ^0.6.0;

pragma experimental ABIEncoderV2;

import './LibIdentity.sol';
import "../../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../../node_modules/@openzeppelin/contracts/utils/EnumerableSet.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract LibUserAccess is LibIdentity, AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;
    using Counters for Counters.Counter;
    bytes32 public constant ADMIN = keccak256("ADMIN");

    event LogIdentityAdded(address indexed id);

    event LogUserAccessEnabled(string apiKey);
    event LogUserAccessRenewed(string apiKey);
    event LogUserAccessCreated(string key);

    // users registered in template
    mapping(address => UserAccess) public users;
    Counters.Counter public userCount;

    address public owner;

    // UserAccess
    mapping (string => UserAccess) public UserAccesss;

    constructor(address _owner) public {
        _setupRole(DEFAULT_ADMIN_ROLE, _owner);
        owner = _owner;
    }
 
    function addACL(address user) public returns (bool) {
        // requires owner
        require(owner == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
        grantRole(ADMIN, user);
        return true;
    }

    function removeACL(address user) public returns (bool) {
        // requires owner
        require(owner == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
        revokeRole(ADMIN, user);
        return true;
    }

    function createUserAccess(string memory key, uint256 expires, string memory description) public returns (string memory) {
        require(hasRole(ADMIN, msg.sender), "INVALID_USER");
        UserAccesss[key] = UserAccess({
            expires: expires,
            enabled: false,
            created: true,
            did: '',
            description: description
        });

        emit LogUserAccessCreated(key);
        return key;
    }

    // renew
    function renewUserAccess(address id,  string memory key, uint256 expires) public returns(bool) {
        require(UserAccesss[key].created || UserAccesss[key].enabled == false, "INVALID_UA_KEY");

        // apply UserAccess key
        emit LogUserAccessRenewed(key);

        users[id].expires = expires;
        return true;
    }
    
    function isAdmin(address admin) public view returns (bool) {
        require(hasRole(ADMIN, admin), "INVALID_ADMIN");

        return true;
    }

    function addIdentity(address id, string memory did, string memory key) public returns (bool) {
        require(UserAccesss[key].created == true || UserAccesss[key].enabled == false, "INVALID_UA_KEY");

        // apply UserAccess key
        UserAccesss[key].enabled = true;
        UserAccesss[key].created = true;
        UserAccesss[key].did = did;

        users[id] = UserAccesss[key];

        emit LogIdentityAdded(id);
        emit LogUserAccessEnabled(key);

        userCount.increment();

        return true;
    }


  //  function removeIdentity(address id) public returns(bool) {
        // require(hasRole(ADMIN, msg.sender), "INVALID_OWNER");

        // Identity memory identity = idUsers[id];
        // // disabled UserAccess
        // UserAccesss[identity.registeredApiKey].enabled = false;
        // idUsers[id].removed = true;
        // idUserArray[identity.index].removed = true;
//    }

}