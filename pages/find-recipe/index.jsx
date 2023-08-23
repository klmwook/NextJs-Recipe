import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function Recipe({ categories }) {
	// idCategory	// strCategory	// strCategoryDescription	// strCategoryThumb
	const [Selected, setSelected] = useState(categories[0].strCategory);

	//useDebounce는 컴포넌트의 재랜더링 자체를 막는 것이 아닌 특정 State가 변경될때마다 실행되는 무거운 함수의 호출 자체를 Debouncing 하기 위함
	const DebouncedSelected = useDebounce(Selected);
	const { data, isSuccess } = useRecipeByCategory(DebouncedSelected);

	console.log(data);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<nav>
					{/* 이벤트가 발생해야 되는 자식요소에 queryKey로 연동되어 있는 state변경함수를 전달 */}
					{/* 자식 컴포넌트에 이벤트 전달해야 할 때 무조건 이벤트명 props 핸들러함수 전달 : 자식요소에 어떤 이벤트에 어떤 핸들러가 보내지는지 파악하기 위함  */}
					{/* State 변경하는 이벤트 핸들러 함수를 onClick props에 담아서 전달 */}
					<Category items={categories} onClick={setSelected} />
				</nav>
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');

	return {
		props: { categories: data.categories },
	};
}
