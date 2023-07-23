'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { find } from 'lodash';
import axios from 'axios';

import { pusherClient } from '@/lib/pusher';
import { useConversation } from '@/hooks';
import { FullMessageType } from '@/types';
import MessageBox from './MessageBox';

interface BodyProps {
	initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);
	const bottomRef = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/messages/${conversationId}/seen`);
	}, [conversationId]);

	useEffect(() => {
		pusherClient.subscribe(conversationId);
		bottomRef?.current?.scrollIntoView();

		const messageHandler = (message: FullMessageType) => {
			axios.post(`/api/messages/${conversationId}/seen`);
			setMessages(current => {
				if (find(current, { id: message.id })) {
					return current;
				}
				return [...current, message];
			});
			bottomRef?.current?.scrollIntoView();
		};

		const updateMessageHandler = (newMessage: FullMessageType) => {
			setMessages(current =>
				current.map(currentMessage => {
					if (currentMessage.id === newMessage.id) {
						return newMessage;
					}
					return currentMessage;
				})
			);
		};

		pusherClient.bind('messages:new', messageHandler);
		pusherClient.bind('message:update', updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind('messages:new', messageHandler);
			pusherClient.unbind('message:update', updateMessageHandler);
		};
	}, [conversationId]);

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
