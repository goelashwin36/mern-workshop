var express = require('express');
//Cross Origin Resource Sharing - Security Purposes
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const mongoose = require('mongoose');

var todoRouter = require('./routes/todo.router');
const PORT = process.env.PORT || 8080;

var app = express();

app.use(express.json());

let corsoptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
app.use(cors(corsoptions))

// ###### Connecting Router ###### 
// http://localhost:8080/todos/xyz
app.use('/api/todos', todoRouter);

//Connecting to Mongodb
mongoose.connect(
  process.env.MONGO_URI, { useNewUrlParser: true },
  () => {
    console.log("Connected to database!")
  })

const db = mongoose.connection
db.on('error', () => console.error('MongoDb connection error'))

//Running application 
app.listen(PORT, () => console.log("Server is up and running!!"))
