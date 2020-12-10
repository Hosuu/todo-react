import React, { useState } from 'react'
import { GoChecklist } from 'react-icons/go'

export default function Header() {
	const [clickCount, setClickCount] = useState(0)

	const handleClick = () => {
		setClickCount((prev) => prev + 1)
	}

	return (
		<header
			className='app-header'
			onClick={handleClick}
			style={{ letterSpacing: `${0 + (clickCount % 10) / 2}px` }}
		>
			<GoChecklist className='header-icon' />
			Things to do
		</header>
	)
}
