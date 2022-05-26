import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import { API_URL } from '@/config/config';
import styles from '@/styles/Event.module.css';

const EventPage = ({ event }) => {
	event = { id: event.id, ...event.attributes };

	const router = useRouter();

	const deleteEvent = async () => {
		try {
			if (confirm('Are you sure?')) {
				const res = await fetch(`${API_URL}/api/events/${event.id}`, {
					method: 'delete',
				});

				const data = await res.json();

				if (!res.ok) {
					toast.error(data.message);
				} else {
					router.push(`/events `);
				}
			}
		} catch (error) {
			console.error('🚀 -> file: [slug].js -> line 36 -> deleteEvent -> error', error);
		}
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
					<a
						href='#'
						style={{ color: 'red' }}
						className={styles.delete}
						onClick={deleteEvent}
					>
						<FaTimes></FaTimes> Delete Event
					</a>
				</div>

				<span>
					{new Date(event.date).toLocaleDateString('en-US')} at {event.time}
				</span>
				<h1>{event.name}</h1>
				<ToastContainer></ToastContainer>
				{event?.image?.data?.attributes?.formats.medium.url && (
					<div className={styles.image}>
						<Image
							src={event.image.data.attributes.formats.medium.url || ''}
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
	const query = qs.stringify({
		populate: '*',
		filters: {
			slug: {
				$eq: slug,
			},
		},
	});

	const res = await fetch(`${API_URL}/api/events?${query}`);
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
