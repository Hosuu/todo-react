import React from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

export default function App() {
	return (
		<>
			<div className='page-container'>
				<Header />
				<ToDoList />
			</div>
		</>
	)
}
