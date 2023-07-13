'use client';

import { FC } from 'react';
import { User } from '@prisma/client';

import { useConversation, useRoutes } from '@/hooks';
import MobileItem from './MobileItem';

interface MobileBottomBarProps {
	user: User;
}

const MobileSidebar: FC<MobileBottomBarProps> = ({ user }) => {
	const routes = useRoutes();
	const { isOpen } = useConversation();

	if (isOpen) {
		return null;
	}

	return (
		<div className="fixed justify-between w-full bottom-0 x-40 flex items-center bg-white border-t-[1px] lg:hidden">
			{routes.map(route => (
				<MobileItem
					key={route.href}
					label={route.label}
					href={route.href}
					active={route.active}
					icon={route.icon}
					onClick={route.onClick}
				/>
			))}
		</div>
	);
};

export default MobileSidebar;
