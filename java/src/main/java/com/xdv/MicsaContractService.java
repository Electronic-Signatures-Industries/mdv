package com.xdv;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.*;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.Contract;
import org.web3j.utils.Numeric;

import java.util.Collections;

@Service
public class MicsaContractService {
    private static Logger LOG = LoggerFactory
            .getLogger(MicsaContractService.class);

    private String DOCUMENT_CONTRACT_ADDRESS  = "0x...";

    private String pk = "...";

    public TransactionReceipt registerOrder(String id, String investor) {
        try {


            Web3j web3 = Web3j.build(
                    new HttpService("https://ropsten.infura.io/v3/<api-key>")
            );

            Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().sendAsync().get();

            String clientVersion = web3ClientVersion.getWeb3ClientVersion();

            Credentials credentials = Credentials.create(pk);

            Documents contract =
                    Documents.load(DOCUMENT_CONTRACT_ADDRESS, web3, credentials,
                            Contract.GAS_PRICE,
                            Contract.GAS_LIMIT);


            byte[] _id = org.web3j.utils.Numeric.hexStringToByteArray(id);
            byte[] _investor = Numeric.hexStringToByteArray(asciiToHex(investor));

            
            TransactionReceipt receipt = contract.registerOrder(
                    _id,
                    _investor
            ).send();
            return  receipt;
        }catch (Exception ex) {
            // ex
            LOG.info(ex.toString());
        }


        return null;
    }
    // String to 64 length HexString (equivalent to 32 Hex lenght)
    public static String asciiToHex(String asciiValue)
    {
        char[] chars = asciiValue.toCharArray();
        StringBuffer hex = new StringBuffer();
        for (int i = 0; i < chars.length; i++)
        {
            hex.append(Integer.toHexString((int) chars[i]));
        }

        return hex.toString() + "".join("", Collections.nCopies(32 - (hex.length()/2), "00"));
    }


}
