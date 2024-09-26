import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
	changeTaskStatus:(id:string,value:boolean)=>void
	filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, ...child}: PropsType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTaskHandler = () => {
		if(taskTitle.trim()!==''){
			addTask(taskTitle.trim())
			setTaskTitle('')
		}else{
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
	}





	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
					className={error?'error':''}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				<div className={error?'error-message':''}>{error}</div>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id)
							}

							const onIsDoneChange = (e:ChangeEvent<HTMLInputElement>) =>{
								let newTaskStatus = e.currentTarget.checked
								child.changeTaskStatus(task.id,newTaskStatus)
							}

							return <li key={task.id} className={task.isDone?'is-done':''}>
								<input type="checkbox" onChange={onIsDoneChange} checked={task.isDone}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button title={'All'} onClick={()=> changeFilterTasksHandler('all')} className={child.filter === 'all'? 'active-filter':''}/>
				<Button title={'Active'} onClick={()=> changeFilterTasksHandler('active')} className={child.filter === 'active'? 'active-filter':''}/>
				<Button title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')} className={child.filter === 'completed'? 'active-filter':''}/>
			</div>
		</div>
	)
}
