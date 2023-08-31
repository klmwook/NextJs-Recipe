import Layout from '@/components/templete/Layout/Layout';
import '@/styles/globals.scss';
import '@/styles/theme.scss';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';

import { keepStyle } from '@/ilbs/keepStyle';
import { GlobalProvider } from '@/hooks/useGlobalContext';

keepStyle(2000);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	const router = useRouter();
	return (
		<GlobalProvider>
			<QueryClientProvider client={queryClient}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</GlobalProvider>
	);
}
