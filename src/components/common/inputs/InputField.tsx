export const InputField = ({
	label,
	id,
	type,
	error,
	register,
}: {
	label: string;
	id: string;
	type: string;
	error: any;
	register: any;
}) => (
	<div>
		<label htmlFor={id} className="input-label">{label}</label>
		<input
			id={id}
			type={type}
			{...register}
			className={`input input-box-shadow ${error ? '!outline-red-600' : ''}`}
			placeholder="Enter"
		/>
		{error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
	</div>
);