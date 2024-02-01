import styled from 'styled-components';

export const StyledFormContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 1rem;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		padding: 2rem 1rem;
	}

	> * {
		width: 100%;
		max-width: 62.5rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
			gap: 1.5rem;
		}
	}
`;

export const SubmitButton = styled.button`
	margin-left: auto;
`;
