import Sidebar from '@/components/ui/sidebar/Sidebar';
import { ReactNode } from 'react';

export default function UsersLayout({ 
    children 
}: {
    children: ReactNode 
}) {
	return (
		<Sidebar>
			<div className="h-full">
                {children}
            </div>
		</Sidebar>
	);
}
