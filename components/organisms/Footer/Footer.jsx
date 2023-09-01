import { Title } from '@/components/atoms/text/Title';
import { Text } from '@/components/atoms/text/Text';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/Button/Btn';
import { useGlobalData } from '@/hooks/useGlobalContext';
import { useState } from 'react';
import Category from '@/components/molecules/Category/Category';

function Footer() {
	const { setTheme, Theme } = useGlobalData();
	const [isIdx, setisIdx] = useState(0);

	return (
		<footer className={clsx(styles.footer)}>
			<nav>
				<Category items={['theme1', 'theme2', 'theme3']} names={['Orange', 'Aqua', 'Hot pink']} active={Theme} onClick={setTheme} style={{ marginBottom: 0 }} />
			</nav>

			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rightsreserved.
			</Text>
		</footer>
	);
}

export default Footer;
