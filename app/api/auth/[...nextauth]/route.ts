import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/lib/prismadb';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'Email' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password'
				}
			},
			async authorize(credentials) {
				console.log(credentials)
				if (!credentials?.email) {
					throw new Error('Email is required');
				}
				if (!credentials?.password) {
					throw new Error('Password is required');
				}
				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				});
				if (!user) {
					throw new Error('User not found');
				}
				const checkPassword = await bcrypt.compare(
					credentials.password,
					user.password!
				);
				if (!checkPassword) {
					throw new Error('Invalid Credentials');
				}
				return user;
			}
		})
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// if a user is allowed to sign in
			return true;
		},
		// async redirect({ url, baseUrl }) {
		// 	return baseUrl;
		// },
		async session({ session, user, token }) {
			// session.accessToken = token.accessToken;
			// session.user.id = token.id;
			return { ...session, user };
		},
		async jwt({ token, user, account, profile }) {
			if (account) {
				token.accessToken = account.accessToken;
				token.id = user.id;
			}
			return token;
		}
	},
	session: {
		strategy: 'jwt'
	},

	secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
