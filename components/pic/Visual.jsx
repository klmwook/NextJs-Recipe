import styles from './Visual.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

function Visual({ imgSrc, style }) {
	return (
		<div className={clsx(styles.pic)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
		</div>
	);
}

export default Visual;
