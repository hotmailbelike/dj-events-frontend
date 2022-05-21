import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import Layout from '@/components/Layout';
import { API_URL } from '@/config/config';
import styles from '@/styles/Event.module.css';

const EventPage = ({ event }) => {
	event = { id: event.id, ...event.attributes };

	const deleteEvent = () => {
		console.log('Delete function called');
	};

	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${event.id}`}>
						<a>
							<FaPencilAlt></FaPencilAlt> Edit Event
						</a>
					</Link>
					<a href='#' className={styles.delete} onClick={deleteEvent}>
						<FaTimes></FaTimes> Delete Event
					</a>
				</div>

				<span>
					{new Date(event.date).toLocaleDateString('en-UK')} at {event.time}
				</span>
				<h1>{event.name}</h1>
				{event.image && (
					<div className={styles.image}>
						<Image
							src={event.image.data.attributes.formats.medium.url}
							width={960}
							height={600}
						></Image>
					</div>
				)}

				<h3>Performers:</h3>
				<p>{event.performers}</p>
				<h3>Description:</h3>
				<p>{event.description}</p>
				<h3>Venue: {event.venue}</h3>
				<p>{event.address}</p>

				<Link href={'/events'}>
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
};

export const getStaticPaths = async () => {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	const paths = events.data.map((event) => ({ params: { slug: event.attributes.slug } }));

	return {
		paths,
		// fallback: false, //show 404 is the path is not found, recommended for a static website
		fallback: true, // keep looking for the path even if it is not generated
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`);
	const events = await res.json();

	return {
		props: { event: events.data[0] },
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
