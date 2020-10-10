pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


import "./WStep.sol";
import "./WFStorage.sol";
import './ExtensionEventRegistry.sol';
import './IExtension.sol';
import "../../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ReceiptModel is WFStorage, ExtensionEventRegistry, ReentrancyGuard {

    address owner;
    struct TestDocument {
        string fileIpfsJson;
        string certifiedFilesIpfsJson;
        string email;
        string description;
        string name;
        string lastname;
        uint256 amount;
        // system
        address user;
        address recipient;
        bytes32 status;
    }

    mapping (uint256 => TestDocument) public table;
    ExtensionEventRegistry private extReg;
    constructor(address r) public {
        owner = msg.sender;
        extReg = ExtensionEventRegistry(r);
    }
    
    function getStructAsTuple(bytes calldata data) external returns(string memory, string memory, string memory, string memory, 
        string memory, string memory, uint256) {
        return abi.decode(data, (string, string, string, string, string, string, uint256));
    }   

    function getStruct(bytes calldata data) external returns(TestDocument memory) {
    (string memory a, string memory b, string memory c, string memory d, 
        string memory e, string memory f, uint256 g) =  abi.decode(data, (string, string, string, string, string, string, uint256));
        return TestDocument(a, b, c, d, e, f, g, address(0), address(0), bytes32(0));
    }   
    function onAddRow(
        address to,
        address sender, 
        uint256 next,
        uint256 current,
        bytes memory fields
        ) public nonReentrant returns (bool) {

        currentDocumentIndex = rowCount;
        rowCount = rowCount + 1;
        
        table[rowCount-1] = this.getStruct(fields);
        table[rowCount-1].user = sender;
        table[rowCount-1].recipient = to;
        table[rowCount-1].status = keccak256(abi.encodePacked(stepsByInitState[next].current));

        return true;
    }

    function onUpdate(uint256 doc, 
        address to,
        address sender, 
        uint256 next,
        uint256 current,
        TestDocument memory document
        ) public returns (bool) {

        validateSender(current,  sender);
        validateRecipient(current, to);
        validateStatus(current, stepsByInitState[current].current);

        currentDocumentIndex = doc;


        table[doc].status = keccak256(abi.encodePacked(stepsByInitState[next].current));
        if (keccak256(abi.encodePacked(table[doc].certifiedFilesIpfsJson)) != keccak256(abi.encodePacked(""))) {
            table[doc].certifiedFilesIpfsJson = document.certifiedFilesIpfsJson;
        }

        return true;
    }

    function onExtensionUpdate(uint256 doc, 
        address to,
        address sender, 
        uint256 next,
        uint256 current, uint256 extensionEvtId,
        TestDocument memory document
        ) public nonReentrant returns (bool, uint256) {
        validateStatus(next, stepsByInitState[current].current);

        uint256 calculatedNextFork = stepsByInitState[current].forkId;
        IExtension ext = IExtension(extReg.read(extensionEvtId).extContract);
        if (ext.canExec(extReg.read(extensionEvtId).id, sender) && keccak256(bytes(extReg.read(extensionEvtId).name)) == keccak256(bytes("approvals"))) {        
            if (ext.executeExtension(extReg.read(extensionEvtId).id, sender, abi.encodePacked(document.amount))) {
                table[doc].status = keccak256(abi.encodePacked(stepsByInitState[current].next));
            } else {
                calculatedNextFork =  stepsByInitState[current].forkId;
                table[doc].status = keccak256(abi.encodePacked( stepsByInitState[current].forkId));
            }
            
        }

        currentDocumentIndex = doc;

        if (keccak256(abi.encodePacked(table[doc].certifiedFilesIpfsJson)) != keccak256(abi.encodePacked(""))) {
            table[doc].certifiedFilesIpfsJson = document.certifiedFilesIpfsJson;
        }

        return (true, calculatedNextFork);
    }

    function updateSwitch(uint256 doc, 
        address to,
        address sender, 
        uint256 next,
        uint256 current,
        uint256 extensionEvtId,
        bytes memory fields
        ) public returns (bool, uint256) {
         
        uint256 calculatedNextFork = next;
            if (extensionEvtId > 0) {
                (bool ok, uint256 fork) = this.onExtensionUpdate(doc, to, sender, next, current, extensionEvtId, this.getStruct(fields));
                calculatedNextFork = fork;
            } else {
                this.onUpdate(doc, to, sender, next, current, this.getStruct(fields));
            }
        return (true, calculatedNextFork);
    }
}
