import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

const EventItem = ({ event }) => {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						event?.image?.data?.attributes?.formats?.thumbnail.url
							? event.image.data.attributes.formats.thumbnail.url
							: '/images/event-default.png'
					}
					width={170}
					height={100}
				></Image>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(event.date).toLocaleDateString('en-US')} at {event.time}
				</span>
				<h3>{event.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${event.slug}`}>
					<a className='btn'>Details</a>
				</Link>
			</div>
		</div>
	);
};

export default EventItem;
