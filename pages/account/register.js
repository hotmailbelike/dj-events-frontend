import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.css';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const { register, error, setError } = useContext(AuthContext);

	useEffect(() => {
		if (error) {
			toast.error(error);
			setError(null);
		}
	}, [error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			return toast.error('Passwords do not match');
		}
		register({ email, password, userName });
	};

	return (
		<Layout title='User Registration'>
			<div className={styles.auth}>
				<h1>
					<FaUser /> Register
				</h1>
				<ToastContainer />
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>Email Address</label>
						<input
							required
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							required
							type='text'
							id='username'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							required
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='passwordConfirm'>Confirm Password</label>
						<input
							required
							type='password'
							id='passwordConfirm'
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</div>

					<input type='submit' value='Register' className='btn' />
				</form>

				<p>
					Already an account? <Link href='/account/login'>Login</Link>
				</p>
			</div>
		</Layout>
	);
}
