import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import { Text } from '@/components/atoms/text/Text';
import clsx from 'clsx';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';

export default function Recipe({ categories }) {
	//Selected, Search 값이 변경되면 컴포넌트는 재호출되며 자동으로 react-query훅이 해당 state 값을 인수로 전달해서 자동 데이터 fetching 처리
	//미리 지정한 stale, cache가 남아있으면 데이터를 refetching하지 않음
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Selected_Now, setSelected_Now] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');

	//이벤트가 단기간에 너무 많은 요청이 들어가는 것을 방지하기 위해서 위 2개 state 값을 debounce 처리해서 핸들러 호출횟수를 줄임
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	//debounce되는 값이 변경될때에만 react-query 훅이 호출 됨
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected, DebouncedSearch);

	//카테고리 버튼을 클릭할 때 실행되는 함수
	//Selected값이 변경되고 새롭게 쿼리 요청을 보내는 조건이 Search 값이 비어있어야 가능하므로
	//일단 Search 값을 비워놓고 State 변경요청보내는 함수
	const handleClickCategory = (state) => {
		setSearch('');
		setSelected(state);
		setSelected_Now(state);
	};

	useEffect(() => {
		//디바운싱되는 search, selected 값이 변경이 될 때 마다 실행되는 useEffect
		//Search값이 있다면 기존의 카테고리 값을 비워야되므로 setSelected 빈 문자값을 쿼리 보내서 빈배열을 다시 반환, 결과적으로 해당 데이터는 화면에서 사라짐
		if (DebouncedSearch) {
			setSelected('');
			//search값이 없이면 다시 Search를 초기화시킨 다음에
			//Selected 값을 변경해서 새로 쿼리 요청을 보냄
		} else {
			//처음 마운트가 되서 검색어가 없거나 사용자가 일부러 검색어를 비운 경우
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
				{/* 카테고리 버튼 클릭할때마다 실행할 핸들러 함수를 onClick props으로 전달 */}
				<Category items={categories} onClick={handleClickCategory} active={DebouncedSelected} />

				{/* 현재 출력되는 값에 따라 제목 변경 */}
				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected ? DebouncedSelected : `Result: ${DebouncedSearch}`}
				</Title>

				{/* 검색창에 onChange가 발생할 때 마다 실행할 함수를 onChange props로 전달, value값도 같이 전달 */}
				<SearchBar inputType={'text'} isBtn={false} placeholder={'search'} value={Search} onChange={setSearch} />

				<div className={clsx(styles.listFrame)}>
					{/* Search데이터가 있을 때 */}
					{isSearch && dataBySearch.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={el.strMeal} className={clsx(styles.card)} />)}
					{/* Category 데이터가 있을 때 */}
					{isCategory && dataByCategory.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={el.strMeal} className={clsx(styles.card)} />)}
					{/* Category가 없고, Search가 있고, Search 배열 값이 0일 때 */}
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
	const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');

	return {
		props: { categories: data.categories },
	};
}
