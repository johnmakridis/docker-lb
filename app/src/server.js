const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const http = require("http");
const cors = require("cors");


let server = express();
server.set("port", 3000);

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());


// Headers
server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type"); // Request headers you wish to allow

    // Set to true if you need the website to include cookies in the requests sent
    // to the APP (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});


let inderRouter = require("./routes/index");
server.use("/", inderRouter);


// catch 404 and forward to error handler
server.use((req, res, next) => {
    next(createError(404));
});


// error handler
server.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});


const webServer = http.createServer(server).listen(server.get("port"), () => {
    console.log("Server listening on port " + server.get("port") + "\nPress CTRL+C to quit");
});

process.on("uncaughtException", (err) => {
    console.error("un Caught exception:" + err + " stack:" + err.stack);
});

process.on("SIGINT", () => {
    webServer.close(() => {
        console.log("Bye Bye! ;)");
        process.exit(0);
    });
});

module.exports = server;
