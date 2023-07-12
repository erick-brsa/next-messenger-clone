'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	disabled?: boolean;
	errors: FieldErrors;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
}

const Input: FC<InputProps> = ({
	label,
	id,
	type = 'text',
	placeholder,
	required = false,
	disabled = false,
	errors,
	register
}) => {
	return (
		<div className="">
			<label
				htmlFor={id}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="mt-2">
				<input
					id={id}
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					{...register(id, { required })}
					autoComplete={id}
					className={clsx(
						`form-input block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
						errors[id] && 'focus:ring-rose-500',
						disabled && 'opacity-50 cursor-default'
					)}
					// value={''}
				/>
			</div>
		</div>
	);
};

export default Input;
