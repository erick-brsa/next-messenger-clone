import { ReactNode } from 'react';

import ConversationList from '@/components/conversations/ConversationList';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import { getConversations } from '@/database/dbConversations';
import { getUsers } from '@/database';

export default async function ConversationsLayout({
	children
}: {
	children: ReactNode;
}) {
	const conversations = await getConversations();
	const users = await getUsers();
	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList 
				users={users}
				initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}
