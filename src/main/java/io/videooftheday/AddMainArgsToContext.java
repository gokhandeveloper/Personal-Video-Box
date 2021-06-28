package io.videooftheday;

import io.videooftheday.usecases.UseCaseContext;

public class AddMainArgsToContext {
    private UseCaseContext useCaseContext;
    public AddMainArgsToContext(UseCaseContext useCaseContext) {
        this.useCaseContext = useCaseContext;
    }

    public void add(String[] args) {
        useCaseContext.addArguments(args);
    }
}
