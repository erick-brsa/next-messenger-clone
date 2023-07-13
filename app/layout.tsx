import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ToasterContext from '@/context/ToasterContext';
import AuthContext from '@/context/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Messenger Clone',
	description: 'Messenger Clone',
	icons: {
		icon: '/img/logo.png'
	}
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={inter.className}>
				<ToasterContext />
				<AuthContext>
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
