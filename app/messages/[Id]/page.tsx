import { getConversationById } from '@/database/dbConversations';
import { getMessages } from '@/database/dbMessages';
import EmptyState from '@/components/EmptyState';

import Header from '@/components/conversations/Header';
import Body from '@/components/conversations/Body';
import Form from '@/components/conversations/Form';

interface IParams {
	id: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
	const conversation = await getConversationById(params.id);
	const messages = await getMessages(params.id);
	if (!conversation) {
		return (
			<div className="lg:pl-80  h-full">
				<div className="h-full flex flex-col">
					<EmptyState />
				</div>
			</div>
		);
	}
	return (
		<div className="lg:pl-80 h-full">
			<div className="h-full flex flex-col">
				<Header conversation={conversation} />
				<Body initialMessages={messages} />
				<Form />
			</div>
		</div>
	);
};

export default ConversationId;
