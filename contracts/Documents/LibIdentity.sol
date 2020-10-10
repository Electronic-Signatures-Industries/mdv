pragma solidity ^0.6.0;

contract LibIdentity {

   enum IdentityType {
       USER,
       RECIPIENT
   }
    
    struct Identity {        
        address id;
        uint256 idType;
        string registeredApiKey;
        string publicKey;
        bool removed;
        uint256 index;
        uint256 expires;
    }

    struct UserAccess {
        uint256 expires;
        string description;
        bool enabled;
        bool created;
        string did;
    }
}