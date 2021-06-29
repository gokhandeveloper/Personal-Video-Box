import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.http.HttpService;
import org.web3j.video.Video;

import java.math.BigInteger;

public class BlockChainTest {

    @BeforeAll
    public static void setup() {


    }

    @Test
    public void canSendSmartContract() throws Exception {
        String nodeUrl = "http://127.0.0.1";
        String seperator = ":";
        int port = 7545;
        String node =nodeUrl+seperator+port;
        String privateKey = "cf20c0c55b92f61c3793881a8d37ca86adce8702c742819226c85df8e8e44b5c";
        Web3j web3j = Web3j.build(new HttpService(node));

        RemoteCall<Video> videoSmartContract= Video.deploy(web3j, Credentials.create(privateKey),
                BigInteger.valueOf(20000000), BigInteger.valueOf(6721975));
        videoSmartContract.send();
        web3j.shutdown();

    }
    @Test
    public void canLoadSmartContract() throws Exception {
        String nodeUrl = "http://127.0.0.1";
        String seperator = ":";
        int port = 7545;
        String node =nodeUrl+seperator+port;
        String privateKey = "cf20c0c55b92f61c3793881a8d37ca86adce8702c742819226c85df8e8e44b5c";
        String address = "0x59b2dcaFCD8e0B30F9181C6dbADB6fBb14aC8c0C";
        Web3j web3j = Web3j.build(new HttpService(node));
        Video videoSmartContract= Video.load(address,web3j, Credentials.create(privateKey),
                BigInteger.valueOf(20000000), BigInteger.valueOf(6721975));
        if (videoSmartContract.isValid()) {
            videoSmartContract.get();
        }
        web3j.shutdown();
    }
}
