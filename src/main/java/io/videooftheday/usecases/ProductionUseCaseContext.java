package io.videooftheday.usecases;

import io.videooftheday.Property;
import io.videooftheday.usecases.UseCaseContext;

public class ProductionUseCaseContext implements UseCaseContext {
    private String [] arguments= {};

    @Override
    public Property getProperty() {
        return null;
    }

    @Override
    public String []  getArguments() {
        return arguments;

    }

    @Override
    public void addArguments(String[] args) {
        arguments = args;
    }
}
