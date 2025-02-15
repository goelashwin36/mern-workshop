import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";

/*
Material UI
States
UseEffect
Functions
Rendering UI Elements
*/

/*
TODO ->
{
    "_id": "ID",
    "title": "Learn about MERN Stack",
    "completed": false,
    "createdAt": "2024-11-08T23:48:36.392Z",
    "__v": 0
}
*/

let host = "http://localhost:8080/api";

export default function Todos() {
	const [todos, setTodos] = useState([]);
	const [newTodoTitle, setNewTodoTitle] = useState("");

	// Load all todos before initially
	useEffect(() => {
		async function getTodos() {
			try {
				let todoRes = await axios.get(host + "/todos");
				if (todoRes && todoRes.data && todoRes.data.todos) {
					// Storing all todos in the state
					setTodos(todoRes.data.todos);
				}
			} catch (err) {
				console.log(err);
			}
		}
		getTodos();
	}, []);

	// Creating a new TODO
	const createTodo = async () => {
		try {
			if (newTodoTitle) {
				let newTodoRes = await axios.post(host + "/todos", {
					completed: false,
					title: newTodoTitle,
				});
				if (newTodoRes && newTodoRes.data && newTodoRes.data.todo) {
					let newTodo = newTodoRes.data.todo;
					setTodos([newTodo, ...todos]);
					setNewTodoTitle("");
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	// Deleting an existing TODO
	const deleteTodo = async (id) => {
		try {
			let deleteRes = await axios.delete(host + "/todos/" + id);
			if (deleteRes && deleteRes.status == 200) {
				let updatedTodoList = todos.filter((todo) => todo._id != id);
				setTodos(updatedTodoList);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// Toggle Checkbox for a TODO
	const toggleCompleted = async (id, completedStatus) => {
		try {
			let updateRes = await axios.put(host + "/todos/" + id, {
				completed: completedStatus,
			});

			let updatedTodo = updateRes.data.todo;

			let currentTodoList = todos;

			// Updating the TODO from current state
			let updatedTodoList = currentTodoList.map((todo) => {
				if (todo._id !== id) return todo;
				else return { ...updatedTodo };
			});

			// Updating State
			setTodos(updatedTodoList);
		} catch (err) {
			console.log(err);
		}
	};

	// Displaying list of TODOS
	const displayTodos = () => {
		if (!todos || todos.length === 0) {
			return <>No Todos to display!!</>;
		}

		return todos.map((todo) => (
			<>
				<ListItem
					key={todo._id}
					// ###### DELETE BUTTON ######
					secondaryAction={
						//Checkpoint - 1
						<IconButton>
							<DeleteIcon />
						</IconButton>
					}
					disablePadding
				>
					<ListItemButton
						onClick={() =>
							toggleCompleted(todo._id, !todo.completed)
						}
					>
						{/*  ###### TODO CHECKBOX ######  */}
						<ListItemIcon>
							<Checkbox checked={todo.completed} disableRipple />
						</ListItemIcon>
						{/*  ###### TODO TEXT ######  */}
						<ListItemText>
							{todo.completed ? (
								<strike>{todo.title}</strike>
							) : (
								todo.title
							)}
						</ListItemText>
					</ListItemButton>
				</ListItem>
			</>
		));
	};

	return (
		<>
			<span
				style={{
					fontSize: "40px",
					padding: "5px",
					marginBottom: "50px",
				}}
			>
				TODO APP
			</span>
			<Card sx={{ width: 500, minHeight: 500, padding: 5 }}>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Grid container alignItems="center">
								<Grid item xs={8}>
									{/*  ###### TEXT BOX ######  */}
									<TextField
										fullWidth
										label="Title"
										value={newTodoTitle}
										onChange={(event) => {
											setNewTodoTitle(event.target.value);
										}}
									/>
								</Grid>
								<Grid item xs={4}>
									{/*  ###### ADD TODO BUTTON ######  */}
									<Button
										variant="contained"
										onClick={createTodo}
									>
										Add Todo
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<List>{displayTodos()}</List>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
