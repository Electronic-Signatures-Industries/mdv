pragma solidity ^0.6.0;

contract LibApproval {

    enum ACL {
        ADMIN,
        EDITORS
    }

    enum ApprovalSignedStatus {
        NONE,
        SIGNED
    }

    enum ApprovalStatus {
        NONE,
        CLOSED,
        COMPLETED
    }
    
    struct Approval {
        address signer;
        uint256 signedStatus;
        uint256 limitAmount;
        uint256 minSigners;
    }
}