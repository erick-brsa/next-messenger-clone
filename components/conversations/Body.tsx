'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useConversation } from '@/hooks';
import { FullMessageType } from '@/types';
import MessageBox from './MessageBox';
import axios from 'axios';

interface BodyProps {
	initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();

	useEffect(() => {
	  axios.post(`/api/messages/${conversationId}/seen`)
	}, [conversationId])
	

	return (
		<div className="flex-1 overflow-y-auto">
			{messages.map((message, i) => (
				<MessageBox
					key={message.id}
					data={message}
					isLast={i === messages.length - 1}
				/>
			))}
			<div className="pt-24" ref={bottomRef} />
		</div>
	);
};

export default Body;
