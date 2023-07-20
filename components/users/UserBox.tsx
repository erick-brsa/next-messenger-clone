'use client';

import { FC, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import axios from 'axios';

import Avatar from '../ui/Avatar';
import LoadingModal from '../LoadingModal';

interface UserBoxProps {
	user: User;
}

const UserBox: FC<UserBoxProps> = ({ user }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(() => {
		setIsLoading(true);
		axios
			.post('/api/messages', {
				userId: user.id
			})
			.then(({ data }) => {
				router.push(`/messages/${data.id}`);
			})
			.finally(() => setIsLoading(false));
	}, [router, user]);

	return (
		<>
		{isLoading && (
			<LoadingModal />
		)}
			<div
				onClick={handleClick}
				className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
			>
				<Avatar user={user} />
				<div className="min-w-0 flex-1">
					<div className="focus:outline-none">
						{/* <span className="absolute inset-0"></span> */}
						<div className="flex justify-between items-center mb-1">
							<p className="text-sm font-medium text-gray-900">
								{user.name}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserBox;
