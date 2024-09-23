# Natural Language SQL Query Generator

- This application allows users to chat with amazon reviews data using natural language.
- It uses web scraping to get the data from amazon reviews and natural language processing to understand the user's question.
- It connects to a database (or uses a mock database) and provides an interface for users to ask questions in plain English, which are then converted into SQL queries and executed against the database.

## Features

- Amazon review scraping
- Natural language to SQL query conversion
- Database connection management
- Mock database option for testing
- Real-time query results display

## Architecture

- Frontend:
  - Next.js for server-side rendering and API routes
  - Tailwind CSS for styling
  - Shadcn/UI for components

- Backend:
  - FastAPI for handling database connections and text-to-SQL conversion
  - Flask server for web scraping
  - OpenAI for text-to-SQL conversion
  

- Key Components:
  - `proxy/route.ts`: Next.js API route for communicating with FastAPI backend
  - `scrape/route.ts`: Next.js API route for sending url to Flask server for scraping and storing in Supabase
  - FastAPI Backend: FastAPI backend for database connections and text-to-SQL conversion
  - Flask Server: Flask server for web scraping

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CubeStar1/text-to-sql.git
   cd text-to-sql
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up frontend environment variables:
   Create a `.env.local` file in the root directory and add:
   ```bash
   API_URL=http://localhost:8000  # FastAPI backend URL
   SCRAPE_API_URL=http://localhost:5000 # Flask server URL
   ```

4. Setting up the backend:
- Clone the backend repository:
   ```bash
   git clone https://github.com/CubeStar1/N2SQL-API.git
   cd N2SQL-API
   ```

- Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

- Set up backend environment variables:
   Create a `.env` file in the `N2SQL-API` directory and add necessary variables.
   ```bash
   OPENAI_API_KEY=<your-openai-api-key>
   ```

5. Setting up the Flask server:
- Clone the Flask server repository:
   ```bash
   git clone https://github.com/CubeStar1/amazon-scraper.git
   cd amazon-scraper
   ```

- Install Flask server dependencies:
   ```bash
   pip install -r requirements.txt
   ```
- Setup environment variables:
   ```bash
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_API_KEY=<your-supabase-api-key>
   ```

## Usage

1. Start the FastAPI backend:
   ```bash
   cd N2SQL-API
   uvicorn main:app --reload
   ```
2. Start the Flask Server:
   ```bash
   cd amazon-scraper
   flask run
   ```
3. In a new terminal, start the Next.js frontend:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Enter the amazon review url in the input field and click scrape.

6. If using your own database, enter the connection details.

7. Click "Connect" to establish a database connection.

8. Ask a question about the data to generate a sql query.

9. View the results displayed below the query input.


