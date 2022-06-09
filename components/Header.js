import Link from 'next/link';
import { useContext } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import AuthContext from '@/context/AuthContext';
import Search from './Search';
import styles from '@/styles/Header.module.css';

const Header = () => {
	const { user, logout } = useContext(AuthContext);

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href={'/'}>
					<a>DJ Events</a>
				</Link>
			</div>
			<Search></Search>
			<nav>
				<ul>
					<li>
						<Link href={'/events'}>
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						<>
							<li>
								<Link href={'/events/add'}>
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<Link href={'/account/dashboard'}>
									<a>Dashboard</a>
								</Link>
							</li>
							<li>
								<button onClick={logout} className='btn-secondary btn-icon'>
									<FaSignOutAlt></FaSignOutAlt> Logout
								</button>
							</li>
						</>
					) : (
						<li>
							<Link href={'/account/login'}>
								<a className='btn-secondary btn-icon'>
									<FaSignInAlt></FaSignInAlt> Login
								</a>
							</Link>
						</li>
					)}

					{/* <li>
						<Link href={'/events/add'}>
							<a>Add Event</a>
						</Link>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
