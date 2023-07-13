import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useConversation = () => {
	const params = useParams();

	const conversationId = useMemo(() => {
		if (!params?.conversationId) {
			return '';
		}
		return params.conversationId;
	}, [params?.conversationId]);

	const isOpen = useMemo(() => Boolean(conversationId), [conversationId]);
	return useMemo(
		() => ({
			isOpen,
			conversationId
		}),
		[isOpen, conversationId]
	);
};