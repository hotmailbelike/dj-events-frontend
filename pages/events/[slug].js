import Layout from '@/components/Layout';
import { API_URL } from '@/config/config';

const EventPage = ({ event }) => {
	return (
		<Layout>
			<h1>{event.name}</h1>
		</Layout>
	);
};

export const getStaticPaths = async () => {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	const paths = events.map((event) => ({ params: { slug: event.slug } }));

	return {
		paths,
		// fallback: false, //show 404 is the path is not found, recommended for a static website
		fallback: true, // keep looking for the path even if it is not generated
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const res = await fetch(`${API_URL}/api/events/${slug}`);
	const events = await res.json();

	return {
		props: { event: events[0] },
		revalidate: 1,
	};
};

// export const getServerSideProps = async ({ query: { slug } }) => {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`);
// 	const events = await res.json();

// 	return {
// 		props: { event: events[0] },
// 	};
// };

export default EventPage;
