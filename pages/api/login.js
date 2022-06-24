import { API_URL } from '@/config/config';
import cookie from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		const { identifier, password } = req.body;

		const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ identifier, password }),
		});

		const data = await strapiRes.json();

		if (strapiRes.ok) {
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 60 * 60 * 24 * 7,
					sameSite: 'strict',
					path: '/',
				})
			);
			res.status(200).json({ user: data.user });
		} else {
			res.status(data.error.status).json({ error: data.error.message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ error: `Method ${req.method} not allowed` });
	}
};
