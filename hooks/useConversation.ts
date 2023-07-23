import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useConversation = () => {
	const params = useParams();

	const conversationId: string = useMemo(() => {
		if (!params?.id) {
			return '';
		}
		return params.id as string;
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
