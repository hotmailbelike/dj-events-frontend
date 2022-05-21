import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/Layout';
import { API_URL } from '@/config/config';
import styles from '@/styles/Form.module.css';

const AddEventPage = () => {
	const router = useRouter();

	const [values, setValues] = useState({
		name: '',
		description: '',
		performers: '',
		venue: '',
		address: '',
		date: '',
		time: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const hasEmptyFields = Object.values(values).some((value) => value === '');

			if (hasEmptyFields) {
				return toast.error('Please fill in all fields');
			}

			const res = await fetch(`${API_URL}/api/events`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: values }),
			});

			if (!res.ok) {
				return toast.error('Something went wrong');
			} else {
				const event = await res.json();
				router.push(`/events/${event.data.slug}`);
			}
		} catch (error) {
			console.error('🚀 -> file: add.js -> line 49 -> handleSubmit -> error', error);
			toast.error(`Error: ${error.message}`);
		}
	};

	const handleValues = (e) => {
		const { name, value } = e.target;

		setValues({ ...values, [name]: value });
	};

	return (
		<Layout title={'Add New Event'}>
			<Link href={`/events`}>Go Back</Link>
			<h1>AddEventPage</h1>
			<ToastContainer></ToastContainer>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleValues}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Performers</label>
						<input
							type='text'
							id='performers'
							name='performers'
							value={values.performers}
							onChange={handleValues}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							id='venue'
							name='venue'
							value={values.venue}
							onChange={handleValues}
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							id='address'
							name='address'
							value={values.address}
							onChange={handleValues}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							id='date'
							name='date'
							value={values.date}
							onChange={handleValues}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='text'
							id='time'
							name='time'
							value={values.time}
							onChange={handleValues}
						/>
					</div>
				</div>
				<label htmlFor='description'>Event Description</label>
				<textarea
					type='text'
					name='description'
					id='description'
					value={values.description}
					onChange={handleValues}
				></textarea>

				<input type='submit' value='Add Event' className='btn' />
			</form>
		</Layout>
	);
};

export default AddEventPage;
