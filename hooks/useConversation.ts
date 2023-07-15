import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useConversation = () => {
	const params = useParams();

	const conversationId = useMemo(() => {
		if (!params?.id) {
			return '';
		}
		return params.id;
	}, [params?.id]);

	const isOpen = useMemo(() => Boolean(conversationId), [conversationId]);
	
	return useMemo(
		() => ({
			isOpen,
			conversationId
		}),
		[isOpen, conversationId]
	);
};
