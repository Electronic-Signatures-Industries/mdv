pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "../../node_modules/@openzeppelin/contracts/cryptography/ECDSA.sol";


/*
WTemplate is created with
- An IWModel interface, contains the struct for message flow
- WStep items that handles transitions between states. A WStep contains most of the workflow
  logic incl. mapping logic, validations, and any approval API integration
- WState represents a state (eg Accepted, Rejected, ...)
- uint256[] are the different actors in the workflow and which actions they are allowed to execute
- 
*/
contract WMessageRouter {
    using ECDSA for bytes32;

    event LogEnterSignedRouter(
        bytes32 indexed fromIpfsPeer,
        address sender,
        bytes32 indexed toIpfsPeer,
        address indexed recipient
    );
    event LogEndSignedRouter(
        bytes32 indexed fromIpfsPeer,
        address sender,
        bytes32 indexed toIpfsPeer,
        address indexed recipient,
        bytes32 cid
    );

    event LogEnterSignedRouterExtension(
        uint256 extension,
        bytes32 indexed fromIpfsPeer,
        address sender,
        bytes32 indexed toIpfsPeer,
        address indexed recipient,
        bytes32 cid
    );
    event LogEndSignedRouterExtension(
        bytes32 indexed fromIpfsPeer,
        address sender,
        bytes32 indexed toIpfsPeer,
        address indexed recipient,
        bytes32 cid
    );

    function certifyTrustedExtensionExecution(
        bytes32 fromIpfsPeer,
        bytes32 toIpfsPeer,
        address to,
        bytes32 cid,
        uint256 extension,
        bytes32 hash,
        bytes memory signature
    ) public {
        // TODO:Use BLS
        emit LogEndSignedRouterExtension(
            fromIpfsPeer,
            msg.sender,
            toIpfsPeer,
            to,
            cid
        );
    }

    function routeSignedMessage(
        bytes32 fromIpfsPeer,
        bytes32 toIpfsPeer,
        address to,
        bytes32 cid,
        uint256 extension,
        bytes32 docId,
        bytes32 hash,
        bytes memory signature
    ) public {
        emit LogEnterSignedRouter(fromIpfsPeer, msg.sender, toIpfsPeer, to);

        if (extension > 0) {
            emit LogEnterSignedRouterExtension(
                extension,
                fromIpfsPeer,
                msg.sender,
                toIpfsPeer,
                to,
                cid
            );
        } else {
            //  ecrecover
            bool hasSignedDocument = hash
                .toEthSignedMessageHash()
                .recover(signature) == msg.sender;

            require(
                hasSignedDocument,
                "DOCUMENT HAS NOT BEEN SIGNED BY SENDER"
            );
            emit LogEndSignedRouter(
                fromIpfsPeer,
                msg.sender,
                toIpfsPeer,
                to,
                cid
            );
        }
    }
}
