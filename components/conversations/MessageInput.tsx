'use client';

import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Input from '../ui/inputs/Input';

interface MessageInputProps {
	id: string;
	type?: string;
	errors: FieldErrors;
	required?: boolean;
	placeholder?: string;
	register: UseFormRegister<FieldValues>;
}

export const MessageInput: FC<MessageInputProps> = ({
	id,
	type,
	errors,
	required,
	placeholder,
	register
}) => {
	return (
		<div className="relative w-full">
			<input
                id={id}
                type={type}
                required={required}
                placeholder={placeholder}
                {...register(id, { required })}
                className="text-black font-light py-2 px-4 bg-neutral-100 rounded-full focus: outline-none w-full"
			/>
            
		</div>
	);
};
