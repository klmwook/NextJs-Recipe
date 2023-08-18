import Head from 'next/head';
import axios from 'axios';

export default function Home({ meals, category }) {
	//idMeal
	//strMeal
	//strMealThumb
	console.log(category);
	console.log(meals);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>
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
