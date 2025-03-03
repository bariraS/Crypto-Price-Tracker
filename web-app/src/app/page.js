'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptocurrencies, searchCryptocurrencies } from '@/services/cryptoService';
import CryptoCard from '@/components/CryptoCard';
import SearchBar from '@/components/SearchBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cryptocurrencies, isLoading, isError, refetch } = useQuery({
    queryKey: ['cryptocurrencies', searchQuery],
    queryFn: () => searchQuery ? searchCryptocurrencies(searchQuery) : fetchCryptocurrencies(),
    keepPreviousData: true,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Crypto Price Tracker</h1>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <SearchBar onSearch={handleSearch} />
            <button 
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Refresh Prices
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {isError && (
            <ErrorMessage 
              message="Error loading cryptocurrency data. Please try again." 
              onRetry={handleRefresh}
            />
          )}

          {!isLoading && !isError && cryptocurrencies && cryptocurrencies.length === 0 && (
            <div className="text-center text-gray-500 my-8">
              No cryptocurrencies found. Try a different search.
            </div>
          )}

          {!isLoading && !isError && cryptocurrencies && cryptocurrencies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptocurrencies.map(crypto => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}