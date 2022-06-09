import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

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
			} else {
				setError(data.message);
				// setError(null);
			}
		} catch (error) {
			console.error('🚀 -> file: AuthContext.js -> line 24 -> login -> error', error);
		}
	};

	// logout user
	const logout = async (req, res) => {
		console.log('logout');
	};

	// check if user is logged in
	const checkUserLoggedIn = async (user) => {
		console.log('🚀 -> file: AuthContext.js -> line 39 -> AuthProvider -> user', user);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				error,
				register,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
