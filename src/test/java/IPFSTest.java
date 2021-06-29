import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.IOException;
import java.util.Queue;

public class IPFSTest {

    @Test
    public void fileCreate() throws Exception {
        IPFS ipfs = new IPFS("/dns4/ipfs.infura.io/tcp/5001/https");
        File temporaryFile = new File("hello.txt");

        if(temporaryFile.exists() && !temporaryFile.isDirectory()) {
            NamedStreamable.FileWrapper file = new NamedStreamable.FileWrapper(temporaryFile);
            MerkleNode addResult = ipfs.add(file).get(0);
            Assertions.assertTrue((addResult.hash.toString().startsWith("Q")));
            temporaryFile.delete();

        }


    }
}

