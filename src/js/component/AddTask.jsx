import React, { useState, useEffect } from "react";

const AddTask = () => {
	const [task, setTask] = useState({ label: "", done: false });
	const [taskList, setTaskList] = useState([]);
	const [firstRender, setFirstRender] = useState(false);

	useEffect(() => {
		getTodoList();
	}, []);

	useEffect(() => {
		if (firstRender) {
			updateTodoList();
		}
	}, [taskList]);

	const getTodoList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/dans182",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();
		setTaskList(data);
		setFirstRender(true);
	};

	const updateTodoList = async () => {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/dans182",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskList),
			}
		);
	};

	let totalDeTareas = taskList.length;

	const nuevaTarea = () => {
		if (task.trim() !== "") {
			setTaskList([...taskList, task]);
		}
	};

	const eliminarTarea = (id) => {
		let listaTareaFiltrada = taskList.filter(
			(elemento, index) => index !== id
		);
		setTaskList(listaTareaFiltrada);
	};

	return (
		<div>
			<form>
				<input
					className="form-control"
					placeholder="Write a task"
					value={task.label}
					onChange={(e) => {
						setTask({ ...task, label: e.currentTarget.value });
						console.log(e.currentTarget.value);
					}}
					onKeyPress={(e) => {
						//sustituit por keydown, pero sin que recargue pagina
						if (e.key === "Enter") {
							e.preventDefault();
							e.stopPropagation();
							// setTaskList([...taskList, task]);
							nuevaTarea();
							setTask("");
						}
					}}
				/>
			</form>
			<div className="text-center">
				<button
					type="button"
					className="btn btn-warning mt-3 mb-3"
					onClick={() => {
						// setTaskList([...taskList, task]);
						nuevaTarea();
						setTask("");
					}}>
					Add a task
				</button>
			</div>
			<div>
				{/* MOSTRAR TAREA ANOTADA */}
				<div>
					{taskList.map((item, index) => {
						return (
							<div
								key={index}
								className="almacenDeTareas d-flex justify-content-between rounded"
								style={{ width: "235px", height: "35px" }}>
								<div className="tareaX">{item.label} </div>
								<div className="tareaX">
									<i
										className="fas fa-times-circle mr-5"
										type="button"
										onClick={() => {
											eliminarTarea(index);
											updateTodoList();
										}}></i>
								</div>
							</div>
						);
					})}
				</div>
				<div className="text-center">
					{totalDeTareas === 0
						? "You have a lot of free time"
						: totalDeTareas === 1
						? taskList.length + " " + "task left"
						: taskList.length + " " + "tasks left"}
				</div>
			</div>
		</div>
	);
};

export default AddTask;
