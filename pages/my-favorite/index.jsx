import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import styles from './favorite.module.scss';
import { useRecipeById, useRecipesByIds } from '@/hooks/useRecipe';
import { useEffect, useState } from 'react';
import Card from '@/components/molecules/Card/Card';

function Favorite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			setSavedId(JSON.parse(localStorage.getItem('savedRecipe')));
		} else {
			localStorage.setItem('savedRecipe', JSON.stringify([]));
		}
	}, []);

	//복수개의 쿼리 요청 결과값을 반환하는 커스텀 훅 호출
	const result = useRecipesByIds(SavedId);
	console.log(result);

	return (
		<>
			<Head>
				<title>Favorite Page</title>
			</Head>

			<section className={clsx(styles.favoritePage)}>
				<Title type={'slogan'}>My Favorite Recipe</Title>
				{result &&
					result.map(({ data, isSuccess }) => {
						if (isSuccess) {
							return (
								<Card
									key={data.idMeal}
									imgSrc={data.strMealThumb}
									url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
									txt={`${data.strMeal}`}
									className={clsx(styles.card)}
								/>
							);
						}
					})}
			</section>
		</>
	);
}

export default Favorite;
