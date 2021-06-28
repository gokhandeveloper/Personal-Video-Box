package io.videooftheday;

import io.videooftheday.usecases.UseCaseContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Spark;
import static org.eclipse.jetty.http.HttpStatus.NOT_IMPLEMENTED_501;
import static spark.Spark.*;

public class VideoOfTheDay {
    private static Logger logger = LoggerFactory.getLogger(VideoOfTheDay.class);
    private static final String API_NOT_IMPLEMENTED = "API not implemented.";
    private static final String INTERNAL_SERVER_ERROR = "Internal server error.";

    private Routes routes = new Routes();

    public void start(UseCaseContext useCaseContext) {
        port(getEnvironmentVariablePort());
        staticFiles.location("/public");
        enableCORS();
        setLog();
        routes.create(useCaseContext);
        configureInternalServerError();
        configureNotImplemented();

    }

    static int getEnvironmentVariablePort() {
        //heroku port
//        ProcessBuilder processBuilder = new ProcessBuilder();
//        if (processBuilder.environment().get("PORT") != null) {
//            return Integer.parseInt(processBuilder.environment().get("PORT"));
//        }
        //Googlec cloud run port
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "1"));
        if(port==8080) {
            return port;
        }
        return 4321; //return default port if deployment port isn't set (ex. on localhost when developing)
    }


    private void configureInternalServerError() {
        internalServerError((req, res) -> {
            res.status(NOT_IMPLEMENTED_501);
            logger.error(INTERNAL_SERVER_ERROR + ": " + req.pathInfo());
            return INTERNAL_SERVER_ERROR;
        });
    }
    private void enableCORS() {
        // Enable Cross Origin Resource Sharing.
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
        });
    }
    private void setLog() {
        before((request, response) -> {
            logger.info("URL request: " + request.requestMethod() + " " + request.uri() + " - headers: " + request.headers());
        });
    }
    private void configureNotImplemented() {
        notFound((req, res) -> {
            res.status(NOT_IMPLEMENTED_501);
            logger.error(API_NOT_IMPLEMENTED + ": " + req.pathInfo());
            return API_NOT_IMPLEMENTED;
        });
    }

    public void stop() {
        Spark.stop();
    }
}



