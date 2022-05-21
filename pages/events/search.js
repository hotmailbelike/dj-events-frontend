import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/config';

const SearchPage = ({ events }) => {
	const router = useRouter();

	return (
		<Layout title={'Search Results'}>
			<Link href={'/events'}>Go Back</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No Events found</h3>}

			{events.map((event) => (
				<EventItem key={event.id} event={event.attributes}></EventItem>
			))}
		</Layout>
	);
};

export const getServerSideProps = async ({ query: { term } }) => {
	const query = qs.stringify({
		filters: {
			$or: [
				{
					name: {
						$containsi: term,
					},
				},
				{
					performers: {
						$containsi: term,
					},
				},
				{
					description: {
						$containsi: term,
					},
				},
				{
					venue: {
						$containsi: term,
					},
				},
			],
		},
		sort: ['date:asc'],
		populate: '*',
	});

	const res = await fetch(`${API_URL}/api/events?${query}`);
	const events = await res.json();

	return {
		props: { events: events.data },
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

export default SearchPage;
