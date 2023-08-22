import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';

export default function Recipe({ categories }) {
	// idCategory
	// strCategory
	// strCategoryDescription
	// strCategoryThumb
	console.log(categories);
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<nav>
					<Category items={categories} />
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
