import { ReactNode } from 'react';

interface InputWrapperInterface {
	children: ReactNode;
	sidebarChildren?: ReactNode;
	errorMessage?: string;
	label: string;
}

export const InputWrapper = ({ label, errorMessage, children, sidebarChildren }: InputWrapperInterface) => (
	<>
		<div className="row g-1 g-md-2">
			<label className="col-12 col-md-3 text-md-end form-label m-0 mt-md-2" htmlFor="accountType">
				{label}
			</label>

			<div className="col-12 col-md-9 m-0">
				{sidebarChildren ? (
					<div className="row m-0">
						<div className="col-4 m-0 p-0">{children}</div>
						<div className="col-8 m-0 mt-2 pl-2 pr-0">{sidebarChildren}</div>
					</div>
				) : (
					children
				)}

				{errorMessage && <span className="col-12 text-danger">{errorMessage}</span>}
			</div>
		</div>
	</>
);
