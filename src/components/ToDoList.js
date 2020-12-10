import React, { useEffect, useReducer, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import ToDoItem from './ToDoItem'
import '../css/todo.css'
import gradients from '../gradients'
import AddNewModal from './AddNewModal'

function getRandomGradient() {
	const gradient = gradients[Math.floor(Math.random() * gradients.length)]
	return gradient.colors
}

function getNewTodoTemplate() {
	return {
		id: Date.now() - Math.floor(Math.random() * 1000),
		isDone: false,
		name: 'My new Task',
		desc: [],
		gradient: getRandomGradient(),
	}
}

export default function ToDoList({ addNew }) {
	// States
	const [search, setSearch] = useState('')
	const [isAddingNew, setIsAddingNew] = useState(false)

	//Todos Reducer
	const [todos, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'ADD':
				return [
					{ ...getNewTodoTemplate(), ...action.payload },
					...state,
				]
			case 'REMOVE':
				return state.filter((el) => el.id !== action.id)
			case 'EDIT':
				return state.map((el) =>
					el.id === action.id ? { ...el, ...action.payload } : el
				)
			case 'TOGGLE':
				return state.map((el) =>
					el.id === action.id ? { ...el, isDone: !el.isDone } : el
				)
			case 'ROLLCOLOR':
				return state.map((el) =>
					el.id === action.id
						? { ...el, gradient: getRandomGradient() }
						: el
				)
			default:
				return state
		}
	}, JSON.parse(localStorage.getItem('todos')) || [])

	// Save to local sotorage on data edit
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	// How to add new!!!
	// dispatch({
	// 	type: 'ADD',
	// 	payload: {
	// 		name: 'New todo3!',
	// 	},
	// })

	function submitNew(name) {
		dispatch({ type: 'ADD', payload: { name } })
	}

	function cancelNew() {
		setIsAddingNew(false)
	}

	return (
		<>
			<div className='todos-list'>
				<div className='todos-options'>
					<input
						className='todos-search'
						type='text'
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Filter...'
						value={search}
					/>
					<div className='todos-search-icon'>
						<FaSearch />
					</div>
					<div
						className='todos-add'
						onClick={() => setIsAddingNew(true)}
					>
						<FaPlus />
					</div>
				</div>
				{todos
					.filter((todo) => {
						return String(todo.name)
							.toLowerCase()
							.includes(search.toLowerCase()) ||
							String(todo.desc)
								.toLowerCase()
								.includes(search.toLowerCase())
							? true
							: false
					})
					// SPLIT UNDONE / DONE
					// .sort(({ isDone, id }) => (isDone ? id : -id))
					.map((todo) => (
						<ToDoItem
							key={todo.id}
							data={todo}
							dispatch={dispatch}
						/>
					))}
			</div>
			{isAddingNew ? (
				<AddNewModal submit={submitNew} cancel={cancelNew} />
			) : null}
		</>
	)
}
