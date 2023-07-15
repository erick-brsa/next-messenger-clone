import { ReactNode } from 'react';

import ConversationList from '@/components/conversations/ConversationList';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import { getConversations } from '@/database/dbConversations';

export default async function ConversationsLayout({
	children
}: {
	children: ReactNode;
}) {
	const conversations = await getConversations();
	return (
		<Sidebar>
			<div className="h-full">
				<ConversationList initialItems={conversations} />
				{children}
			</div>
		</Sidebar>
	);
}
