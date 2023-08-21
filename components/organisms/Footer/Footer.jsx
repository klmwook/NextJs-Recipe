import { Title } from '@/components/atoms/text/Title';
import Text from '@/components/atoms/text/Text';
import clsx from 'clsx';
import styles from './Footer.module.scss';

function Footer() {
	return (
		<footer className={clsx(styles.footer)}>
			<Title style={{ fontSize: 20, color: '#777' }}>DCODELAB</Title>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rightsreserved.
			</Text>
		</footer>
	);
}

export default Footer;
