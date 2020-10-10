pragma solidity ^0.6.0;


import "../../node_modules/@openzeppelin/contracts/GSN/GSNRecipient.sol";
import "../../node_modules/@openzeppelin/contracts/GSN/GSNRecipientERC20Fee.sol";
import "../../node_modules/@openzeppelin/contracts/utils/EnumerableSet.sol";

import "../../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import './LibApproval.sol';
import './IExtension.sol';

contract Approvals is LibApproval, AccessControl, IExtension {

    bytes32 public constant EDITOR = keccak256("EDITOR");
    bytes32 public constant ADMIN = keccak256("ADMIN");

    // Emits when an document is created
    event LogAddApproval(uint256 indexed id);
    event LogRemoveApproval(uint256 indexed id);
    event LogSetApprovalOwnerStatus(uint256 indexed id);

    address public owner;

    // approvals
    mapping (uint256 => mapping (address => Approval)) public approvals;
    mapping (uint256 => uint256) public approvalSignerCount;
    mapping (uint256 => uint256) public closedApprovals;
    mapping (uint256 => address) public signerMapping;
    uint256 public approvalCount;
    constructor() public  {
        owner = msg.sender;
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
    }

     // Adds a new approval flow, requires editor
    function add(address sender, address[] memory signers, uint256[] memory limitAmount, uint256 minSignersCount) 
    public returns (uint256) {
        // requires editor
        require(hasRole(EDITOR, sender), "DOES_NOT_HAVE_EDITOR_ROLE");
        approvalCount++;

        for (uint i = 0; i < signers.length; i++) {
            approvals[approvalCount][signers[i]] = Approval({
                signer: signers[i],
                signedStatus: uint(ApprovalSignedStatus.NONE),
                limitAmount: limitAmount[i],
                minSigners: minSignersCount
            });
            signerMapping[i] = signers[i];

        }
        approvalSignerCount[approvalCount] = signers.length;

        emit LogAddApproval(approvalCount);
        return approvalCount;
    }

    // Sets to close an existing approval
    function remove(uint256 id) public returns (bool) {
        // requires editor
        require(hasRole(EDITOR, msg.sender), "DOES_NOT_HAVE_EDITOR_ROLE");
        require(approvalSignerCount[id] != 0, "Approval not found");
        closedApprovals[id] = uint(ApprovalStatus.CLOSED);

        emit LogRemoveApproval(id);
        return true;    
    }

    function has(uint256 id) public view returns (bool) {
        require(closedApprovals[id] == uint(ApprovalStatus.NONE) && approvalSignerCount[id] != 0, "Approval not found");
        return true;
    }

    function getSignersCount(uint256 id) public view returns (uint256) {
        require(closedApprovals[id] == uint(ApprovalStatus.NONE) && approvalSignerCount[id] != 0, "Approval not found or invalid");
        return approvalSignerCount[id];
    }

    function canExec(uint256 id, address sender) public override returns (bool){
        require(canApproved(id, sender), "WF_EXT_INVALID_SENDER");
        return true;
    }


    function executeExtension(uint256 id, address sender, bytes calldata data) external override returns (bool){
        (uint256 amount) = abi.decode(data, (uint256));

        setApproved(id, sender, uint256(amount));
        return true;
    }

    // Sets signer to approved
    function setApproved(uint256 id, address sender, uint256 amountRequested) public returns (bool) {
        require(canApproved(id, sender));
        require(closedApprovals[id] == uint(ApprovalStatus.NONE) && approvalSignerCount[id] != 0, "Approval not found or invalid");

        uint256 signedCount = 0;
        uint256 minSigners = 0;
        // loop and count min signing count
        for (uint i = 0; i < approvalSignerCount[id]; ++i) {
            // has user signed, then add to count
            if (approvals[id][signerMapping[i]].signedStatus == uint(ApprovalSignedStatus.SIGNED)) {
                signedCount++;
            }
            // if minimum has been met, then throw
            require(approvals[id][signerMapping[i]].minSigners > signedCount, "Minimum allowed signatures for document completed");
            minSigners = approvals[id][signerMapping[i]].minSigners;
             
        }


        // Set approved if it matches allowed limit
        require(approvals[id][sender].limitAmount >= amountRequested, "Amount request limit met, please request more");
        approvals[id][sender].signedStatus = uint(ApprovalSignedStatus.SIGNED);
        signedCount++;

        bool isClosed = false;
        // close if min has been met
        if (minSigners == signedCount) {
            isClosed = true;
            closedApprovals[id] = uint(ApprovalStatus.COMPLETED);
        }

        emit LogSetApprovalOwnerStatus(id);
        return isClosed;
    }

    function canApproved(uint256 id, address sender) public view returns (bool) {
        require(closedApprovals[id] == uint(ApprovalStatus.NONE) && approvalSignerCount[id] != 0, "Approval not found or invalid");
        require(approvals[id][sender].signedStatus == uint(ApprovalSignedStatus.NONE), "Already approved");

        // require(approvals[id][msg.sender].limitAmount > 0, "Must be previously registered as a signer");
    
        if (approvals[id][sender].limitAmount <= 0) {
            return false;
        }
        return true;
    }

    function addACL(address user, uint8 aclType) public returns (bool) {
        if (aclType == 0) {
            // requires owner
            require(owner == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
            grantRole(ADMIN, user);
        } else {
            // requires editor
            require(owner == msg.sender, "DOES_NOT_HAVE_ADMIN_ROLE");
            grantRole(EDITOR, user);
        }
        return true;
    }

    function removeACL(address user, uint8 aclType) public returns (bool) {
        if (aclType == 0) {
            // requires owner
            require(owner == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
            revokeRole(ADMIN, user);
        } else {
            // requires editor
            require(owner == msg.sender, "DOES_NOT_HAVE_ADMIN_ROLE");
            if (aclType == 1) {
                revokeRole(EDITOR, user);
            }
        }
        return true;
    }

}
