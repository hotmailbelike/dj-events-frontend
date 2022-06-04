import { API_URL } from '@/config/config';
import { useState } from 'react';
import styles from '@/styles/Form.module.css';

const ImageUpload = ({ eventId, imageUploaded }) => {
	const [image, setImage] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('files', image);
		formData.append('ref', 'event');
		formData.append('refId', eventId);
		formData.append('field', 'image');

		const res = await fetch(`${API_URL}/api/upload`, {
			method: 'post',
			body: formData,
		});
		if (res.ok) {
			const imagesArray = await res.json();
			imageUploaded(imagesArray[0]);
		}
	};

	const handleFileChange = (e) => {
		setImage(e.target.files[0]);
	};

	return (
		<div className={styles.form}>
			<h1>Upload Event Image</h1>
			<form onSubmit={handleSubmit}>
				<input type='file' onChange={handleFileChange} />
				<input type='submit' value='Upload' className='btn' />
			</form>
		</div>
	);
};

export default ImageUpload;
