package io.videooftheday;

import io.videooftheday.usecases.ProductionUseCaseContext;
import io.videooftheday.usecases.UseCaseContext;

public class VideoOfTheDayLauncher {
    public static void main(String[] args) {
        UseCaseContext useCaseContext = new ProductionUseCaseContext();
        AddMainArgsToContext addMainArgsToContext = new AddMainArgsToContext(useCaseContext);
        addMainArgsToContext.add(args);
        new VideoOfTheDay().start(useCaseContext);
    }
}
