import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/config';

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
		console.log(
			'🚀 -> file: AuthContext.js -> line 21 -> login -> email,password',
			identifier,
			password
		);
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
