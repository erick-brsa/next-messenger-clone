'use client';

import { FC, useState } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import Input from '../ui/inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../ui/Button';

interface SettingsOpenProps {
	user: User;
	isOpen: boolean;
	onClose: () => void;
}

const SettingsModal: FC<SettingsOpenProps> = ({ user, isOpen, onClose }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: user.name,
			email: user.email
		}
	});

	const image = watch('image');

	const handleUpload = (result: any) => {
		setValue('image', result?.info?.secure_url, {
			shouldValidate: true
		});
	};

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true);
		axios
			.post('/api/settings', data)
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Profile
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Edit yout public information.
						</p>
						<div className="mt-10 flex flex-col gap-y-8">
							<Input
								id="name"
								type="text"
								label="Name"
								required
								errors={errors}
								register={register}
								disabled={isLoading}
							/>
							<div>
								<label className="block text-sm leading-6 font-medium text-gray-900">
									Photo
								</label>
								<div className="mt-2 flex items-center gap-x-2">
									<Image
										width={48}
										height={48}
										className="rounded-full"
										src={ image || user?.image || '/img/placeholder.jpg' }
										alt="Avatar"
									/>
									<CldUploadButton
										options={{ maxFiles: 1 }}
										onUpload={handleUpload}
										uploadPreset="vavfjkci"
									>
										<Button
											disabled={isLoading}
											secondary
											type="button"
										>
											Change
										</Button>
									</CldUploadButton>
								</div>
							</div>
						</div>
					</div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                            type='button'
                        >
                            Cancel
                        </Button>
                        <Button
                        type='submit'
                            disabled={isLoading}
                        >
                            Save
                        </Button>
                    </div>
				</div>
			</form>
		</Modal>
	);
};

export default SettingsModal;
