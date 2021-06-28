package io.videooftheday.usecases;

import io.videooftheday.Property;

public interface UseCaseContext {
    Property getProperty();
    String [] getArguments();
    void addArguments(String[] args);
}
