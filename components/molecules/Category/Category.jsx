import Btn from '@/components/atoms/Button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, style, onClick, active, names }) {
	return (
		<nav className={clsx(styles.category)} style={style}>
			{/* 해당 컴포넌트를 범용적으로 활용하기 위해서 items: 출력될 메뉴 데이터, active:핸들러 함수로 전달해야 되는 활성화 값 */}
			{items.map((el, idx) => (
				<Btn key={idx} onClick={() => onClick(items[idx])} isActive={active === items[idx]}>
					{names ? names[idx] : el}
				</Btn>
			))}
		</nav>
	);
}

export default Category;
