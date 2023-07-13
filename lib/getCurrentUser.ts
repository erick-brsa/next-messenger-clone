import prisma from './prismadb';

import getSession from './session';

const getCurrentUser = async () => {
	try {
		const session = await getSession();
		if (!session?.user?.email) {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email
			}
		});

		if (!user) {
			return null;
		}
		return user;
	} catch (error: any) {
		console.log('Error Aquí', error);
		return null;
	}
};

export default getCurrentUser;
