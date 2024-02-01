import { AxiosError } from 'axios';

export const setupInterceptorsTo = (axios: any) => {
	axios.interceptors.request.use(
		(req: any) => {
			if (req.url.includes(process.env.REACT_APP_API)) {
				req.headers.Accept = 'application/json';

				if (req?.headers?.lang) {
					req.headers['Accept-Language'] = req?.headers?.lang;
				}
			}

			return req;
		},
		(err: AxiosError) => Promise.reject(err),
	);
};
