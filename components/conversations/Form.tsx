'use client';

import axios from 'axios';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';

import { useConversation } from '@/hooks';
import { MessageInput } from './MessageInput';

const Form = () => {
	const { conversationId } = useConversation();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			message: ''
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setValue('message', '', { shouldValidate: true });
		axios.post('/api/messages/new', {
			...data,
			conversationId
		});
	};

	const handleUpload=(result: any) => {
		axios.post('/api/messages/new', {
			image: result?.info?.secure_url,
			conversationId
		})
	}

	return (
		<div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
			<CldUploadButton
				options={{ maxFiles: 1}} 
				onUpload={handleUpload}
				uploadPreset='vavfjkci'
			>
				<HiPhoto size={30} className="text-sky-500" />
			</CldUploadButton>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center gap-2 lg:gap-4 w-full"
			>
				<MessageInput
					id="message"
					register={register}
					errors={errors}
					required
					placeholder="Write a message"
				/>
				<button
					type="submit"
					className="rounded-full p-2 bg-sky-500 hover:bg-sky-600 transition"
				>
					<HiPaperAirplane  size={18} className='text-white' />
				</button>
			</form>
		</div>
	);
};

export default Form;
