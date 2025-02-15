var express = require("express");
//Cross Origin Resource Sharing - Security Purposes
const cors = require("cors");
var todoRouter = require("./routes/todo.router");
const PORT = process.env.PORT || 8080;
const path = require("path");
const mongoose = require("mongoose");

//Setting up environment variables
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Instantiating express application
var app = express();

// Make our application use JSON request format
app.use(express.json());

// Cors Config
let corsoptions = {
	origin: "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsoptions));

// ###### Connecting Router ######
// http://localhost:8080/api/todos/xyz
app.use("/api/todos", todoRouter);

//Connecting to Mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
	console.log("Connected to database!");
});

const db = mongoose.connection;
db.on("error", () => console.error("MongoDb connection error"));

// Listening to application on the PORT
app.listen(PORT, () => console.log("Server is up and running!!"));
