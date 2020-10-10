pragma solidity ^0.6.0;


import "../../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import './LibDocument.sol';
import './LibUserAccess.sol';
import "./Approvals.sol";

contract Documents is LibDocument, AccessControl, LibIdentity {
    // using  for AccessControl.Role;

    bytes32 public constant RECIPIENT = keccak256("RECIPIENT");
    bytes32 public constant ADMIN = keccak256("ADMIN");

    // Emits when an document is created
    event LogAddDocument(uint256 indexed id, address indexed user, address indexed recipient, string ipfsFilesJson);
    event LogRecipientAccepted(uint256 indexed id, address indexed user, address indexed recipient);
    event LogRecipientCertified(uint256 indexed id, address indexed user, address indexed recipient);
    event LogServiceFeeSent(uint256 indexed id, address indexed user, address indexed recipient);
    event LogServiceFeeReceived(uint256 indexed id, address indexed user, address indexed recipient);
    event LogRecipientRejected(uint256 indexed id, address indexed user, address indexed recipient);
    event LogUserCanceled(uint256 indexed id, address indexed user, address indexed recipient);
    event LogDocumentsReleased(uint256 indexed id, address indexed user, address indexed recipient);
    event LogDocumentsReceived(uint256 indexed id, address indexed user, address indexed recipient);

    event LogLicenseEnabled(string apiKey);
    event LogLicenseRenewed(string apiKey);
    event LogIdentityAdded(address indexed id, uint256 indexed idType);
    event LogLicenseCreated(string key);

    address public owner;
    mapping (address=> Identity) public idUsers;    
    Identity[] public idUserArray;
    uint256 public userCount;

    uint256 public recipientCount;
    mapping (address => uint256) public recipientIndex;
    address[] public recipientArray;

    mapping (string => UserAccess) public licenses;

    // recipient documents
    mapping (address => mapping (uint256 => Document)) public recipientDocuments;
    mapping (address => uint256) public recipientDocumentCount;



    // approvals
    Approvals private approvals;
    mapping (bytes32 => bool) public completedApprovals;


    constructor(address approvalContract) public  {
        owner = msg.sender;
        approvals = Approvals(approvalContract);
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
    }

    function addACL(address user, uint8 aclType) public returns (bool) {
        if (aclType == 0) {
            // requires owner
            require(owner == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
            grantRole(ADMIN, user);
        } else {
            // requires admin
            require(hasRole(ADMIN, msg.sender), "DOES_NOT_HAVE_ADMIN_ROLE");
            if (aclType == 1) {
                grantRole(RECIPIENT, user);
                recipientArray.push(user);
                recipientIndex[user] = recipientCount;
                recipientCount++;
            }
        }
        return true;
    }

    function removeACL(address user, uint8 aclType) public returns (bool) {
        if (aclType == 0) {
            // requires owner
            require(owner == msg.sender, "DOES_NOT_HAVE_OWNER_ROLE");
            revokeRole(ADMIN, user);
        } else {
            // requires admin
            require(hasRole(ADMIN, msg.sender), "DOES_NOT_HAVE_ADMIN_ROLE");
            if (aclType == 1) {
                delete recipientArray[recipientIndex[user]];
                recipientIndex[user] = 0;
                recipientCount--;
                revokeRole(RECIPIENT, user);
            }
        }
        return true;
    }

    function createLicense(string memory key, uint256 expires, string memory description) public returns (string memory) {
        require(hasRole(ADMIN, msg.sender));
        licenses[key] = UserAccess({
            expires: expires,
            enabled: false,
            created: true,
            description: description,
            did: ''
        });

        emit LogLicenseCreated(key);
        return key;
    }

    // renew
    function renewLicense(address id, string memory key, uint256 expires) public {
        require(!licenses[key].enabled, "INVALID_LICENSE_KEY");
        require(licenses[key].created, "INVALID_LICENSE_KEY_2");

        // apply license key
        emit LogLicenseRenewed(key);

        idUsers[id].expires = expires;
        idUserArray[idUsers[id].index].expires = expires;
    }
    

    function addIdentity(address id, string memory publicKey, uint256 idType, string memory key) public {
        require(!licenses[key].enabled, "INVALID_LICENSE_KEY");
        require(licenses[key].created, "INVALID_LICENSE_KEY_2");

        // apply license key
        licenses[key].enabled = true;
        licenses[key].created = true;
        emit LogLicenseEnabled(key);

        idUsers[id] = Identity({
            id: id,
            idType: idType,
            publicKey: publicKey,
            registeredApiKey: key,
            removed: false,
            expires: licenses[key].expires,
            index: userCount
        });

        idUserArray.push(idUsers[id]);
        emit LogIdentityAdded(id, idType);

        userCount++;
    }


    function removeIdentity(address id) public {
        require(hasRole(ADMIN, msg.sender));

        Identity memory identity = idUsers[id];
        // disabled license
        licenses[identity.registeredApiKey].enabled = false;
        idUsers[id].removed = true;
        idUserArray[identity.index].removed = true;
    }


    function addDocument(
        address recipient,
        string memory fileIpfsJson, // ipfs url, optional
        string memory description,
        bytes32 email,
        bytes32 name,
        bytes32 lastName
        ) public returns (uint256)    {

        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(hasRole(RECIPIENT, recipient), "INVALID_RECIPIENT");

        recipientDocuments[recipient][recipientDocumentCount[recipient]] = Document({
         recipient: recipient,
         fileIpfsJson: fileIpfsJson, // ipfs url (optional)
         status: uint(DocumentStatus.CREATED),
         description: description,
         user: msg.sender,
         email: email,
         name: name,
         lastName: lastName,
         certifiedFilesIpfsJson: ''
        });
        
        // LogAddDocument
        emit LogAddDocument(
            recipientDocumentCount[recipient],
            msg.sender,
            recipient,
            fileIpfsJson
        );
        recipientDocumentCount[recipient] = recipientDocumentCount[recipient] + 1;

        return recipientDocumentCount[recipient] - 1;
    }



    function isAdmin(address admin) public view returns (bool) {
        require(hasRole(ADMIN, admin));

        return true;
    }


    function isRecipient(address recipient) public view returns (bool) {
        require(hasRole(RECIPIENT, recipient));

        return true;
    }

    function setDocumentAccepted(uint256 id) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(hasRole(RECIPIENT, msg.sender), "DOES_NOT_HAVE_RECIPIENT_ROLE");

        require(
            recipientDocuments[msg.sender][id].status == uint(DocumentStatus.CREATED)
            ,"DOCUMENT_NOT_FOUND");

        // Update status
        recipientDocuments[msg.sender][id].status = uint(DocumentStatus.RECIPIENT_ACCEPTED);

        emit LogRecipientAccepted(
            id,
            recipientDocuments[msg.sender][id].user,
            msg.sender
        );

        return true;
    }

    function setDocumentRejected(uint256 id) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(hasRole(RECIPIENT, msg.sender), "DOES_NOT_HAVE_RECIPIENT_ROLE");

        require(
            recipientDocuments[msg.sender][id].status == uint(DocumentStatus.CREATED) ||
            recipientDocuments[msg.sender][id].status == uint(DocumentStatus.RECIPIENT_ACCEPTED)
            ,"DOCUMENT_NOT_CREATED_OR_ACCEPTED");

        // Update status
        recipientDocuments[msg.sender][id].status = uint(DocumentStatus.REJECTED);

        emit LogRecipientRejected(
            id,
            recipientDocuments[msg.sender][id].user,
            msg.sender
        );

        return true;
    }

    function setDocumentCertified(uint256 id) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(hasRole(RECIPIENT, msg.sender), "DOES_NOT_HAVE_RECIPIENT_ROLE");

        require(
            recipientDocuments[msg.sender][id].status == uint(DocumentStatus.RECIPIENT_ACCEPTED)
            ,"DOCUMENT_NOT_ACCEPTED");

        // Update status
        recipientDocuments[msg.sender][id].status = uint(DocumentStatus.RECIPIENT_CERTIFIED);

        emit LogRecipientCertified(
            id,
            recipientDocuments[msg.sender][id].user,
            msg.sender
        );

        return true;
    }

    function setServiceFeeSent(uint256 id, address recipient) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");

        require(
            recipientDocuments[recipient][id].status == uint(DocumentStatus.RECIPIENT_CERTIFIED)
            ,"DOCUMENT_NOT_CERTIFIED");

        // Update status
        recipientDocuments[recipient][id].status = uint(DocumentStatus.SERVICE_FEE_SENT);

        emit LogServiceFeeSent(
            id,
            msg.sender,
            recipient
        );

        return true;
    }


    function setUserCanceled(uint256 id, address recipient) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");

        require(
            recipientDocuments[recipient][id].status == uint(DocumentStatus.CREATED)
            || recipientDocuments[recipient][id].status == uint(DocumentStatus.REJECTED)
            ,"DOCUMENT_NOT_CREATED_OR_REJECTED");

        // Update status
        recipientDocuments[recipient][id].status = uint(DocumentStatus.CANCELED);

        emit LogServiceFeeSent(
            id,
            msg.sender,
            recipient
        );

        return true;
    }

    function setServiceFeeReceived(uint256 id) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(hasRole(RECIPIENT, msg.sender), "DOES_NOT_HAVE_RECIPIENT_ROLE");

        require(
            recipientDocuments[msg.sender][id].status == uint(DocumentStatus.SERVICE_FEE_SENT)
            ,"SERVICE_FEE_NOT_SENT");

        // Update status
        recipientDocuments[msg.sender][id].status = uint(DocumentStatus.SERVICE_FEE_RECEIVED);

        emit LogServiceFeeReceived(
            id,
            recipientDocuments[msg.sender][id].user,
            msg.sender
        );

        return true;
    }

    function setDocumentsReceived(uint256 id, address recipient) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");

        require(
            recipientDocuments[recipient][id].status == uint(DocumentStatus.DOCUMENTS_RELEASED)
            ,"DOCUMENT_NOT_RELEASED");

        // Update status
        recipientDocuments[recipient][id].status = uint(DocumentStatus.DOCUMENTS_RECEIVED);

        emit LogDocumentsReceived(
            id,
            msg.sender,
            recipient
        );

        return true;
    }

    function addCertifiedDocuments(uint256 id, string memory certifiedDocsIpfsJson) public returns (bool)    {
        require(idUsers[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(hasRole(RECIPIENT, msg.sender), "DOES_NOT_HAVE_RECIPIENT_ROLE");

        require(
            recipientDocuments[msg.sender][id].status == uint(DocumentStatus.SERVICE_FEE_RECEIVED)
            ,"SERVICE_FEE_NOT_RECEIVED");

        // Update status
        recipientDocuments[msg.sender][id].certifiedFilesIpfsJson = certifiedDocsIpfsJson;
        recipientDocuments[msg.sender][id].status = uint(DocumentStatus.DOCUMENTS_RELEASED);

        emit LogDocumentsReleased(
            id,
            recipientDocuments[msg.sender][id].user,
            msg.sender
        );

        return true;
    }
}
