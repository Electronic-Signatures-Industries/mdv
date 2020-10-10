pragma solidity ^0.6.0;

contract LibDocument {

    enum ACL {
        ADMIN,
        RECIPIENT
    }

    enum DocumentStatus {
        NONE,
        CREATED,
        RECIPIENT_ACCEPTED,
        RECIPIENT_CERTIFIED,
        SERVICE_FEE_SENT,        // not in v2
        SERVICE_FEE_RECEIVED,    // not in v2
        DOCUMENTS_RELEASED,      
        DOCUMENTS_RECEIVED,       // not in v2
        REJECTED,
        CANCELED
    }

    
    struct Document {        
        string fileIpfsJson;
        string certifiedFilesIpfsJson;
        uint256 status;
        // document signature
        string description;
        address recipient;
        address user;
        bytes32 email;
        bytes32 name;
        bytes32 lastName;
    }
}