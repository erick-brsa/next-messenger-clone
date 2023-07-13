import { ReactNode } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileBottombar from './MobileBottombar';
import getCurrentUser from '@/lib/getCurrentUser';

const Sidebar = async ({ children }: { children: ReactNode }) => {
	const user = await getCurrentUser();
	return (
		<div className="h-full">
			<DesktopSidebar user={user!} />
			<MobileBottombar user={user!} />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
};

export default Sidebar;
