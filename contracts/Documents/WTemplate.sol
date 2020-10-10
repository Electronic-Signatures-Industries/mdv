pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


import "../RLPReader/RLPReader.sol";
import "../../node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../../node_modules/@openzeppelin/contracts/utils/EnumerableSet.sol";
import './IWModel.sol';
import "./WStep.sol";
import "./LibUserAccess.sol";
/*
WTemplate is created with
- An IWModel interface, contains the struct for message flow
- WStep items that handles transitions between states. A WStep contains most of the workflow
  logic incl. mapping logic, validations, and any approval API integration
- WState represents a state (eg Accepted, Rejected, ...)
- uint256[] are the different actors in the workflow and which actions they are allowed to execute
- 
*/
contract WTemplate is LibWStep, LibUserAccess, ReentrancyGuard {
    using RLPReader for RLPReader.RLPItem;
    using RLPReader for RLPReader.Iterator;
    using RLPReader for bytes;
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;

    address subowner;
    address delegatedOwner;
    // interface model
    IWModel model;
    uint256 public stepCount;
    mapping (uint256 => WStep) public steps;
    // find next workflow step
    mapping (uint256 => mapping (uint256 => uint256)) public findNext;

    constructor(address owner, address sub) public LibUserAccess(owner) {
        subowner =  sub;
    }

    function delegateTemplateOwner(address to, address modelContract) public returns (bool) {
        require(msg.sender == subowner, "INVALID_USER");
        delegatedOwner = to;
        model = IWModel(modelContract);
        return true;
    }
/*
  createWF generates the "decision tree" by using the WSteps and uint256[] 
*/
    function createWF(bytes memory rlpBytes) public nonReentrant returns (bool) {
        require(msg.sender == delegatedOwner, "INVALID_USER");


        RLPReader.RLPItem[] memory payload = rlpBytes.toRlpItem().toList();

        RLPReader.Iterator memory _steps = payload[0].iterator();
        RLPReader.Iterator memory _actorActions = payload[1].iterator();
                
        while (_steps.hasNext()) {
            RLPReader.RLPItem[] memory s = _steps.next().toList();
            uint256 currentActor = s[0].toUint();
            uint256 current = s[1].toUint();
            bytes memory recipients = s[5].toRlpBytes();
            bytes memory senders = s[6].toRlpBytes();
            bytes memory stepStates = s[7].toRlpBytes();
            steps[current] = WStep({
                currentActor: currentActor,
                current: current, // current
                next: s[2].toUint(), // next
                forkId: s[3].toUint(), // forkId
                mappingType: s[4].toUint(), // mappingType,
                recipientValidationsBytes: recipients,
                senderValidationsBytes: senders,
                statusChecksBytes: stepStates
            });

            model.createValidations(current, steps[current]);
    
            stepCount++;
        }
        require(stepCount < 40, "WF_STEP_LIMIT");

        while (_actorActions.hasNext()) {
            RLPReader.RLPItem[] memory linkStep = _actorActions.next().toList();
            findNext[linkStep[0].toUint()][linkStep[1].toUint()] = linkStep[2].toUint();
        }
        

        return true;
    }    


    /*
    * Runs next step sequence
    */
    function executeStep(address to, 
    uint256 step, uint256 actor, 
    uint256 docId, 
    uint256 extid, bytes calldata payload) external nonReentrant {
        emit LogWorkflowStepStart(msg.sender, step, steps[step].currentActor);

        require(users[msg.sender].expires  > now, "LICENSED_EXPIRED");
        require(users[to].expires  > now, "INVALID_RECIPIENT");
        require(0 != findNext[actor][step], "WF_TEMPLATE_INVALID_ACTOR_OR_STEP");
        
        uint256 next = findNext[actor][step];

        if (steps[step].mappingType == 2) {
            (, uint256 fork) = model.updateSwitch(docId, to, msg.sender, steps[step], steps[next], extid, payload);
            next = fork;
        } else {
             model.onAddRow(to, msg.sender, steps[step], steps[next], payload);
        }

        emit LogWorkflowStepCompleted(
            to,
            next,
            steps[next].currentActor,
            model.getCurrentModelIndex()
        );
    }
}
