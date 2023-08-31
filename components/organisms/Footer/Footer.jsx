import { Title } from '@/components/atoms/text/Title';
import { Text } from '@/components/atoms/text/Text';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/Button/Btn';
import { useGlobalData } from '@/hooks/useGlobalContext';
import { useState } from 'react';

function Footer() {
	const { setTheme } = useGlobalData();
	const [isIdx, setisIdx] = useState(0);

	return (
		<footer className={clsx(styles.footer)}>
			<nav>
				{['Orange', 'Aqua', 'Hotpink'].map((el, idx) => {
					if (isIdx == idx) {
						return (
							<Btn
								key={idx}
								onClick={() => {
									setTheme(`theme${idx + 1}`);
									setisIdx(idx);
								}}
								isActive={true}
							>
								{el}
							</Btn>
						);
					} else {
						return (
							<Btn
								key={idx}
								onClick={() => {
									setTheme(`theme${idx + 1}`);
									setisIdx(idx);
								}}
							>
								{el}
							</Btn>
						);
					}
				})}
			</nav>

			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rightsreserved.
			</Text>
		</footer>
	);
}

export default Footer;
