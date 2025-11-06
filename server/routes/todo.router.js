// ###### Router Setup ###### 

const express = require('express');
const ToDoController = require('../controller/todo.controller')
const router = express.Router();

//Checkpoint - 2

router.get('/', ToDoController.getAllTodos);
router.get('/:id', ToDoController.getTodo);
router.post('/', ToDoController.createTodo);
router.put('/:id', ToDoController.updateTodo);
router.delete('/:id', ToDoController.deleteTodo);

module.exports = router;

/*
Request Path
localhost:3000/todos/

Request Type
GET POST PUT PATCH DELETE

Postman
*/