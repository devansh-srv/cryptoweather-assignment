# CryptoWeather Nexus

CryptoWeather Nexus is a full-featured Next.js dashboard application that integrates real-time weather updates, cryptocurrency data, and the latest news headlines. The project combines multiple APIs, modern state management with Redux, and real-time communication via WebSockets to deliver an interactive and dynamic user experience.

## Table of Contents

- [Overview](#overview)
- [Setup and Build Instructions](#setup-and-build-instructions)
- [Design Decisions](#design-decisions)
- [Challenges and Resolutions](#challenges-and-resolutions)
- [Alternative APIs](#alternative-apis)
- [Technical Details](#technical-details)
  - [WebSockets Integration](#websockets-integration)
  - [Redux State Management](#redux-state-management)

## Overview

CryptoWeather Nexus brings together multiple data streams:
- **Weather Data:** Live weather conditions for multiple cities.
- **Cryptocurrency Data:** Live prices, percentage changes, and market cap data.
- **Latest News:** Top headlines related to finance, technology, and weather trends.

The application uses SSR (Server-Side Rendering) for initial content load and client-side dynamic components to handle interactivity and real-time updates.

## Setup and Build Instructions

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/crypto-weather-nexus.git
   cd crypto-weather-nexus
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the project root and populate it with your API keys:
   ```
   NEXT_PUBLIC_WEATHER_API=your_weather_api_key
   NEXT_PUBLIC_CRYPTO_API=your_crypto_api_key
   NEXT_PUBLIC_NEWS_API=your_news_api_key
   ```

4. **Development Mode:**
   ```bash
   npm run dev
   ```
   The development server will start at [http://localhost:3000](http://localhost:3000).

5. **Build and Deploy:**
   ```bash
   npm run build
   npm run start
   ```
   Deployments can be made using platforms like Vercel, ensuring that the environment variables are properly set in the deployment settings.

## Design Decisions

- **Next.js Framework:** Leveraged for its powerful SSR capabilities and built-in API support.
- **Server Driven & Client Components:** Initial rendering is handled server-side for better performance and SEO, while interactive components (such as favorite toggles) run on the client.
- **Redux Toolkit:** Chosen for its streamlined API and ease of integrating global state management through Redux.
- **Real-time Updates:** While the core updates are fetched at set intervals, WebSockets integration was considered and implemented for pushing real-time notifications and updates to the dashboard.
- **Modular Architecture:** The codebase is split into modules for weather data, cryptocurrency data, and news, allowing for scalability and easier maintenance.

## Challenges and Resolutions

- **Hydration Mismatches:**  
  The initial server-rendered HTML sometimes conflicted with client-side rendered components (e.g., favorite toggle icons).  
  *Resolution:* Introduced a `mounted` state flag in client components to ensure components render consistently during hydration.

- **Real-time Data Synchronization:**  
  Integrating various APIs and ensuring data consistency was challenging, especially with real-time crypto and weather updates.  
  *Resolution:* Implemented background polling and integrated WebSockets for both push notifications and live updates.

## Alternative APIs

If the primary APIs are unavailable:
- **Weather Data:**  
  Alternative APIs include OpenWeatherMap API or AccuWeather API.
- **Cryptocurrency Data:**  
  Alternatives include CoinGecko API or CoinMarketCap API.
- **News Data:**  
  Alternative sources include NewsAPI.org or Bing News Search API.

## Technical Details

### WebSockets Integration

The application incorporates WebSockets to:
- Provide live notifications for critical events.
- Push real-time updates to client components, ensuring that changes (such as market trends) reflect immediately without requiring a refresh.
- Handle notifications and error alerts via a dedicated WebSocket server integrated with Redux to update the global state.

### Redux State Management

Redux is used extensively for:
- Managing global state for user preferences, such as favorite cities and cryptocurrencies.
- Handling asynchronous data fetching through Redux Thunks for weather and crypto data.
- Synchronizing UI components across the application to reflect updates from real-time data sources.
- Persisting user preferences locally, ensuring consistency between sessions.
