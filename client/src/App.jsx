import React from "react";
import "./css/App.css";
import Todos from "./components/Todos";

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<Todos />
			</div>
		</div>
	);
}

export default App;
