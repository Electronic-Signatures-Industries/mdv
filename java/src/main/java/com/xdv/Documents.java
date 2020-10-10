package com.xdv;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple12;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.5.14.
 */
@SuppressWarnings("rawtypes")
public class Documents extends Contract {
    public static final String BINARY = "608060405234801561001057600080fd5b50600480546001600160a01b03191633179055611320806100326000396000f3fe608060405234801561001057600080fd5b50600436106100ce5760003560e01c80638da5cb5b1161008c578063e276e33e11610066578063e276e33e14610371578063e736b79114610394578063ee4e19a1146104f0578063fe8e980b14610516576100ce565b80638da5cb5b14610304578063a5b16b2e14610328578063d1e5dbc214610342576100ce565b80626c7f87146100d35780630be1a76b1461010a57806324d7806c146101305780632b2805db1461015657806342389221146102bb57806346336542146102de575b600080fd5b6100f6600480360360408110156100e957600080fd5b5080359060200135610545565b604080519115158252519081900360200190f35b6100f66004803603602081101561012057600080fd5b50356001600160a01b03166106dc565b6100f66004803603602081101561014657600080fd5b50356001600160a01b0316610700565b6101736004803603602081101561016c57600080fd5b5035610713565b604051808d6001600160a01b03166001600160a01b031681526020018c6001600160a01b03166001600160a01b03168152602001806020018b81526020018a81526020018981526020018881526020018781526020018681526020018581526020018060200184815260200183810383528d818151815260200191508051906020019080838360005b838110156102145781810151838201526020016101fc565b50505050905090810190601f1680156102415780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b8381101561027457818101518382015260200161025c565b50505050905090810190601f1680156102a15780820380516001836020036101000a031916815260200191505b509e50505050505050505050505050505060405180910390f35b6100f6600480360360408110156102d157600080fd5b508035906020013561089b565b6100f6600480360360208110156102f457600080fd5b50356001600160a01b03166109e0565b61030c6109f3565b604080516001600160a01b039092168252519081900360200190f35b610330610a02565b60408051918252519081900360200190f35b6100f66004803603604081101561035857600080fd5b5080356001600160a01b0316906020013560ff16610a08565b6100f66004803603604081101561038757600080fd5b5080359060200135610b3f565b6100f660048036036101008110156103ab57600080fd5b8135916001600160a01b036020820135811692604083013590911691908101906080810160608201356401000000008111156103e657600080fd5b8201836020820111156103f857600080fd5b8035906020019184600183028401116401000000008311171561041a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929584359560208601359591945092506060810191506040013564010000000081111561047957600080fd5b82018360208201111561048b57600080fd5b803590602001918460018302840111640100000000831117156104ad57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505091359250610c78915050565b6100f66004803603602081101561050657600080fd5b50356001600160a01b0316610f83565b6100f66004803603604081101561052c57600080fd5b5080356001600160a01b0316906020013560ff16610f95565b6000610557813363ffffffff6110be16565b6105a8576040805162461bcd60e51b815260206004820152601960248201527f444f45535f4e4f545f484156455f444542544f525f524f4c4500000000000000604482015290519081900360640190fd5b6000838152600560205260409020600101546001600160a01b03163314610607576040805162461bcd60e51b815260206004820152600e60248201526d24a72b20a624a22fa222a12a27a960911b604482015290519081900360640190fd5b600160008481526005602081905260409091200154148061063a5750600360008481526005602081905260409091200154145b61067f576040805162461bcd60e51b815260206004820152601160248201527012539593d250d157d393d517d193d55391607a1b604482015290519081900360640190fd5b600083815260056020818152604092839020600381018690556002920191909155815133808252925186927fce3d8c3566d9aabb6a62de69e96abdca65d29929536e581fac2ab1294bf8b7ac928290030190a25060019392505050565b60006106ef60028363ffffffff6110be16565b6106f857600080fd5b506001919050565b60006106ef60038363ffffffff6110be16565b60056020908152600091825260409182902080546001808301546002808501805488516101009582161595909502600019011691909104601f81018790048702840187019097528683526001600160a01b03938416969390911694919290918301828280156107c35780601f10610798576101008083540402835291602001916107c3565b820191906000526020600020905b8154815290600101906020018083116107a657829003601f168201915b50505050509080600301549080600401549080600501549080600601549080600701549080600801549080600901549080600a018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561088b5780601f106108605761010080835404028352916020019161088b565b820191906000526020600020905b81548152906001019060200180831161086e57829003601f168201915b50505050509080600b015490508c565b60006108ae60033363ffffffff6110be16565b6108fa576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f41444d494e5f524f4c4560401b604482015290519081900360640190fd5b60036000848152600560208190526040909120015414610961576040805162461bcd60e51b815260206004820152601e60248201527f494e564f4943455f4e4f545f4345525449464945445f42595f54525553540000604482015290519081900360640190fd5b6000838152600560205260409020600801541561097d57600080fd5b600083815260056020818152604092839020600b81018690556002600882015560049201919091558151848152915185927f3dc78cf76d2bf29c29bfbd67e530fbd6d5389d716da39988ec97719df5cedda692908290030190a250600192915050565b60006106ef60018363ffffffff6110be16565b6004546001600160a01b031681565b60065481565b600060ff8216610a82576004546001600160a01b03163314610a6c576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f4f574e45525f524f4c4560401b604482015290519081900360640190fd5b610a7d60038463ffffffff61112516565b610b36565b610a9360033363ffffffff6110be16565b610adf576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f41444d494e5f524f4c4560401b604482015290519081900360640190fd5b8160ff1660011415610afc57610afc60018463ffffffff61112516565b8160ff1660021415610b1957610b1960008463ffffffff61112516565b8160ff1660031415610b3657610b3660028463ffffffff61112516565b50600192915050565b6000610b5260023363ffffffff6110be16565b610ba3576040805162461bcd60e51b815260206004820152601c60248201527f444f45535f4e4f545f484156455f435553544f4449414e5f524f4c4500000000604482015290519081900360640190fd5b6001600084815260056020819052604090912001541480610bd65750600260008481526005602081905260409091200154145b610c1b576040805162461bcd60e51b815260206004820152601160248201527012539593d250d157d393d517d193d55391607a1b604482015290519081900360640190fd5b600083815260056020818152604092839020600981018690556003920191909155815133808252925186927f446f273c0fc0c27d1dadaefd6c66e5041c8fb55cc617ee79b7cc76a46d89be51928290030190a25060019392505050565b60008815801590610c99575060008981526005602081905260409091200154155b610cdb576040805162461bcd60e51b815260206004820152600e60248201526d414c52454144595f45584953545360901b604482015290519081900360640190fd5b610cec60018963ffffffff6110be16565b610d3d576040805162461bcd60e51b815260206004820152601b60248201527f444f45535f4e4f545f484156455f535550504c4945525f524f4c450000000000604482015290519081900360640190fd5b610d4e60008863ffffffff6110be16565b610d92576040805162461bcd60e51b815260206004820152601060248201526f1111509513d497d393d517d193d5539160821b604482015290519081900360640190fd5b60408051610180810182526001600160a01b03808b16825289166020820152908101879052600060608201526080810183905260a081016001815260208101869052604081018790526060016000815260006020808301829052604080840188905260609093018290528c82526005815290829020835181546001600160a01b039182166001600160a01b031991821617835585840151600184018054919093169116179055918301518051610e4e926002850192019061120d565b50606082015160038201556080820151600482015560a0820151600582015560c0820151600682015560e08201516007820155610100820151600882015561012082015160098201556101408201518051610eb391600a84019160209091019061120d565b506101609190910151600b9091015560068054600101905560408051602080825288518183015288516001600160a01b03808c1694908d16938e937f246528f6fdc8a94ad86676d3f598f9bf2202aedf19e9ab6d2c61666d1105e8ad938d938392908301919085019080838360005b83811015610f3a578181015183820152602001610f22565b50505050905090810190601f168015610f675780820380516001836020036101000a031916815260200191505b509250505060405180910390a450600198975050505050505050565b60006106ef818363ffffffff6110be16565b600060ff821661100a576004546001600160a01b03163314610ff9576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f4f574e45525f524f4c4560401b604482015290519081900360640190fd5b610a7d60038463ffffffff61118c16565b61101b60033363ffffffff6110be16565b611067576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f41444d494e5f524f4c4560401b604482015290519081900360640190fd5b8160ff16600114156110845761108460018463ffffffff61118c16565b8160ff16600214156110a1576110a160008463ffffffff61118c16565b8160ff1660031415610b3657610b3660028463ffffffff61118c16565b60006001600160a01b0382166111055760405162461bcd60e51b81526004018080602001828103825260228152602001806112ca6022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b61112f82826110be565b61116a5760405162461bcd60e51b81526004018080602001828103825260218152602001806112a96021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff19169055565b61119682826110be565b156111e8576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061124e57805160ff191683800117855561127b565b8280016001018555821561127b579182015b8281111561127b578251825591602001919060010190611260565b5061128792915061128b565b5090565b6112a591905b808211156112875760008155600101611291565b9056fe526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373a265627a7a7231582054ac96faa67b6bc8bcf52edb4e8d6dee0e37941410841eab5cdffdb7db2933e064736f6c63430005100032";

