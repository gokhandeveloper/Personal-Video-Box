package io.videooftheday;

import io.videooftheday.properties.EthereumProperty;
import io.videooftheday.properties.IPFSProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ProductionPropertyService implements Property {
    private static final Logger logger = LoggerFactory.getLogger(ProductionPropertyService.class);
    private final Properties props;

    public ProductionPropertyService() {
        props = new Properties();
    }
    public InputStream getFileLocation() {
        String stagingPropertyFile = System.getenv().getOrDefault("staging", "");
        if (stagingPropertyFile != null && !stagingPropertyFile.isEmpty() && !stagingPropertyFile.equals("")) {
            logger.info("Found staging property file in this environment-->" + stagingPropertyFile);
            return VideoOfTheDayLauncher.class.getClassLoader().getResourceAsStream(stagingPropertyFile);
        } else {
            String productionPropertyFile = System.getenv().getOrDefault("production", "");
            if (productionPropertyFile != null && !productionPropertyFile.isEmpty() && !productionPropertyFile.equals("")) {
                return VideoOfTheDayLauncher.class.getClassLoader().getResourceAsStream(productionPropertyFile);
            }
            String localPropertyFile = System.getenv().getOrDefault("local", "");
            if (localPropertyFile != null && !localPropertyFile.isEmpty() && !localPropertyFile.equals("")) {
                return VideoOfTheDayLauncher.class.getClassLoader().getResourceAsStream(localPropertyFile);
            }
            return ProductionPropertyService.class.getResourceAsStream("no property file found");
        }
    }
    @Override
    public EthereumProperty getEthereumProperties() {
        try {
            props.load(getFileLocation());
            EthereumProperty ethereumProperty = new EthereumProperty();
            ethereumProperty.blockChainName = props.getProperty("blockchain.Name");
            ethereumProperty.node = props.getProperty("blockchain.Node");
            ethereumProperty.port = props.getProperty("blockchain.Port");
            ethereumProperty.privateKey = props.getProperty("blockchain.PrivateKey");
            return ethereumProperty;
        } catch (IOException ignored) {
            throw new Property.PropertyFileNotFound();
        }
    }

    @Override
    public IPFSProperty getIPFSProperty() {
        try {
            props.load(getFileLocation());
            IPFSProperty ipfsProperty= new IPFSProperty();
            ipfsProperty.gateway = props.getProperty("ipfs.Gateway");
            ipfsProperty.port = props.getProperty("ipfs.Port");
            return ipfsProperty;
        } catch (IOException ignored) {
            throw new Property.PropertyFileNotFound();
        }
    }
}
