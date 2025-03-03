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

/**
 * Searches for cryptocurrencies by name or symbol
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of cryptocurrency objects
 */
export const searchCryptocurrencies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        query
      }
    });
    
    // The search endpoint returns limited data, so we need to fetch full details
    // for each coin found in the search results
    if (response.data.coins.length > 0) {
      const coinIds = response.data.coins.slice(0, 5).map(coin => coin.id);
      
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