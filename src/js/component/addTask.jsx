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
		const labels = taskList.map((task) => task.label);
		const newTaskLabel = task.label.trim();
		if (newTaskLabel != "" && !labels.includes(newTaskLabel)) {
			setTaskList([...taskList, task]);
			setTask({ label: "", done: false });
		} else {
			alert("No se puede ingresar esta tarea");
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
						setTask({ ...task, label: e.target.value });
						console.log(e.target.value);
					}}
					onKeyPress={(e) => {
						//sustituit por keydown, pero sin que recargue pagina
						if (e.key === "Enter") {
							e.preventDefault();
							e.stopPropagation();
							// setTaskList([...taskList, task]);
							nuevaTarea(e);
						}
					}}
				/>
			</form>
			<div className="text-center">
				<button
					type="button"
					className="btn btn-warning mt-3 mb-3"
					onClick={(e) => {
						nuevaTarea(e);
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
											// updateTodoList(); //Esto funciona igualmente si lo quito.
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
						? totalDeTareas + " " + "task left"
						: totalDeTareas + " " + "tasks left"}
				</div>
			</div>
		</div>
	);
};

export default AddTask;
