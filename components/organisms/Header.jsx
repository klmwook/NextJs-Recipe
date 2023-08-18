import clsx from 'clsx';
import styles from './Header.module.scss';
import Title from '../atoms/text/Title';
import Navbar from '../molecules/Navbar';

function Header() {
	return (
		<header className={clsx(styles.header)}>
			<Title url={'/'} type={'logo'}>
				Decode
			</Title>
			<Navbar names={['Find Recipe', 'My Favorite']} gap={20} />
		</header>
	);
}

export default Header;
