import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.io.File;

public class IPFSTest {

    @Test
    public void fileCreate() throws Exception {
        IPFS ipfs = new IPFS("/dns4/ipfs.infura.io/tcp/5001/https");
        File temporaryFile = new File("hello.txt");

        if(temporaryFile.exists() && !temporaryFile.isDirectory()) {
            NamedStreamable.FileWrapper file = new NamedStreamable.FileWrapper(temporaryFile);
            MerkleNode addResult = ipfs.add(file).get(0);
            temporaryFile.delete();
            Assertions.assertTrue((addResult.hash.toString().startsWith("Q")));
        }
    }

    @Test
    public void videoFileCreate() throws Exception {
        IPFS ipfs = new IPFS("/dns4/ipfs.infura.io/tcp/5001/https");
        String path = "src/test/resources/test_video1.mp4";
        File temporaryFile = new File(path);
        if(temporaryFile.exists() && !temporaryFile.isDirectory()) {
            System.out.println("temporaryFile");
            NamedStreamable.FileWrapper file = new NamedStreamable.FileWrapper(temporaryFile);
            MerkleNode addResult = ipfs.add(file).get(0);
            System.out.println(addResult.hash);
            Assertions.assertTrue((addResult.hash.toString().startsWith("Q")));
        }
    }
}

