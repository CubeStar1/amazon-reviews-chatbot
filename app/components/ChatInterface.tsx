'use client'

import { useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MessageList from './MessageList'
import { Input } from "@/components/ui/input"
import { ChevronRight } from 'lucide-react'

interface ChatInterfaceProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  messages: any[];
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: (input: string) => void;
  isConnected: boolean;
  isLoading: boolean;
}

export default function ChatInterface({
  isSidebarOpen,
  setIsSidebarOpen,
  messages,
  handleSubmit,
  input,
  setInput,
  isConnected,
  isLoading
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow overflow-hidden">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle></CardTitle>
          {!isSidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <div className="flex flex-col h-full">
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your data..."
                className="flex-grow"
                disabled={!isConnected || isLoading}
              />
              <Button type="submit" disabled={!isConnected || isLoading}>
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}