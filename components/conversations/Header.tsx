'use client';

import { Conversation, User } from '@prisma/client';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { FC, useMemo, useState } from 'react';
import Link from 'next/link';

import { useActiveList, useOtherUser } from '@/hooks';
import Avatar from '../ui/Avatar';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '../ui/AvatarGroup';

interface HeaderProps {
	conversation: Conversation & {
		users: User[];
	};
}

const Header: FC<HeaderProps> = ({ conversation }) => {
	const otherUser = useOtherUser(conversation);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const { members } = useActiveList();
	const isActive = members.indexOf(otherUser?.email!) !== -1;

	const statusText = useMemo(() => {
		if (conversation.isGroup) {
			return `${conversation.users.length} members`;
		}
		return isActive ? 'Active' : 'Offline';
	}, [conversation.isGroup, conversation.users.length, isActive]);

	return (
		<>
			<ProfileDrawer
				data={conversation}
				isOpen={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			/>
			<div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
				<div className="flex gap-3 items-center">
					<Link
						href="/messages"
						className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
					>
						<HiChevronLeft size={32} />
					</Link>

					{conversation.isGroup ? (
						<AvatarGroup users={conversation.users} />
					) : (
						<Avatar user={otherUser} />
					)}

					<div className="flex flex-col">
						<div className="">
							{conversation.name || otherUser.name}
						</div>
						<div className="text-sm font-light text-neutral-500">
							{statusText}
						</div>
					</div>
				</div>
				<HiEllipsisHorizontal
					size={32}
					onClick={() => setDrawerOpen(true)}
					className="text-sky-500 hover:text-sky-500 cursor-pointer transition"
				/>
			</div>
		</>
	);
};

export default Header;
