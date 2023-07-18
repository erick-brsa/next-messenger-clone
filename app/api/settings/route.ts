import getCurrentUser from '@/lib/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		const { name, image } = await req.json();

		if (!currentUser) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id
			},
			data: {
				name,
				image
			}
		});
		return NextResponse.json(updatedUser);
	} catch (error) {
		console.log(error, 'ERROR_SETTINGS');
		return new NextResponse('Internal Error', { status: 500 });
	}
}
