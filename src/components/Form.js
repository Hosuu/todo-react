import React, { useState } from 'react'

export default function Form() {
	const [inputValue, setInputValue] = useState('')

	const handleChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setInputValue('')
		// alert(inputValue)
	}

	return (
		<div className='header-form'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={inputValue}
					onChange={handleChange}
					placeholder='Enter task name'
				/>
				<button>Create</button>
			</form>
		</div>
	)
}
