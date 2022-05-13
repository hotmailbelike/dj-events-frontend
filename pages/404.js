import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';

const NotFoundPage = () => {
	return (
		<Layout title={'Page Not Found'}>
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle></FaExclamationTriangle> 404
				</h1>
				<h4>Sorry, there is nothing here</h4>
				<Link href={'/'}>Go Back to Home Page</Link>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
