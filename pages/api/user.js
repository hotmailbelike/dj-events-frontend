import { API_URL } from '@/config/config';
import cookie from 'cookie';

export default async (req, res) => {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			return res.status(403).json({ error: 'Not Authorized' });
		}
		const { token } = cookie.parse(req.headers.cookie);

		const strapiRes = await fetch(`${API_URL}/api/users/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const user = await strapiRes.json();

		if (strapiRes.ok) {
			res.status(200).json({ user });
		} else {
			res.status(403).json({ error: 'User Forbidden' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ error: `Method ${req.method} not allowed` });
	}
};
