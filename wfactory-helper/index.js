const Web3 = require('web3');
const web3 = new Web3();
const BigNumber = require('bignumber.js');
const ethers = require('ethers');
const rlp = require('rlp');
const ethereumjsutil = require('ethereumjs-util');
const { toUtf8Bytes } = ethers.utils;

module.exports = class WFactoryHelper {
  constructor() {
    this._actors = [];
    this._states = [];
    this._registry = '';
    this._steps = [];
    return this;
  }

  createRlpDocumentPayload({
    wfDocumentModelFn,
    files,
    stepInfo
  }) {
    // DocumentPayload
    //     [
    //      DocumentModel,
    //      DocumentInfo,
    // ]
   const payload = [
       wfDocumentModelFn(),
       files
    ];
    return ethers.utils.arrayify(rlp.encode(payload));
  }

  toStepInfo({ user, recipient, status }) {
    /*
    * user: address, recipient: address, status: uint
    */
    let rlpContent = [];
    rlpContent = [
      user || '',
      recipient || '',
      status || '',
    ];
    return rlpContent;
  }

  createWFPayload(steps, actorActions) {
    // WStep[]
    //     [
    //      uint256,
    //      uint256,
    //      uint256,
    //      uint256,
    //      uint256,
    //      address[],
    //      address[],
    //      uint256[],
    // ]

   const rlpSteps = steps.map( step => {
     return [
       step.currentActor,
       step.current,
       step.next,
       step.forkId,
       step.mappingType,
       [...step.recipientValidations],
       [...step.senderValidations],
       [...step.stepValidations],
     ]
   });
    // LinkStep[]
    // [
    //  [uint256, uint256, uint256 ]
    // ]
    const rlpLinkStep = actorActions.map(a => {
      return [...a];
    });

    // createWF payload
    // [[], []]
    const payload = [rlpSteps, rlpLinkStep];
    return ethers.utils.arrayify(rlp.encode(payload));
  }

  createStates(states) {
    this._states = states.map((s) => {
      return ethers.utils.formatBytes32String(s);
    });
  }

  getState(state) {
    return this._states.findIndex(
      (s) => ethers.utils.formatBytes32String(state) === s
    );
  }

  getStates() {
    return this._states;
  }

  getSteps() {
    return this._steps;
  }

  createActors(actors) {
    this._actors = actors.map((a) => {
      return ethers.utils.formatBytes32String(a);
    });
  }

  getActor(actor) {
    return this._actors.findIndex(
      (a) => ethers.utils.formatBytes32String(actor) === a
    );
  }

  getActors() {
    return this._actors;
  }

  // { 'created'} or
  // ['created', 'recipient'] and
  createValidations(validations) {
    let items;

    if (Array.isArray(validations)) {
      items = validations.map((v) => {
        return [
          ethers.utils.formatBytes32String('and'),
          ethers.utils.formatBytes32String(v),
        ];
      });
    } else {
      items = Object.keys(validations).map((k) => {
        const value = validations[k];
        return [
          ethers.utils.formatBytes32String('or'),
          ethers.utils.formatBytes32String(k),
        ];
      });
    }

    return items;
  }

  // { actor: [action, ...]}
  linkSteps(stepFlow) {
    let items;

    items = Object.keys(stepFlow).map((k) => {
      const value = stepFlow[k];
      return value.map((i) => {
        return this.getState(i);
      });
    });
    return items;
  }

  tightLinkSteps(flow) {
    return flow.map((i) => {
      return ethers.utils.defaultAbiCoder.encode(
        ['uint256', 'uint256', 'uint256'],
        [...i]
      );
    });
  }

  createStep(step) {
    const {
      currentActor,
      current,
      next,
      forkId,
      mappingType,
      recipientValidations,
      senderValidations,
      stepValidations,
    } = step;
    if (!currentActor && typeof currentActor !== 'number') {
      throw new Error('Missing actor  or type mismatch');
    }
    if (!current && typeof current !== 'number') {
      throw new Error('Missing current  or type mismatch');
    }
    if (!next && typeof next !== 'number') {
      throw new Error('Missing next or type mismatch');
    }
    if (!mappingType && typeof mappingType !== 'number') {
      throw new Error('Missing mappingType  or type mismatch');
    }
    const a = {
      currentActor,
      current,
      next,
      mappingType,
      forkId: forkId || 0,
      stepValidations: stepValidations || [],
      senderValidations: senderValidations || [],
      recipientValidations: recipientValidations || [],
    };

    this._steps.push(a);
  }

  createPayload(obj) {
    const types = [];
    const values = [];
    const keys = Object.keys(obj);
    const arr = keys.map((k) => {
      if (typeof obj[k] === 'string') {
        types.push('string');
        values.push(obj[k]);
      }
      if (typeof obj[k] === 'number') {
        types.push('uint256');
        values.push(obj[k]);
      }
    });
    return ethers.utils.defaultAbiCoder.encode(types, values);
  }

  executeStep(template, options) {
    return template.executeStep(
      options.to,
      options.step,
      options.actor,
      options.documentId || 0,
      options.extensionId || 0,
      options.payload || [],
      {
        from: options.from,
      }
    );
  }
};
