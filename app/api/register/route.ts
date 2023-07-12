import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		let { email, name, password } = body;
		
		if (!email || !name || !password) {
			return new NextResponse('Missing info', { status: 400 });
		}

		const user = await prisma.user.findUnique({
			where: { email }
		})

		if (user) {
			return new NextResponse('User already exists', { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				name,
				password: hashedPassword
			}
		});
		return NextResponse.json(newUser);
	} catch (error) {
		console.log(error, 'REGISTRATION_ERROR');
		return new NextResponse('Internal error', { status: 500 });
	}
}
