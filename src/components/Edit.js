import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
let endpoint = '/api';

export default function Show(props) {
	const [fruit, updateFruit] = useState({});
	const history = useHistory();
	// const [fruit, updateFruit] = useState({
	// 	name: '',
	// 	color: '',
	// 	readyToEat: ''
	// });
	const [allFruits, updateAllFruits] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`${endpoint}/${props.match.params.id}`);
				const data = await response.json();
				await updateFruit(data);
				console.log(fruit);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleSubmit = async event => {
		// event.preventDefault();
		history.push('/');
		// console.log(fruit, data);
		// !fruit.readyToEat ? updateFruit({ ...fruit, readyToEat: false }) : fruit;
		try {
			// console.log(fruit);
			const response = await fetch(`${endpoint}/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(fruit)
			});
			const data = await response.json();

			await updateFruit({
				name: '',
				color: '',
				readyToEat: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = () => {
		updateFruit({ ...fruit, [event.target.id]: event.target.value });
	};
	const handleCheckbox = () => {
		updateFruit({ ...fruit, [event.target.id]: event.target.checked });
	};

	return (
		<div className="Page-wrapper">
			{Object.keys(fruit).length > 0 ? (
				<div>
					<form onSubmit={handleSubmit} className="task-form">
						<h1> Edit Fruit Form </h1>
						Name:{' '}
						<input
							type="text"
							name="name"
							id="name"
							value={fruit.name}
							onChange={handleChange}
						/>
						<br />
						Color:{' '}
						<input
							type="text"
							name="color"
							id="color"
							value={fruit.color}
							onChange={handleChange}
						/>
						<br />
						Is Ready To Eat:{' '}
						<input
							type="checkbox"
							name="readyToEat"
							id="readyToEat"
							checked={fruit.readyToEat}
							onChange={handleCheckbox}
						/>
						<br />
						<button type="submit">Edit Fruit</button>
					</form>
				</div>
			) : (
				<h1>Nothing found on {props.match.params.id}.</h1>
			)}
			<h3>
				<Link to={'/'}>Go Back Home</Link>
			</h3>
		</div>
	);
}
