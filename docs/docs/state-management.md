# State Management

This page explains the state management approach used in the Crypto Price Tracker application.

## Chosen Approach: React Query

For this project, we chose **React Query** as our state management solution. React Query is a powerful library that simplifies fetching, caching, synchronizing, and updating server state in React applications.

## Why React Query?

Several factors influenced our decision to use React Query:

### 1. Separation of Server and Client State

React Query distinguishes between server state (data from API) and client state (UI state like form inputs). For a crypto tracker that primarily deals with server data, this separation is ideal.

### 2. Built-in Caching and Refetching

React Query provides:
- Automatic caching of API responses
- Configurable stale time and cache time
- Background refetching strategies
- Prefetching capabilities

These features are perfect for our use case where we need to display crypto prices that change frequently but don't need to be refetched on every component render.

### 3. Loading and Error States

React Query provides built-in loading and error states, which simplifies UI development:

```jsx
const { data, isLoading, isError, refetch } = useQuery(
  ['cryptocurrencies', searchQuery],
  () => fetchCryptocurrencies(),
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
);

// In the UI:
{isLoading && <LoadingSpinner />}
{isError && <ErrorMessage />}
{data && <DisplayData data={data} />}
```

### 4. Manual Refetching

React Query makes it easy to implement the "Refresh" button functionality with the `refetch` function:

```jsx
<button onClick={() => refetch()}>Refresh Prices</button>
```

### 5. Query Keys for Dependent Queries

The search functionality benefits from React Query's query key system, which allows us to invalidate and refetch data based on the search query:

```jsx
const { data } = useQuery(
  ['cryptocurrencies', searchQuery], // Query key changes when searchQuery changes
  () => searchQuery ? searchCryptocurrencies(searchQuery) : fetchCryptocurrencies(),
  {
    keepPreviousData: true, // Show previous data while loading new data
  }
);
```

## Alternative Approaches Considered

### Context API + useReducer

**Pros:**
- Built into React
- No additional dependencies
- Good for global UI state

**Cons:**
- No built-in caching or data fetching utilities
- Would require more boilerplate code
- Manual handling of loading/error states

### Zustand

**Pros:**
- Lightweight and simple API
- Minimal boilerplate
- Good performance

**Cons:**
- Less specialized for server state
- Would still need to implement caching logic
- Fewer built-in features for data fetching

## Implementation Details

### 1. React Query Provider Setup

We set up React Query with a global provider in `src/app/providers.js`:

```jsx
'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 2. Query Configuration

We configured the queries with appropriate caching strategies:

- **Stale Time:** 5 minutes (data is considered fresh for 5 minutes)
- **Disabled Window Focus Refetching:** To prevent unnecessary API calls
- **Keep Previous Data:** To provide a smoother user experience during refetches

### 3. Local UI State

For purely UI-related state (like search input value), we used React's built-in `useState`:

```jsx
const [query, setQuery] = useState('');
```

## Conclusion

React Query provides the ideal balance of features for our cryptocurrency tracker. It handles the complex aspects of server state management (caching, refetching, loading/error states) while allowing us to focus on building a responsive and user-friendly UI.

The combination of React Query for server state and React's built-in state management for UI state results in a clean architecture that's easy to maintain and extend.