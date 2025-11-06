// ###### Controller Setup ######

const Todo = require("../models/todo.model");

const ToDoController = {
	getAllTodos: async (req, res) => {
		console.log("Here in Get All Todos");
		try {
			// Getting all TODO from DB sorted by date desc
			const todos = await Todo.find({}).sort({ createdAt: -1 });
			console.log(todos);

			res.status(200).json({
				message: "Get all todos successfully.",
				todos: todos,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	getTodo: async (req, res) => {
		console.log("Here in Get Todo");
		try {
			const todoId = req.params.id;

			// Getting TODO from DB from ID
			const todo = await Todo.findOne({ _id: todoId });

			if (!todo) {
				return res
					.status(404)
					.json({ msg: `No todo with id: ${todoId}` });
			} else {
				console.log(todo);
				res.status(200).json({
					message: "Get Todo successful.",
					todo: todo,
				});
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	createTodo: async (req, res) => {
		console.log("Here in Create Todo");
		try {
			// Creating new TODO model
			const newTodo = new Todo({
				title: req.body.title,
				completed: req.body.completed,
			});

			// Saving model
			const todo = await newTodo.save();
			if (!todo) {
				res.status(500).json({
					message: err.message,
				});
			} else {
				console.log(todo);
				res.status(201).json({
					message: "Todo created successfully.",
					todo: todo,
				});
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	//Checkpoint - 3
	updateTodo: async (req, res) => {
		console.log("Here in Update Todo");
		try {
			const todoId = req.params.id;
			const updatedTodo = {
				title: req.body.title,
				completed: req.body.completed, //##
			};

			// Get TODO by ID and Update fields
			const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
				new: true,
			});

			if (!todo) {
				return res
					.status(404)
					.json({ msg: `No todo with id: ${todoId}` });
			} else {
				console.log(todo);
				res.status(200).json({
					msg: `Todo with id: ${todoId} updated successfully.`,
					todo: todo,
				});
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	deleteTodo: async (req, res) => {
		console.log("Here in Delete Todo");
		try {
			const todoId = req.params.id;

			// Find TODO from ID and Delete
			const todo = await Todo.findByIdAndDelete(todoId);

			if (!todo) {
				return res
					.status(404)
					.json({ msg: `No todo with id: ${todoId}` });
			} else {
				console.log(todo);
				res.status(200).json({
					message: `Todo with id: ${todoId} deleted successfully.`,
				});
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

module.exports = ToDoController;
