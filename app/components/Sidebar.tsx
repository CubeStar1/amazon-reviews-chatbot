'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LLMSelector } from './LLMSelector';
import { ChevronLeft } from 'lucide-react'
import { ScrapeResponse } from '../types/ScrapeResponse';
import { Slider } from "@/components/ui/slider"

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  llmChoice: string;
  handleLlmChange: (value: string) => void;
  amazonReviewUrl: string;
  setAmazonReviewUrl: (url: string) => void;
  handleScrape: () => void;
  isScraping: boolean;
  scrapeData: ScrapeResponse | null;
  numReviews: number;
  setNumReviews: (num: number) => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  llmChoice,
  handleLlmChange,
  amazonReviewUrl,
  setAmazonReviewUrl,
  handleScrape,
  isScraping,
  scrapeData,
  numReviews,
  setNumReviews
}: SidebarProps) {
  return (
    <ScrollArea className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-y-auto flex-shrink-0`}>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Configure Chat</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <LLMSelector value={llmChoice} onChange={handleLlmChange} />
            </div>
            <div className="mb-4 flex space-x-2">
              <Input
                value={amazonReviewUrl}
                onChange={(e) => setAmazonReviewUrl(e.target.value)}
                placeholder="Enter Amazon review URL"
              />
              <Button onClick={handleScrape} disabled={isScraping}>
                {isScraping ? 'Scraping...' : 'Scrape'}
              </Button>
            </div>
            <div className="mb-4">
              <label htmlFor="num-reviews" className="block text-sm font-medium text-gray-700">
                Number of Reviews: {numReviews}
              </label>
              <Slider
                defaultValue={[numReviews]}
                max={100}
                step={10}
                onValueChange={(value) => setNumReviews(value[0])}
                className="w-full"
              />
            </div>
            {scrapeData && (
              <div className="mt-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">Scraped Data Summary</h3>
                <p><strong>Product Title:</strong> {scrapeData.product_title}</p>
                <p><strong>Average Rating:</strong> {scrapeData.average_rating}</p>
                <p><strong>Number of Reviews:</strong> {scrapeData.number_of_reviews}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  )
}