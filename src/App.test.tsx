import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TEST text', () => {
	render(<App />);
	const linkElement = screen.getByText(/TEST/i);
	expect(linkElement).toBeInTheDocument();
});
