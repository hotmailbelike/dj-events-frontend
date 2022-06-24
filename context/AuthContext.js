import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	// register user
	const register = async (userObj) => {
		console.log(
			'🚀 -> file: AuthContext.js -> line 13 -> AuthProvider -> userObj',
			userObj
		);
	};

	// login user
	const login = async ({ email: identifier, password }) => {
		try {
			const res = await fetch(`${NEXT_URL}/api/login`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ identifier, password }),
			});

			const data = await res.json();
			if (res.ok) {
				setUser(data.user);
				router.push(`/account/dashboard`);
			} else {
				setError(data.error);
			}
		} catch (error) {
			console.error('🚀 -> file: AuthContext.js -> line 24 -> login -> error', error);
		}
	};

	// logout user
	const logout = async (req, res) => {
		try {
			const res = await fetch(`${NEXT_URL}/api/logout`, {
				method: 'post',
			});

			if (res.ok) {
				setUser(null);
				router.push(`/`);
			}
		} catch (error) {
			console.error('🚀 -> file: AuthContext.js -> line 53 -> logout -> error', error);
		}
	};

	// check if user is logged in
	const checkUserLoggedIn = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/user`);
		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				error,
				register,
				login,
				logout,
				setError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
