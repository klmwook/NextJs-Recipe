import styles from './Visual.module.scss';
import clsx from 'clsx';
import Image from 'next/image';

export function Visual({ imgSrc, style, imgTxt, children, className, priority = false }) {
	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority={priority} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />

			{/* 컴포넌트 호출 시 전달되는 props 유무에 따라서 반환하는 JSX 분기처리  */}
			{imgTxt && <h2>{imgTxt}</h2>}
			{children && children}
		</div>
	);
}
