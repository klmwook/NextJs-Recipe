import clsx from 'clsx';
import styles from './Navbar.module.scss';
import { Text } from '../../atoms/text/Text';
import { useRouter } from 'next/router';

function Navbar({ names, gap }) {
	const router = useRouter();

	return (
		<nav className={clsx(styles.gnb)} style={{ gap: gap }}>
			{names.map((el) => {
				const url = el.toLowerCase().split(' ').join('-');

				console.log(`${router.asPath.split('/')[1]} |||||| ${url}`);

				if (router.asPath.split('/')[1] === url) {
					return (
						<Text key={url} isOn={true} type={'menu'} tag={'span'}>
							{el}
						</Text>
					);
				} else {
					return (
						<Text key={url} url={`/${url}`} type={'menu'} tag={'span'}>
							{el}
						</Text>
					);
				}
			})}
		</nav>
	);
}

export default Navbar;
