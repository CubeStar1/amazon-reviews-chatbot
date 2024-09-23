import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await fetch(`http://localhost:5000/?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Failed to scrape Amazon reviews');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape Amazon reviews' });
  }
}