import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import styles from './favorite.module.scss';
import { useRecipeById, useRecipesByIds } from '@/hooks/useRecipe';
import { useEffect, useState } from 'react';

function Favorite() {
	const [SavedId, setSavedId] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('savedRecipe')) {
			setSavedId(JSON.parse(localStorage.getItem('savedRecipe')));
		} else {
			JSON.stringify(localStorage.setItem('savedRecipe', []));
		}
	}, []);

	// useEffect(() => {
	// 	console.log(SavedId);
	// }, [SavedId]);

	//복수개의 쿼리 요청 결과값을 반환하는 커스텀 훅 호출
	useRecipesByIds(SavedId);

	return (
		<>
			<Head>
				<title>Favorite Page</title>
			</Head>

			<section className={clsx(styles.favoritePage)}>
				<Title type={'slogan'}>My Favorite Recipe</Title>
			</section>
		</>
	);
}

export default Favorite;
