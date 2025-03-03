import Image from 'next/image';

export default function CryptoCard({ crypto }) {
  const isPriceUp = crypto.price_change_percentage_24h >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          {crypto.image && (
            <div className="relative w-10 h-10 mr-3">
              <Image 
                src={crypto.image} 
                alt={crypto.name} 
                width={40} 
                height={40}
                className="rounded-full"
              />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{crypto.name}</h2>
            <p className="text-gray-500 uppercase">{crypto.symbol}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-2xl font-semibold">${crypto.current_price.toLocaleString()}</p>
          <p className={`text-sm ${isPriceUp ? 'text-green-500' : 'text-red-500'}`}>
            {isPriceUp ? '▲' : '▼'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </p>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
          <p>Last Updated: {new Date(crypto.last_updated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}