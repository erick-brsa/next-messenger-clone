import getCurrentUser from '@/lib/getCurrentUser';
import prisma from '@/lib/prismadb';

export const getConversations = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser?.id) {
		return [];
	}
	try {
		const conversations = await prisma.conversation.findMany({
			orderBy: {
				lastMessageAt: 'desc'
			},
			where: {
				userIds: {
					has: currentUser.id
				}
			},
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true
					}
				}
			}
		});
		return conversations;
	} catch (error) {
		return [];
	}
};

export const getConversationById = async (conversationId: string) => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.email) {
			return null;
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId
			},
			include: {
				users: true
			}
		});
		return conversation;
	} catch (error) {
		return null;
	}
};
