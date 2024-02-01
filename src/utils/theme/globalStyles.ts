import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${css`
		*,
		*::after,
		*::before {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
		}

		body,
		html {
			font-family: ${({ theme }) => theme.font};
			font-weight: ${({ theme }) => theme.fontWeight.regular};
		}

		#root {
			min-height: 100vh;
		}

		a {
			text-decoration: none;
			color: ${({ theme }) => theme.primary};
		}

		button {
			cursor: pointer;
			font-family: ${({ theme }) => theme.font}!important;
			border: unset;
			background: none;

			:disabled {
				cursor: not-allowed;
			}
		}
	`}
`;
