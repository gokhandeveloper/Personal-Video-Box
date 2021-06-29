package io.videooftheday;

import io.videooftheday.properties.EthereumProperty;
import io.videooftheday.properties.IPFSProperty;

public interface Property {
    EthereumProperty getEthereumProperties();
    IPFSProperty getIPFSProperty();

    class PropertyFileNotFound extends RuntimeException{
    }
}
