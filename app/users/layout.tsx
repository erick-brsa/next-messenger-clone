import { ReactNode } from 'react';

import Sidebar from '@/components/ui/sidebar/Sidebar';
import UserList from '@/components/users/UserList';
import { getUsers } from '@/database';

export default async function UsersLayout({
	children
}: {
	children: ReactNode;
}) {
	const users = await getUsers();
	return (
		<Sidebar>
			<div className="h-full">
				<UserList users={users!} />
				{children}
			</div>
		</Sidebar>
	);
}
