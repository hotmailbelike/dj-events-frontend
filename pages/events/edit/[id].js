import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import qs from 'qs';
import { FaImage } from 'react-icons/fa';

import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { API_URL } from '@/config/config';
import styles from '@/styles/Form.module.css';

const EditEventPage = ({ event }) => {
	const router = useRouter();

	const [values, setValues] = useState({
		name: event.name,
		description: event.description,
		performers: event.performers,
		venue: event.venue,
		address: event.address,
		date: event.date,
		time: event.time,
	});

	const [imagePreview, setImagePreview] = useState(
		event?.image?.data?.attributes.formats.thumbnail.url || ''
	);

	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const hasEmptyFields = Object.values(values).some((value) => value === '');

			if (hasEmptyFields) {
				return toast.error('Please fill in all fields');
			}

			const res = await fetch(`${API_URL}/api/events/${event.id}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: values }),
			});

			if (!res.ok) {
				return toast.error('Something went wrong');
			} else {
				const event = await res.json();
				router.push(`/events/${event.data.attributes.slug}`);
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
		<Layout title={'Edit Event'}>
			<Link href={`/events`}>Go Back</Link>
			<h1>Edit Event </h1>
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
							value={moment(values.date).format('yyyy-MM-DD')}
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

				<input type='submit' value='Update Event' className='btn' />
			</form>
			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} height={100} width={170}></Image>
			) : (
				<div>
					<p>No Image Uploaded</p>
				</div>
			)}

			<div>
				<button onClick={() => setShowModal(true)} className='btn-secondary'>
					<FaImage></FaImage> Set Image
				</button>
			</div>

			<Modal show={showModal} onClose={() => setShowModal(false)}>
				Upload Image
			</Modal>
		</Layout>
	);
};

export const getServerSideProps = async ({ params: { id } }) => {
	const query = qs.stringify({
		populate: '*',
	});
	const res = await fetch(`${API_URL}/api/events/${id}?${query}`);

	const event = await res.json();

	return {
		props: {
			event: { id: event.data.id, ...event.data.attributes },
		},
	};
};

export default EditEventPage;
