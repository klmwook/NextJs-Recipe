import { Pic } from '@/components/atoms/pic/Pic';
import styles from './Silder.module.scss';
import clsx from 'clsx';

function Silder({ data, index }) {
	return (
		<article className={clsx(styles.slider)}>
			{data.map((el, idx) => (
				<Pic key={el.idMeal} imgSrc={el.strMealThumb} className={clsx(idx === index ? styles.on : '')} />
			))}
		</article>
	);
}

export default Silder;
