# A secure messaging workflow specification

This document describes how to implement a DSL workflow using smart contracts for a secure messaging smart control protocol.

It contains building blocks that can be apply to other domains (DeFi, supply chain, flash loans, and others)


## Define states

After your discovery phase and business requirements, create the different states that will defined the workflow.

```javascript
const states =  wf.createsStates(['NONE', 'CREATED','ACCEPTED','CERTIFIED','REJECTED','COMPLETED');
```

## Define steps

```javascript
const steps = [
    {
        // Always starts with current at 0 NONE state
    },
      {
    // The user type  assigned to this step
      currentActor: wf.createActor('NOTARY'),

      // current index
      current: wf.getState('ACCEPTED'),

      //  next steps index
      next: [wf.getState('CERTIFIED'), wf.getState('REJECTED')],

      // mapping type
      mappingType: wf.dataMapping('UPDATE'),

      // validations
      statusValidations: [
        [wf.operator.OR, wf.getState('CREATED')],
      ],
      addressValidations: [
        [wf.operator.OR, wf.getState('recipient')],
      ],
      plugins: [
          wf.plugins.voteConfig({
              // ...
              // references a config similar to steps, requiring which
              // steps and validation
          }),
          wf.plugins.multisigConfig({
              // ...
              // references a config similar to steps, requiring which
              // steps and validation
          })
      ]
    },  
]
```

## Create WFStorage model

A WFStorage model contains the base model interaction with the workflow template.

Implement `onAddRow` to initialize a workflow and then define `onUpdate` which handles step updates to the workflow.

> Note: This contract spec still missing additional helpers for WFStorage

```
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./WStep.sol";
import "./WFStorage.sol";

contract TestDocumentModel is WFStorage {
    constructor() public {
    }
    

    function onAddRow(
        address to,
        address sender, 
        uint256 next,
        uint256 current,
        bytes[] memory fields
        ) public returns (bool) {

        // validate is optional

        for (uint j = 0; j < fields.length; ++j) {
            // table[row][col]
            table[rowCount][j] = fields[j];
        }


        table[rowCount][getByName("status")] = abi.encodePacked(stepsByInitState[next].current);
        table[rowCount][getByName("certifiedFilesIpfsJson")] = bytes('');
        table[rowCount][getByName("user")] = toBytes(sender);
        table[rowCount][getByName("recipient")] = toBytes(to);

        currentDocumentIndex = rowCount;
        rowCount = rowCount + 1;

    }

    function onUpdate(uint256 doc, 
        address to,
        address sender, 
        uint256 next,
        uint256 current,
        bytes[] memory fields
        ) public returns (bool) {

        validateAddress(current, doc, sender);

        validateStatus(current, doc);

        currentDocumentIndex = doc;

        table[doc][getByName("status")] = abi.encodePacked(stepsByInitState[next].current);
        // update
        for (uint j = 0; j < fields.length; ++j) {
            // table[row][col]
            table[doc][j] = fields[j];
        }
    }

}
```

## Create WF template

Create a WFStorage model and create a WTemplate using WFactory


### Solidity example
```solidity

// create model contract
TestDocumentModelContract model = TestDocumentModelContract(modelAddress);

// instantiate factory
WFactory factory = WFactory(factoryAddress);

// create workflow template
factoryContract.createWorkflowTemplate(
    'DocumentModel',
    modelAddress,
    wsteps,
    wstates
);
```


## Create table and WF

Once a WTemplate is created, a workflow can be initiated with:

- Actors
- Actors actions (steps that an actor initiates)
- Data storage table definition

> Note: This is a preliminar interface definition, subject to change

### Javascript example
```javascript
const template = await WTemplateContract.at(addr);
await template.createWF(
    wf.getActors(['USER','NOTARY']), // actors
    wf.getActorActions({
        USER: wf.getStates(['NONE', 'CERTIFIED']),    
        NOTARY: wf.getStates(['CREATED','ACCEPTED', 'REJECTED']),    
    }),
    [
        'firstname',
        'lastname',
        'phone',
        'email',
        'files',
        'certifiedFiles'
        // system props like status is added by smart contract
    ]
);
```

## Starting a workflow request

```javascript
    const payload = createPayload({
        files: JSON.stringify([{ path: '', content: '' }]),
        certifiedFiles: JSON.stringify([{ path: '', content: '' }]),
        email: '',
        description: 'Testing workflow',
        name: 'John',
        lastname: 'Lopez',
    });

    wf.executeStepFrom(template, {
        to: userAddr2,
        from: userAddr,
        step: wf.getState('CREATED'),
        actor: wf.getActor('USER'),
        payload,
    })
    
    // for steps that are no default (0 index), eg reject, set nextIndex

    // wf.executeStepFrom(template, {
    //     to: userAddr2,
    //     from: userAddr,
    //     step: wf.getState('REJECTED'),
    //     actor: wf.getActor('USER'),
    //     nextIndex: 1,
    //     payload,
    // });

    // same as
    // await template.executeStep(0, userAddr2, 0, 0, payload, {
    //     from: userAddr,
    // });

```


## Executing next sequence of steps

```javascript


    wf.executeStepFrom(template, {
        documentId,
        to: userAddr,
        from: userAddr2,
        step: wf.getState('CERTIFIED'),
        actor: wf.getActor('NOTARY'),
        payload: undefined,
    });

    // same as
        // let tx = await template.executeStep(
        //   0,
        //   userAddr,
        //   1,
        //   1,
        //   [],
        //   {
        //     from: userAddr2,
        //   }
        // );

```

## Reading from data storage

There 7 method calls that return tuples from data storage.

`getRowData1...getRowData7`

Where `getRowDataN(bytes32[] fields) returns (bytes n1, ..., bytes n7)` defines the fields to read.

## Events

There are two events emitted when `executeStep` is called.

`event LogWorkflowStepStart(address indexed sender, uint256 indexed current, uint256 indexed actorId)`

`event LogWorkflowStepCompleted(address indexed recipient, uint256 indexed next, uint256 indexed actorId, uint256  documentId)`


## Pending, other features

- Multi recipients
- Plugins

> Copyright 2020 , Rogelio Morrell C.