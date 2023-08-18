import Layout from '@/components/templete/Layout';
import '@/styles/globals.scss';
import axios from 'axios';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
