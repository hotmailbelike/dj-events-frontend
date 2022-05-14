import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/config';

const EventsPage = ({ events }) => {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No Event to show</h3>}

			{events.map((event) => (
				<EventItem key={event.id} event={event}></EventItem>
			))}
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	return {
		props: { events: events.slice(0, 3) },
	};
};

// export const getStaticProps = async () => {
// 	const res = await fetch(`${API_URL}/api/events`);
// 	const events = await res.json();

// 	return {
// 		props: { events },
// 		revalidate: 1, // recall the api if the data has changed every 1 second
// 	};
// };

export default EventsPage;
