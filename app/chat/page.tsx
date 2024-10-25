'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import Sidebar from '../components/Sidebar'
import ChatInterface from '../components/ChatInterface'
import { ScrapeResponse, Review } from '../types/ScrapeResponse';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  tabular_data?: any[];
}

// Define database credentials as constants
const DB_CREDENTIALS = {
  db_user: 'postgres.jseojlyregwrpqqhnxfc',
  db_password: 'easysqlpassword123#',
  db_host: 'aws-0-ap-south-1.pooler.supabase.com',
  db_port: '6543',
  db_name: 'postgres'
};

export default function ChatPage() {
  const [isConnected, setIsConnected] = useState(true); // Assume always connected
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const [llmChoice, setLlmChoice] = useState('openai');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [amazonReviewUrl, setAmazonReviewUrl] = useState(''); 
  const [isScraping, setIsScraping] = useState(false); 
  const [scrapeData, setScrapeData] = useState<ScrapeResponse | null>(null);
  const [numReviews, setNumReviews] = useState(10);

  const handleScrape = async () => {
    if (!amazonReviewUrl.trim()) return;

    setIsScraping(true);
    let allReviews: Review[] = [];
    let nextPageUrl = `/api/scrape?url=${encodeURIComponent(amazonReviewUrl)}`;
    let initialData: ScrapeResponse | null = null;

    try {
      while (allReviews.length < numReviews && nextPageUrl) {
        const response = await fetch(nextPageUrl);
        if (!response.ok) {
          throw new Error('Failed to scrape Amazon reviews');
        }

        const data: ScrapeResponse = await response.json();
        if (!initialData) {
          initialData = data;
        }
        allReviews = [...allReviews, ...data.reviews];
        nextPageUrl  = data.next_page ? `/api/scrape?url=${encodeURIComponent(data.next_page)}` : null;
 
        if (allReviews.length >= numReviews) {
          allReviews = allReviews.slice(0, numReviews);
          break;
        }
      }

      const finalData: ScrapeResponse = {
        ...initialData,
        reviews: allReviews,
        number_of_reviews: allReviews.length,
      };

      setScrapeData(finalData);
      toast({
        title: "Scraping Successful",
        description: `Successfully scraped ${finalData.number_of_reviews} reviews for ${finalData.product_title}.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Scraping error:', error);
      toast({
        title: "Scraping Error",
        description: "An error occurred while scraping the reviews. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScraping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage], 
          dbCredentials: DB_CREDENTIALS, 
          llm_choice: llmChoice,
          amazon_review_url: amazonReviewUrl 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.content,
        tabular_data: data.tabular_data 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: "An error occurred while processing your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLlmChange = (value: string) => {
    console.log("LLM changed to:", value); 
    setLlmChoice(value);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden gap-4">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        llmChoice={llmChoice} 
        handleLlmChange={handleLlmChange} 
        amazonReviewUrl={amazonReviewUrl} 
        setAmazonReviewUrl={setAmazonReviewUrl} 
        handleScrape={handleScrape} 
        isScraping={isScraping} 
        scrapeData={scrapeData}
        numReviews={numReviews}
        setNumReviews={setNumReviews}
      />
      <ChatInterface 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        messages={messages} 
        handleSubmit={handleSubmit} 
        input={input} 
        setInput={setInput} 
        isConnected={isConnected} 
        isLoading={isLoading} 
      />
    </div>
  )
}
