import React, { useState } from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import {
	FaRedoAlt,
	FaTrashAlt,
	FaEdit,
	FaSave,
	FaExclamationTriangle,
} from 'react-icons/fa'

export default function ToDoItem(props) {
	// Destruct props
	const {
		data: { id, name, desc, isDone, gradient },
		dispatch,
	} = props

	// Render states
	const [isExpanded, setIsExpanded] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [isWrongName, setIsWrongName] = useState(false)

	// Input states
	const [nameInput, setNameInput] = useState(name)
	const [descInput, setDescInput] = useState(desc.join('\n'))

	// Handlers
	function toggleDone() {
		dispatch({
			type: 'TOGGLE',
			id,
		})
	}

	function remove() {
		dispatch({ type: 'REMOVE', id })
	}

	function toggleExpand() {
		setIsExpanded((prev) => !prev)
	}

	function handleNameInput(e) {
		setNameInput(e.target.value)
		setIsWrongName(false)
	}

	function validateInput(inputValue) {
		if (nameInput.trim().length < 3) setIsWrongName(true)

		return nameInput.trim().length < 3 ? false : true
	}

	function handleEdit() {
		if (isEditing === true && validateInput(nameInput)) {
			setIsEditing(false)
			dispatch({
				type: 'EDIT',
				id,
				payload: {
					name: nameInput,
					desc: descInput.split('\n'),
				},
			})
		} else setIsEditing(true)
	}

	function changeColor() {
		dispatch({ type: 'ROLLCOLOR', id })
	}

	return (
		<div
			className='todo'
			style={{
				background: `linear-gradient(135deg, ${gradient.join(',')})`,
			}}
		>
			<div className={`todo-short ${isExpanded ? 'expanded' : ''}`}>
				{/* DONE TOGGLE DIV */}
				<div onClick={toggleDone} className='todo-check todo-icon'>
					{isDone ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
				</div>
				{/* NAME + EXPAND DIV */}
				<div className='todo-short-right'>
					<div
						className={`todo-label ${
							isDone && !isEditing ? 'done' : ''
						}`}
					>
						<input
							value={nameInput}
							onChange={handleNameInput}
							placeholder='Name...'
							disabled={!isEditing}
							className={`${isDone && !isEditing ? 'done' : ''}`}
							style={{
								width: `${
									!isEditing
										? nameInput.length
										: Math.max(nameInput.length, 7)
								}ch`,
							}}
						/>
					</div>
					<div
						className='todo-icon todo-expand'
						onClick={toggleExpand}
					>
						{isExpanded ? <MdExpandMore /> : <MdExpandLess />}
					</div>
				</div>
			</div>
			{isExpanded ? (
				<div className='todo-expanded'>
					<div className='todo-desc'>
						{isEditing ? (
							<textarea
								value={descInput}
								onChange={(e) => setDescInput(e.target.value)}
								placeholder='Description...'
							/>
						) : (
							desc.map((line, i) => <div key={i}>{line}</div>)
						)}
					</div>
					<div className='todo-buttons'>
						<div onClick={handleEdit}>
							{isEditing ? (
								isWrongName ? (
									<>
										<FaExclamationTriangle /> Invaild name
									</>
								) : (
									<>
										<FaSave /> Save
									</>
								)
							) : (
								<>
									<FaEdit /> Edit
								</>
							)}
						</div>
						<div onClick={changeColor}>
							<FaRedoAlt />
							Roll color
						</div>
						<div onClick={remove} onMouseDown>
							<FaTrashAlt />
							Delete task
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	)
}
