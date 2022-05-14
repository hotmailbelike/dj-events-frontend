import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/config';

const HomePage = ({ events }) => {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No Event to show</h3>}

			{events.map((event) => (
				<EventItem key={event.id} event={event}></EventItem>
			))}

			{events.length > 0 && (
				<Link href='/events'>
					<a className='btn-secondary'>View All Events</a>
				</Link>
			)}
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	return {
		props: { events },
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

export default HomePage;
