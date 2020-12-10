import React, { useState } from 'react'

export default function AddNewModal(props) {
	const [name, setName] = useState('')
	const [isErrorAnimation, setisErrorAnimation] = useState(false)
	const [isWrongData, setIsWrongData] = useState(false)
	const [isClosing, setisClosing] = useState(false)

	const handleNameChange = (e) => {
		setIsWrongData(false)
		setName(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (name.trim().length < 3) {
			setisErrorAnimation(true)
			setIsWrongData(true)
			setName(name.trim())
		} else {
			props.submit(name)
			setName('')
			handleClose()
		}
	}

	const handleFormAnimationEnd = () => {
		setisErrorAnimation(false)
	}

	const handleModalAnimationEnd = () => {
		if (isClosing) props.cancel()
	}

	const handleClose = () => {
		setisClosing(true)
	}

	return (
		<div
			className={`modal-bg ${isClosing ? 'reverse' : ''}`}
			onAnimationEnd={handleModalAnimationEnd}
		>
			<div className={`modal-container ${isClosing ? 'reverse' : ''}`}>
				<div className='modal-label'>Lets add new task!</div>
				<form className='modal-add-form' onSubmit={handleSubmit}>
					<input
						className={`modal-form-input ${
							isErrorAnimation ? 'wrong-animation' : ''
						} ${isWrongData ? 'wrong-data' : ''}`}
						type='text'
						onChange={handleNameChange}
						placeholder='Enter task name...'
						onAnimationEnd={handleFormAnimationEnd}
						value={name}
					/>
					<div className='modal-form-buttons'>
						<button className='modal-form-button'>Add</button>
						<div
							className='modal-form-button'
							onClick={handleClose}
						>
							Cancel
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
