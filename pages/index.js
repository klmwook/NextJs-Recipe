import Head from 'next/head';
import styles from './Home.module.scss';
import clsx from 'clsx';
import axios from 'axios';
import { Pic } from '@/components/atoms/pic/Pic';
import Title from '@/components/atoms/text/Title';
import Text from '@/components/atoms/text/Text';

export default function Home({ meals }) {
	return (
		<>
			<Head>
				<title>Next Recipe</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={clsx(styles.main)}>
				<div className={clsx(styles.picFrame)}>
					<Pic imgSrc={meals[0].strMealThumb} />
				</div>
			</main>
		</>
	);
}

export async function getStaticProps() {
	//props로 데이터 넘길때에는 data안쪽의 값까지 뽑아낸다음에 전달
	const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
	console.log('data fetching on Server', data);

	return {
		props: data,
		revalidate: 60 * 60 * 24,
	};
}
