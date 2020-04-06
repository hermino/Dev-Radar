const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const {setupWebSocket} = require('./websocket');
const routes = require("./routes");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect("mongodb+srv://hermino:gDkNwlpyglUyStBy@cluster0-qzcqd.mongodb.net/devradar?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);