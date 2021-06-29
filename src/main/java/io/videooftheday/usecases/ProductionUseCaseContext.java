package io.videooftheday.usecases;

import io.videooftheday.ProductionPropertyService;
import io.videooftheday.Property;

public class ProductionUseCaseContext implements UseCaseContext {
    private final ProductionPropertyService productionPropertyService;
    private String [] arguments= {};

    public ProductionUseCaseContext() {
        productionPropertyService = new ProductionPropertyService();
    }
    @Override
    public Property getProperty() {
        return productionPropertyService;
    }

    @Override
    public String []  getArguments() { return arguments; }

    @Override
    public void addArguments(String[] args) {
        arguments = args;
    }
}
