import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// ELEMENTS
import { InputWrapper } from 'components/form/elements';

// STYLES
import { StyledFormContainer, SubmitButton } from 'components/form/Styles';

interface FormValues {
	accountType: string;
	userName: string;
	password: string;
	serverAddress: string;
	serverPath: string;
	port: number;
	useSSL: boolean;
}

const Form = () => {
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>();
	const accountType = watch('accountType');

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		// Log the payload as JSON
		console.log(JSON.stringify(data)); // eslint-disable-line

		// Show an alert with the payload
		alert(`Form Data:\n${JSON.stringify(data, null, 2)}`); // eslint-disable-line
	};

	return (
		<StyledFormContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* accountType */}
				<InputWrapper label="Account Type:" errorMessage={errors?.accountType?.message}>
					<Controller
						name="accountType"
						control={control}
						defaultValue=""
						rules={{ required: 'Account Type is required' }}
						render={({ field }) => (
							<select className="form-select" {...field} id="accountType">
								<option value="" disabled hidden>
									Select Account Type
								</option>
								<option value="Advanced">Advanced</option>
								<option value="Manual">Manual</option>
							</select>
						)}
					/>
				</InputWrapper>

				{/* userName */}
				<InputWrapper label="User Name:" errorMessage={errors?.userName?.message}>
					<Controller
						name="userName"
						control={control}
						rules={{
							required: 'User Name is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Invalid email address',
							},
						}}
						render={({ field }) => (
							<input {...field} type="email" id="userName" placeholder="name@example.com" className="form-control" />
						)}
					/>
				</InputWrapper>

				{/* password */}
				<InputWrapper label="Password:" errorMessage={errors?.password?.message}>
					<Controller
						name="password"
						control={control}
						rules={{
							required: 'Password is required',
						}}
						render={({ field }) => (
							<input type="password" {...field} id="password" placeholder="Required" className="form-control" />
						)}
					/>
				</InputWrapper>

				{/* serverAddress */}
				<InputWrapper label="Server Address:" errorMessage={errors?.serverAddress?.message}>
					<Controller
						name="serverAddress"
						control={control}
						rules={{
							pattern: {
								value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
								message: 'Invalid URL format',
							},
						}}
						render={({ field }) => (
							<input {...field} id="serverAddress" placeholder="https://example.com" className="form-control" />
						)}
					/>
				</InputWrapper>

				{accountType === 'Advanced' && (
					<>
						{/* serverAddress */}
						<InputWrapper label="Server Path:" errorMessage={errors?.serverPath?.message}>
							<Controller
								name="serverPath"
								control={control}
								render={({ field }) => (
									<input {...field} id="serverPath" placeholder="/calendars/user/" className="form-control" />
								)}
							/>
						</InputWrapper>

						{/* port */}
						<InputWrapper
							label="Port (1-65535):"
							errorMessage={errors?.serverPath?.message}
							sidebarChildren={
								// useSSL
								<Controller
									name="useSSL"
									control={control}
									render={({ field }) => (
										<div className="form-check">
											<input {...field} className="form-check-input" type="checkbox" value="" id="useSSL" />
											<label className="form-check-label" htmlFor="useSSL">
												Use SSL {errors?.useSSL && <span className="col-12 text-danger">{errors?.serverPath?.message}</span>}
											</label>
										</div>
									)}
								/>
							}
						>
							<Controller
								name="port"
								control={control}
								defaultValue={1}
								rules={{
									validate: (value: any) => {
										const portNumber = parseInt(value, 10);
										return (portNumber && portNumber >= 1 && portNumber <= 65535) || 'Invalid port number';
									},
								}}
								render={({ field }) => <input {...field} type="number" id="port" className="form-control" />}
							/>
						</InputWrapper>
					</>
				)}

				<SubmitButton type="submit" className="btn btn-primary">
					Submit
				</SubmitButton>
			</form>
		</StyledFormContainer>
	);
};

export default Form;
