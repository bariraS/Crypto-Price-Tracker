# API Integration

This page breaks down how the Crypto Price Tracker grabs and handles cryptocurrency info from outside sources via APIs.

## API Provider

The app taps into the [CoinGecko API](https://www.coingecko.com/en/api/documentation) to pull in cryptocurrency details. CoinGecko has a free option that doesn’t need any login for basic use, which works great for what we need here.

## API Service Implementation

We’ve wrapped all the API stuff into its own little service module:

```javascript
// src/services/cryptoService.js
import axios from 'axios';

const API_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetches top cryptocurrencies by market cap
 * @param {number} limit - Number of cryptocurrencies to fetch
 * @returns {Promise<Array>} - Array of cryptocurrency objects
 */
export const fetchCryptocurrencies = async (limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};
```

## Key API Endpoints Used

### Fetching Top Cryptocurrencies

The app grabs the biggest cryptocurrencies by market size through the `/coins/markets` endpoint:

- **Endpoint:** `/coins/markets`
- **Method:** GET
- **Parameters:**
  - `vs_currency`: 'usd' (shows prices in U.S. dollars)
  - `order`: 'market_cap_desc' (sorts them by market cap, biggest first)
  - `per_page`: How many results we want (default is 5)
  - `page`: Which page of results we’re on
  - `sparkline`: false (we don’t need those little graph lines)
  - `price_change_percentage`: '24h' (shows how prices shifted in the last day)

### Searching Cryptocurrencies

For searching, the app uses the `/search` endpoint and then digs up more details on whatever it finds:

- **Endpoint:** `/search`
- **Method:** GET
- **Parameters:**
  - `query`: Whatever the user types into the search bar

## Data Fetching Strategy

1. **Initial Load:** Right when the app starts up, it pulls in the top 5 cryptocurrencies by market cap.
2. **Search:** When someone searches for something, it asks the API for cryptocurrencies that match.
3. **Manual Refresh:** Hit the refresh button, and it grabs the latest prices all over again.

## Error Handling

The service has some built-in safety nets to catch and log any hiccups with API requests. In the app itself, we show an error message if the data doesn’t come through.

## Rate Limiting Considerations

CoinGecko’s free API caps you at something like 10-50 requests per minute. To stay under that limit, the app does a few smart things:

1. **Caching:** Uses React Query to save responses so we’re not pinging the API too much
2. **Manual Refresh:** Only updates when the user asks for it
3. **Debounced Search:** Slows down how often it hits the API while someone’s typing a search

## API Response Example

Here’s what the CoinGecko API sends back for a single cryptocurrency:

```json
{
  "id": "bitcoin",
  "symbol": "btc",
  "name": "Bitcoin",
  "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  "current_price": 46382.12,
  "market_cap": 908326775232,
  "market_cap_rank": 1,
  "price_change_percentage_24h": -1.12546,
  "last_updated": "2023-03-02T10:15:23.000Z"
}
```

This layout stays the same everywhere in the app.