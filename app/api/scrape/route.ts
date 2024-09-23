import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const response = await fetch(`http://localhost:5000/?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Failed to scrape Amazon reviews');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Failed to scrape Amazon reviews' }, { status: 500 });
  }
}