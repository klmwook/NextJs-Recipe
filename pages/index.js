import Head from 'next/head';
import styles from './Home.module.scss';
import clsx from 'clsx';

export default function Home() {
	return (
		<>
			<Head>
				<title>Next Recipe</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={clsx(styles.main)}>
				<h1>Main Page</h1>
			</main>
		</>
	);
}
