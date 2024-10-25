'use client'

import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: any[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-grow mb-4 overflow-y-auto scrollbar-hide">
      {messages.map((m, index) => (
        <MessageItem key={index} message={m} />
      ))}
    </div>
  )
}