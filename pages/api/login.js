import { API_URL } from '@/config/config';

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
			res.status(200).json({ user: data.user });
		} else {
			res.status(data.error.status).json({ message: data.error.message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
