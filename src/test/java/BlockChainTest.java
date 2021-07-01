import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.video.Video;

import java.io.IOException;
import java.math.BigInteger;

public class BlockChainTest {

    @BeforeAll
    public static void setup() {


    }

    @Test
    public void canConnectToNode () throws Exception {
        String nodeUrl = "http://127.0.0.1";
        String seperator = ":";
        int port = 7545;
        String node =nodeUrl+seperator+port;
        Web3j web3 = Web3j.build(new HttpService(node));  // defaults to http://localhost:8545/
        Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().send();
        String clientVersion = web3ClientVersion.getWeb3ClientVersion();
        Assertions.assertNotNull(clientVersion);
    }

    @Test
    public void canSendSmartContract() throws Exception {
        String nodeUrl = "http://127.0.0.1";
        String seperator = ":";
        int port = 7545;
        String node =nodeUrl+seperator+port;
        String privateKey = "e841fc7bba7d73488eb0479f6eb41fb8d89b6ef1d15d9f6bf9f010ab2158600e";
        Web3j web3j = Web3j.build(new HttpService(node));

        Video contract = Video.deploy(
                web3j, Credentials.create(privateKey),
                BigInteger.valueOf(20000000), BigInteger.valueOf(6721975)).send();
       // contractAddress= contract.getDeployedAddress("5777");


    }
    @Test
    public void canLoadSmartContract() throws Exception {
        String nodeUrl = "http://127.0.0.1";
        String seperator = ":";
        int port = 7545;
        String node =nodeUrl+seperator+port;
        String privateKey = "f2871236228559424019f8cba92cf44b8c181c0dbfbd3044c08848267176199f";
        String contractAddress = "0xc072cae65521D347DB1563104a9386a73296cEfd";
        Web3j web3j = Web3j.build(new HttpService(node));
       ContractGasProvider contractGasProvider = new ContractGasProvider() {
           @Override
           public BigInteger getGasPrice(String contractFunc) {
               return BigInteger.valueOf(20000000);
           }

           @Override
           public BigInteger getGasPrice() {
               return BigInteger.valueOf(20000000);
           }

           @Override
           public BigInteger getGasLimit(String contractFunc) {
               return BigInteger.valueOf(6721975);
           }

           @Override
           public BigInteger getGasLimit() {
               return BigInteger.valueOf(6721975);
           }
       };
        Video videoSmartContract= Video
                .load(contractAddress,web3j,
                        Credentials.create(privateKey), contractGasProvider);
        Assertions.assertTrue(videoSmartContract.getContractAddress().equals(contractAddress));
        Assertions.assertTrue(videoSmartContract.isValid());

        videoSmartContract.setVideo("123").send();
        Assertions.assertEquals("123", videoSmartContract.getVideo().send());
        web3j.shutdown();
    }

    @Test
    public void greeterDeploys() throws Exception {
        String nodeUrl = "http://127.0.0.1";
        String seperator = ":";
        int port = 7545;
        String node =nodeUrl+seperator+port;
        String privateKey = "bdc750d4ae648e6285011119478f34ee2d55daa478792699775f63ddb54cd32d";
        String address = "0x5b8c1cc2Bf538C6e300a56a13E42c6cD8D1A8CF7";
        Web3j web3j = Web3j.build(new HttpService(node));
        Video videoSmartContract= Video.load(address,web3j, Credentials.create(privateKey),
                BigInteger.valueOf(20000000), BigInteger.valueOf(6721975));
        if (videoSmartContract.isValid()) {
            videoSmartContract.setVideo("1").send();
            System.out.println("here");
            Assertions.assertEquals("hi", videoSmartContract.getVideo().encodeFunctionCall());

        }
        web3j.shutdown();
    }
}
