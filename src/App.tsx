import { ErrorBoundary } from 'react-error-boundary';
import Form from 'components/form/Form';

const App = () => (
	<div>
		<ErrorBoundary FallbackComponent={() => null}>
			<Form />
		</ErrorBoundary>
	</div>
);

export default App;
