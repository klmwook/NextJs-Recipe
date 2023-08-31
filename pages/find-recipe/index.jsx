import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import { Text } from '@/components/atoms/text/Text';
import clsx from 'clsx';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';

export default function Recipe({ categories }) {
	//카테고리 컴포넌트에 순수하게 출력해야되는 메뉴명을 배열로 전달해야 되므로
	//서버에서 받아온 데이터에서 strCategory에 해당하는 메뉴값만 배열로 반환해서 참조객체에 담고 컴포넌트에 전달
	const names = useRef([]);
	names.current = categories.map((category) => category.strCategory);

	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Selected_Now, setSelected_Now] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');

	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	const { data: dataBySearch, isSuccess: isSearch } =
		useRecipeBySearch(DebouncedSearch);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(
		DebouncedSelected,
		DebouncedSearch
	);

	const handleClickCategory = (state) => {
		setSearch('');
		setSelected(state);
		setSelected_Now(state);
	};

	useEffect(() => {
		if (DebouncedSearch) {
			setSelected('');
		} else {
			setSearch('');
			!DebouncedSelected && setSelected(Selected_Now);
		}
	}, [DebouncedSearch, DebouncedSelected, Selected_Now]);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<Category
					items={names.current}
					onClick={handleClickCategory}
					active={DebouncedSelected}
				/>

				<article className={clsx(styles.titBox)}>
					<Title
						type={'slogan'}
						className={clsx(styles.titCategory)}
						style={{ color: '#bbb', hoverColor: '#bbb' }}
					>
						{DebouncedSelected
							? DebouncedSelected
							: `Result: ${DebouncedSearch}`}
					</Title>

					<SearchBar
						inputType={'text'}
						isBtn={false}
						placeholder={'search'}
						value={Search}
						onChange={setSearch}
					/>
				</article>

				<div className={clsx(styles.listFrame)}>
					{isSearch &&
						dataBySearch.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}`}
								txt={el.strMeal}
								className={clsx(styles.card)}
							/>
						))}
					{isCategory &&
						dataByCategory.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}?name=${el.strMeal}`}
								txt={el.strMeal}
								className={clsx(styles.card)}
							/>
						))}
					{isSearch && dataBySearch.length === 0 && (
						<Text style={{ fontSize: 22, marginTop: 80, color: 'orange' }}>
							No Result!! <br />
							Try another Recipe Name.
						</Text>
					)}
				</div>
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get(
		'https://www.themealdb.com/api/json/v1/1/categories.php'
	);

	return {
		props: { categories: data.categories },
	};
}
