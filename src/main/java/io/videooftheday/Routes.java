package io.videooftheday;

import io.videooftheday.usecases.UseCaseContext;

import static spark.Spark.get;

public class Routes {

    public void create(UseCaseContext useCaseContext) {
        get("status", (req, res) -> "Java Dapp API ok!");

    }
}
