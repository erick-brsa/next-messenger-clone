import getCurrentUser from '@/lib/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

interface IParams {
	id: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.id) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: params.id
			},
			include: {
				users: true
			}
		});

		if (!existingConversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}
		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: params.id,
				userIds: {
					hasSome: [currentUser.id]
				}
			}
		});
		return NextResponse.json(deletedConversation);
	} catch (error) {
		console.log(error, 'ERROR_CONVERSATION_DELTE');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
