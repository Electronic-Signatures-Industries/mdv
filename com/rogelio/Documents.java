package com.rogelio;

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
    public static final String BINARY = "608060405234801561001057600080fd5b50600480546001600160a01b031916331790556110fc806100326000396000f3fe608060405234801561001057600080fd5b50600436106100b35760003560e01c80638da5cb5b116100715780638da5cb5b146102e9578063a5b16b2e1461030d578063e276e33e14610327578063e736b7911461034a578063ee4e19a1146104a6578063fe8e980b146104cc576100b3565b80626c7f87146100b85780630be1a76b146100ef57806324d7806c146101155780632b2805db1461013b57806342389221146102a057806346336542146102c3575b600080fd5b6100db600480360360408110156100ce57600080fd5b50803590602001356104fb565b604080519115158252519081900360200190f35b6100db6004803603602081101561010557600080fd5b50356001600160a01b0316610675565b6100db6004803603602081101561012b57600080fd5b50356001600160a01b0316610699565b6101586004803603602081101561015157600080fd5b50356106ac565b604051808d6001600160a01b03166001600160a01b031681526020018c6001600160a01b03166001600160a01b03168152602001806020018b81526020018a81526020018981526020018881526020018781526020018681526020018581526020018060200184815260200183810383528d818151815260200191508051906020019080838360005b838110156101f95781810151838201526020016101e1565b50505050905090810190601f1680156102265780820380516001836020036101000a031916815260200191505b50838103825285518152855160209182019187019080838360005b83811015610259578181015183820152602001610241565b50505050905090810190601f1680156102865780820380516001836020036101000a031916815260200191505b509e50505050505050505050505050505060405180910390f35b6100db600480360360408110156102b657600080fd5b5080359060200135610834565b6100db600480360360208110156102d957600080fd5b50356001600160a01b0316610979565b6102f161098c565b604080516001600160a01b039092168252519081900360200190f35b61031561099b565b60408051918252519081900360200190f35b6100db6004803603604081101561033d57600080fd5b50803590602001356109a1565b6100db600480360361010081101561036157600080fd5b8135916001600160a01b0360208201358116926040830135909116919081019060808101606082013564010000000081111561039c57600080fd5b8201836020820111156103ae57600080fd5b803590602001918460018302840111640100000000831117156103d057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929584359560208601359591945092506060810191506040013564010000000081111561042f57600080fd5b82018360208201111561044157600080fd5b8035906020019184600183028401116401000000008311171561046357600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295505091359250610ac9915050565b6100db600480360360208110156104bc57600080fd5b50356001600160a01b0316610dd4565b6100db600480360360408110156104e257600080fd5b5080356001600160a01b0316906020013560ff16610de6565b600061050d813363ffffffff610f2216565b61055e576040805162461bcd60e51b815260206004820152601960248201527f444f45535f4e4f545f484156455f444542544f525f524f4c4500000000000000604482015290519081900360640190fd5b6000838152600560205260409020600101546001600160a01b031633146105bd576040805162461bcd60e51b815260206004820152600e60248201526d24a72b20a624a22fa222a12a27a960911b604482015290519081900360640190fd5b60016000848152600560208190526040909120015414610618576040805162461bcd60e51b815260206004820152601160248201527012539593d250d157d393d517d193d55391607a1b604482015290519081900360640190fd5b600083815260056020818152604092839020600381018690556002920191909155815133808252925186927fce3d8c3566d9aabb6a62de69e96abdca65d29929536e581fac2ab1294bf8b7ac928290030190a25060019392505050565b600061068860028363ffffffff610f2216565b61069157600080fd5b506001919050565b600061068860038363ffffffff610f2216565b60056020908152600091825260409182902080546001808301546002808501805488516101009582161595909502600019011691909104601f81018790048702840187019097528683526001600160a01b039384169693909116949192909183018282801561075c5780601f106107315761010080835404028352916020019161075c565b820191906000526020600020905b81548152906001019060200180831161073f57829003601f168201915b50505050509080600301549080600401549080600501549080600601549080600701549080600801549080600901549080600a018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108245780601f106107f957610100808354040283529160200191610824565b820191906000526020600020905b81548152906001019060200180831161080757829003601f168201915b50505050509080600b015490508c565b600061084760033363ffffffff610f2216565b610893576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f41444d494e5f524f4c4560401b604482015290519081900360640190fd5b600360008481526005602081905260409091200154146108fa576040805162461bcd60e51b815260206004820152601e60248201527f494e564f4943455f4e4f545f4345525449464945445f42595f54525553540000604482015290519081900360640190fd5b6000838152600560205260409020600801541561091657600080fd5b600083815260056020818152604092839020600b81018690556002600882015560049201919091558151848152915185927f3dc78cf76d2bf29c29bfbd67e530fbd6d5389d716da39988ec97719df5cedda692908290030190a250600192915050565b600061068860018363ffffffff610f2216565b6004546001600160a01b031681565b60065481565b60006109b460023363ffffffff610f2216565b610a05576040805162461bcd60e51b815260206004820152601c60248201527f444f45535f4e4f545f484156455f435553544f4449414e5f524f4c4500000000604482015290519081900360640190fd5b60026000848152600560208190526040909120015414610a6c576040805162461bcd60e51b815260206004820152601f60248201527f494e564f4943455f4e4f545f4345525449464945445f42595f444542544f5200604482015290519081900360640190fd5b600083815260056020818152604092839020600981018690556003920191909155815133808252925186927f446f273c0fc0c27d1dadaefd6c66e5041c8fb55cc617ee79b7cc76a46d89be51928290030190a25060019392505050565b60008815801590610aea575060008981526005602081905260409091200154155b610b2c576040805162461bcd60e51b815260206004820152600e60248201526d414c52454144595f45584953545360901b604482015290519081900360640190fd5b610b3d60018963ffffffff610f2216565b610b8e576040805162461bcd60e51b815260206004820152601b60248201527f444f45535f4e4f545f484156455f535550504c4945525f524f4c450000000000604482015290519081900360640190fd5b610b9f60008863ffffffff610f2216565b610be3576040805162461bcd60e51b815260206004820152601060248201526f1111509513d497d393d517d193d5539160821b604482015290519081900360640190fd5b60408051610180810182526001600160a01b03808b16825289166020820152908101879052600060608201526080810183905260a081016001815260208101869052604081018790526060016000815260006020808301829052604080840188905260609093018290528c82526005815290829020835181546001600160a01b039182166001600160a01b031991821617835585840151600184018054919093169116179055918301518051610c9f926002850192019061100a565b50606082015160038201556080820151600482015560a0820151600582015560c0820151600682015560e08201516007820155610100820151600882015561012082015160098201556101408201518051610d0491600a84019160209091019061100a565b506101609190910151600b9091015560068054600101905560408051602080825288518183015288516001600160a01b03808c1694908d16938e937f246528f6fdc8a94ad86676d3f598f9bf2202aedf19e9ab6d2c61666d1105e8ad938d938392908301919085019080838360005b83811015610d8b578181015183820152602001610d73565b50505050905090810190601f168015610db85780820380516001836020036101000a031916815260200191505b509250505060405180910390a450600198975050505050505050565b6000610688818363ffffffff610f2216565b600060ff8216610e65576004546001600160a01b03163314610e4f576040805162461bcd60e51b815260206004820152601860248201527f444f45535f4e4f545f484156455f4f574e45525f524f4c450000000000000000604482015290519081900360640190fd5b610e6060038463ffffffff610f8916565b610f19565b610e7660033363ffffffff610f2216565b610ec2576040805162461bcd60e51b8152602060048201526018602482015277444f45535f4e4f545f484156455f41444d494e5f524f4c4560401b604482015290519081900360640190fd5b8160ff1660011415610edf57610edf60018463ffffffff610f8916565b8160ff1660021415610efc57610efc60008463ffffffff610f8916565b8160ff1660031415610f1957610f1960028463ffffffff610f8916565b50600192915050565b60006001600160a01b038216610f695760405162461bcd60e51b81526004018080602001828103825260228152602001806110a66022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b610f938282610f22565b15610fe5576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061104b57805160ff1916838001178555611078565b82800160010185558215611078579182015b8281111561107857825182559160200191906001019061105d565b50611084929150611088565b5090565b6110a291905b80821115611084576000815560010161108e565b9056fe526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373a265627a7a72315820baa902e780e82fec90ffac39da6a4a2877bf0354b2423caba3c1698c410c553464736f6c63430005100032";

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