    public static final String FUNC_ADDACL = "addACL";

    public static final String FUNC_ADDDOCUMENT = "addDocument";

    public static final String FUNC_CERTIFYDEBTOR = "certifyDebtor";

    public static final String FUNC_CERTIFYTRUST = "certifyTrust";

    public static final String FUNC_DOCUMENTCOUNT = "documentCount";

    public static final String FUNC_DOCUMENTS = "documents";

    public static final String FUNC_ISADMIN = "isAdmin";

    public static final String FUNC_ISDEBTOR = "isDebtor";

    public static final String FUNC_ISSUPPLIER = "isSupplier";

    public static final String FUNC_ISTRUST = "isTrust";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_REGISTERORDER = "registerOrder";

    public static final String FUNC_REMOVEACL = "removeACL";

    public static final Event LOGADDDOCUMENT_EVENT = new Event("LogAddDocument", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event LOGCERTIFIEDBYDEBTOR_EVENT = new Event("LogCertifiedByDebtor", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Address>() {}));
    ;

    public static final Event LOGCERTIFIEDBYTRUST_EVENT = new Event("LogCertifiedByTrust", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Address>() {}));
    ;

    public static final Event LOGREGISTERORDER_EVENT = new Event("LogRegisterOrder", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Bytes32>() {}));
    ;

    @Deprecated
    protected Documents(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Documents(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Documents(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Documents(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<LogAddDocumentEventResponse> getLogAddDocumentEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(LOGADDDOCUMENT_EVENT, transactionReceipt);
        ArrayList<LogAddDocumentEventResponse> responses = new ArrayList<LogAddDocumentEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            LogAddDocumentEventResponse typedResponse = new LogAddDocumentEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.supplier = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.debtor = (String) eventValues.getIndexedValues().get(2).getValue();
            typedResponse.ipfsFilesJson = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<LogAddDocumentEventResponse> logAddDocumentEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, LogAddDocumentEventResponse>() {
            @Override
            public LogAddDocumentEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(LOGADDDOCUMENT_EVENT, log);
                LogAddDocumentEventResponse typedResponse = new LogAddDocumentEventResponse();
                typedResponse.log = log;
                typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.supplier = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.debtor = (String) eventValues.getIndexedValues().get(2).getValue();
                typedResponse.ipfsFilesJson = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<LogAddDocumentEventResponse> logAddDocumentEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(LOGADDDOCUMENT_EVENT));
        return logAddDocumentEventFlowable(filter);
    }

    public List<LogCertifiedByDebtorEventResponse> getLogCertifiedByDebtorEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(LOGCERTIFIEDBYDEBTOR_EVENT, transactionReceipt);
        ArrayList<LogCertifiedByDebtorEventResponse> responses = new ArrayList<LogCertifiedByDebtorEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            LogCertifiedByDebtorEventResponse typedResponse = new LogCertifiedByDebtorEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.debtor = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<LogCertifiedByDebtorEventResponse> logCertifiedByDebtorEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, LogCertifiedByDebtorEventResponse>() {
            @Override
            public LogCertifiedByDebtorEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(LOGCERTIFIEDBYDEBTOR_EVENT, log);
                LogCertifiedByDebtorEventResponse typedResponse = new LogCertifiedByDebtorEventResponse();
                typedResponse.log = log;
                typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.debtor = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<LogCertifiedByDebtorEventResponse> logCertifiedByDebtorEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(LOGCERTIFIEDBYDEBTOR_EVENT));
        return logCertifiedByDebtorEventFlowable(filter);
    }

    public List<LogCertifiedByTrustEventResponse> getLogCertifiedByTrustEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(LOGCERTIFIEDBYTRUST_EVENT, transactionReceipt);
        ArrayList<LogCertifiedByTrustEventResponse> responses = new ArrayList<LogCertifiedByTrustEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            LogCertifiedByTrustEventResponse typedResponse = new LogCertifiedByTrustEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.custodian = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<LogCertifiedByTrustEventResponse> logCertifiedByTrustEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, LogCertifiedByTrustEventResponse>() {
            @Override
            public LogCertifiedByTrustEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(LOGCERTIFIEDBYTRUST_EVENT, log);
                LogCertifiedByTrustEventResponse typedResponse = new LogCertifiedByTrustEventResponse();
                typedResponse.log = log;
                typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.custodian = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<LogCertifiedByTrustEventResponse> logCertifiedByTrustEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(LOGCERTIFIEDBYTRUST_EVENT));
        return logCertifiedByTrustEventFlowable(filter);
    }

    public List<LogRegisterOrderEventResponse> getLogRegisterOrderEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(LOGREGISTERORDER_EVENT, transactionReceipt);
        ArrayList<LogRegisterOrderEventResponse> responses = new ArrayList<LogRegisterOrderEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            LogRegisterOrderEventResponse typedResponse = new LogRegisterOrderEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.investor = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<LogRegisterOrderEventResponse> logRegisterOrderEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, LogRegisterOrderEventResponse>() {
            @Override
            public LogRegisterOrderEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(LOGREGISTERORDER_EVENT, log);
                LogRegisterOrderEventResponse typedResponse = new LogRegisterOrderEventResponse();
                typedResponse.log = log;
                typedResponse.id = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.investor = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<LogRegisterOrderEventResponse> logRegisterOrderEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(LOGREGISTERORDER_EVENT));
        return logRegisterOrderEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> addACL(String user, BigInteger aclType) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDACL, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, user), 
                new org.web3j.abi.datatypes.generated.Uint8(aclType)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addDocument(byte[] id, String supplier, String debtor, String fileIpfsJson, BigInteger fechaEmision, byte[] externalId, String signature, BigInteger fechaExpiracion) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDDOCUMENT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(id), 
                new org.web3j.abi.datatypes.Address(160, supplier), 
                new org.web3j.abi.datatypes.Address(160, debtor), 
                new org.web3j.abi.datatypes.Utf8String(fileIpfsJson), 
                new org.web3j.abi.datatypes.generated.Uint256(fechaEmision), 
                new org.web3j.abi.datatypes.generated.Bytes32(externalId), 
                new org.web3j.abi.datatypes.Utf8String(signature), 
                new org.web3j.abi.datatypes.generated.Uint256(fechaExpiracion)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> certifyDebtor(byte[] id, BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CERTIFYDEBTOR, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(id), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> certifyTrust(byte[] id, byte[] trust) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CERTIFYTRUST, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(id), 
                new org.web3j.abi.datatypes.generated.Bytes32(trust)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> documentCount() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_DOCUMENTCOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple12<String, String, String, BigInteger, BigInteger, BigInteger, byte[], BigInteger, BigInteger, byte[], String, byte[]>> documents(byte[] param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_DOCUMENTS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Bytes32>() {}));
        return new RemoteFunctionCall<Tuple12<String, String, String, BigInteger, BigInteger, BigInteger, byte[], BigInteger, BigInteger, byte[], String, byte[]>>(function,
                new Callable<Tuple12<String, String, String, BigInteger, BigInteger, BigInteger, byte[], BigInteger, BigInteger, byte[], String, byte[]>>() {
                    @Override
                    public Tuple12<String, String, String, BigInteger, BigInteger, BigInteger, byte[], BigInteger, BigInteger, byte[], String, byte[]> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple12<String, String, String, BigInteger, BigInteger, BigInteger, byte[], BigInteger, BigInteger, byte[], String, byte[]>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue(), 
                                (BigInteger) results.get(5).getValue(), 
                                (byte[]) results.get(6).getValue(), 
                                (BigInteger) results.get(7).getValue(), 
                                (BigInteger) results.get(8).getValue(), 
                                (byte[]) results.get(9).getValue(), 
                                (String) results.get(10).getValue(), 
                                (byte[]) results.get(11).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Boolean> isAdmin(String admin) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISADMIN, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, admin)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> isDebtor(String debtor) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISDEBTOR, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, debtor)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> isSupplier(String supplier) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISSUPPLIER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, supplier)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> isTrust(String trust) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISTRUST, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, trust)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<String> owner() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> registerOrder(byte[] id, byte[] investor) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_REGISTERORDER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes32(id), 
                new org.web3j.abi.datatypes.generated.Bytes32(investor)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> removeACL(String user, BigInteger aclType) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_REMOVEACL, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, user), 
                new org.web3j.abi.datatypes.generated.Uint8(aclType)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Documents load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Documents(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Documents load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Documents(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Documents load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Documents(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Documents load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Documents(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Documents> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Documents.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    public static RemoteCall<Documents> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Documents.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Documents> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Documents.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Documents> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Documents.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class LogAddDocumentEventResponse extends BaseEventResponse {
        public byte[] id;

        public String supplier;

        public String debtor;

        public String ipfsFilesJson;
    }

    public static class LogCertifiedByDebtorEventResponse extends BaseEventResponse {
        public byte[] id;

        public String debtor;
    }

    public static class LogCertifiedByTrustEventResponse extends BaseEventResponse {
        public byte[] id;

        public String custodian;
    }

    public static class LogRegisterOrderEventResponse extends BaseEventResponse {
        public byte[] id;

        public byte[] investor;
    }
}
