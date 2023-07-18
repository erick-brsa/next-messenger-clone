'use client';

import { FC, useState } from 'react';
import { User } from '@prisma/client';

import Avatar from '@/components/ui/Avatar';
import DesktopItem from './DesktopItem';
import { useRoutes } from '@/hooks';
import SettingsModal from '@/components/modals/SettingsModal';

interface DesktopSidebarProps {
	user: User;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ user }) => {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<SettingsModal
				user={user}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
				<nav className="mt-4 flex flex-col justify-between">
					<ul
						role="list"
						className="flex flex-col items-center space-y-1"
					>
						{routes.map(item => (
							<DesktopItem
								key={item.href}
								href={item.href}
								label={item.label}
								icon={item.icon}
								active={item.active}
								onClick={item.onClick}
							/>
						))}
					</ul>
				</nav>
				<nav
					className="mt-4 flex flex-col justify-between items-center"
					onClick={() => setIsOpen(true)}
				>
					<div className="cursor-pointer hover:opacity-75 transition">
						<Avatar user={user} />
					</div>
				</nav>
			</div>
		</>
	);
};

export default DesktopSidebar;
