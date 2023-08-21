import Head from 'next/head';
import axios from 'axios';
import Swiper from '@/components/organisms/Swiper/Swiper';

export default function Home({ meals, category }) {
	const recipe = meals.slice(0, 6);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<Swiper recipe={recipe} category={category} />
			{/* 
				Swiper 컴포넌트 작업 계획
					1. Visual - Organism
					2. Swiper-wrapper - molecules
					3. Swier-slide - atom
					4. ImgList - molecules
					5. ImgSlide - atom
					6. Controls - molecures
					7. Counter - molecules
					8. Button - atom 
			*/}
		</>
	);
}

export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
	const items = obj.categories;
	items.forEach((el) => list.push(el.strCategory));
	const newList = list.filter((el) => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');

	const randomNum = Math.floor(Math.random() * newList.length);

	const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${newList[randomNum]}`);

	// const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
	// console.log('data fetching on Server', data);

	return {
		props: { ...data, category: newList[randomNum] },
		revalidate: 10,
	};
}
