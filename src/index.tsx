import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import axios from 'axios';

// ==============
// --> STYLES <--
// ==============
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'utils/theme/globalStyles';
import theme from 'utils/theme/themeDefault';

// CONFIG
import { setupInterceptorsTo } from 'config/axiosConfig';

// MAIN
import App from 'App';
import reportWebVitals from 'reportWebVitals';

setupInterceptorsTo(axios);

const container = document.getElementById('root');
const root = createRoot(container!); // non-null (!) assertion

const SuspensePending = () => <span>...pending</span>;

root.render(
	<ErrorBoundary FallbackComponent={() => null}>
		<ThemeProvider theme={theme}>
			<GlobalStyles />

			<Suspense fallback={<SuspensePending />}>
				<App />
			</Suspense>
		</ThemeProvider>
	</ErrorBoundary>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
