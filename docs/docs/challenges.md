# Challenges & Solutions

This page outlines the main challenges encountered during the development of the Crypto Price Tracker application and how they were addressed.

## 1. API Rate Limiting

### Challenge

The CoinGecko API has rate limits on its free tier, which could lead to API call failures if too many requests are made in a short period.

### Solution

We implemented several strategies to work within the rate limits:

1. **Caching with React Query:**
   - Configured a stale time of 5 minutes for fetched data
   - This prevents unnecessary API calls when data is still considered fresh

2. **Manual Refresh Button:**
   - Instead of automatic refreshing, we implemented a manual refresh button
   - This gives users control over when to fetch new data

3. **Search Optimization:**
   - Considered implementing debouncing on the search input to limit rapid API- API calls during typing
   - Set a minimum search query length of 2 characters to avoid unnecessary searches

## 2. Search Functionality Implementation

### Challenge

The CoinGecko API's search endpoint returns limited data that doesn't include current prices and other metrics we need to display.

### Solution

We implemented a two-step search process:

1. First, query the `/search` endpoint to find matching cryptocurrency IDs
2. Then, use the found IDs to fetch detailed data from the `/coins/markets` endpoint
3. This approach ensures we have consistent data structure across both search results and the default cryptocurrency list

```typescript
export const searchCryptocurrencies = async (query: string): Promise<Cryptocurrency[]> => {
  try {
    // Step 1: Get coin IDs from search endpoint
    const response = await axios.get(`${API_URL}/search`, {
      params: { query }
    });
    
    if (response.data.coins.length > 0) {
      // Step 2: Get detailed data for found coins
      const coinIds = response.data.coins.slice(0, 5).map((coin: any) => coin.id);
      
      const detailsResponse = await axios.get(`${API_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          sparkline: false,
          price_change_percentage: '24h'
        }
      });
      
      return detailsResponse.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    throw error;
  }
};
```

## 3. Type Safety with External API

### Challenge

Ensuring type safety when working with external APIs that might change or return unexpected data structures.

### Solution

1. **TypeScript Interfaces:**
   - Created a comprehensive `Cryptocurrency` interface that defines all expected properties
   - This provides type safety throughout the application

2. **Error Handling:**
   - Implemented try/catch blocks in all API service functions
   - Added proper error logging and propagation

3. **Optional Chaining:**
   - Used TypeScript's optional chaining (`?.`) when accessing nested properties
   - This prevents runtime errors if certain properties are missing

## 4. Responsive Design

### Challenge

Creating a UI that works well on both desktop and mobile devices.

### Solution

1. **Tailwind CSS:**
   - Utilized Tailwind's responsive utility classes
   - Implemented different layouts for different screen sizes

2. **Grid System:**
   - Used CSS Grid with responsive column counts:
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   ```

3. **Responsive Components:**
   - Designed cards with flexible width
   - Made the search bar and refresh button stack vertically on small screens

## 5. Loading States and User Experience

### Challenge

Providing a good user experience during loading and error states.

### Solution

1. **Loading Spinner:**
   - Implemented a loading spinner that appears while data is being fetched
   - Positioned centrally to indicate that the application is working

2. **Meaningful Error Messages:**
   - Added user-friendly error messages that provide clear information
   - Included a suggestion to try refreshing when errors occur

3. **Keeping Previous Data:**
   - Used React Query's `keepPreviousData` option to show existing data while new data is loading
   - This prevents content jumps and provides a smoother experience

## 6. Next.js App Router Integration

### Challenge

Integrating React Query with Next.js 14's App Router architecture.

### Solution

1. **Client Components:**
   - Created a separate `providers.tsx` file to wrap the application with the React Query provider
   - Used the `'use client'` directive for components that need client-side interactivity

2. **State Management Structure:**
   - Kept React Query state separate from Next.js page components
   - Used a clean separation of concerns between data fetching and UI rendering

3. **Image Optimization:**
   - Utilized Next.js's Image component for cryptocurrency logos
   - This improves loading performance and provides better user experience

## Conclusion

The challenges encountered during development were primarily related to API integration, type safety, and responsive design. By leveraging modern tools like TypeScript, React Query, and Tailwind CSS, we were able to create a robust solution that provides a good user experience while maintaining clean and maintainable code.

Future improvements could include:
- Implementing more advanced search features
- Adding historical price charts
- Supporting multiple currencies beyond USD
- Creating a favorites/watchlist feature with local storage