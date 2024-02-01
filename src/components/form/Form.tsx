import { useForm, SubmitHandler, Controller } from 'react-hook-form';

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
		<div>
			<h2>Form</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="accountType">Account Type:</label>
					<Controller
						name="accountType"
						control={control}
						defaultValue=""
						rules={{ required: 'Account Type is required' }}
						render={({ field }) => (
							<select {...field} id="accountType">
								<option value="" disabled hidden>
									Select Account Type
								</option>
								<option value="Advanced">Advanced</option>
								<option value="Manual">Manual</option>
							</select>
						)}
					/>
					{errors.accountType && <span>{errors.accountType.message}</span>}
				</div>
				<div>
					<label htmlFor="userName">User Name (Email):</label>
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
						render={({ field }) => <input {...field} type="email" id="userName" placeholder="name@example.com" />}
					/>
					{errors.userName && <span>{errors.userName.message}</span>}
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<Controller
						name="password"
						control={control}
						rules={{
							required: 'Password is required',
						}}
						render={({ field }) => <input type="password" {...field} id="password" placeholder="Required" />}
					/>
					{errors.password && <span>{errors.password.message}</span>}
				</div>
				<div>
					<label htmlFor="serverAddress">Server Address:</label>
					<Controller
						name="serverAddress"
						control={control}
						rules={{
							pattern: {
								value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
								message: 'Invalid URL format',
							},
						}}
						render={({ field }) => <input {...field} id="serverAddress" placeholder="https://example.com" />}
					/>
					{errors.serverAddress && <span>{errors.serverAddress.message}</span>}
				</div>

				{accountType === 'Advanced' && (
					<>
						<div>
							<label htmlFor="serverPath">Server Path:</label>
							<Controller
								name="serverPath"
								control={control}
								render={({ field }) => <input {...field} id="serverPath" placeholder="/calendars/user/" />}
							/>
							{errors.serverPath && <span>Invalid Server Path</span>}
						</div>
						<div>
							<label htmlFor="port">Port (1-65535):</label>
							<Controller
								name="port"
								control={control}
								rules={{
									required: 'Port is required',
									validate: (value: any) => {
										const portNumber = parseInt(value, 10);
										return (portNumber && portNumber >= 1 && portNumber <= 65535) || 'Invalid port number';
									},
								}}
								render={({ field }) => <input {...field} type="number" id="port" />}
							/>
							{errors.port && <span>{errors.port.message}</span>}
						</div>
						<div>
							<label htmlFor="useSSL">Use SSL:</label>
							<Controller
								name="useSSL"
								control={control}
								render={({ field }) => <input {...field} type="checkbox" id="useSSL" value="on" />}
							/>
						</div>
					</>
				)}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Form;
