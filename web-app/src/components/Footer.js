export default function Footer() {
    return (
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">
              Data provided by <a href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">CoinGecko API</a>
            </p>
            <p>
              © {new Date().getFullYear()} Crypto Price Tracker. This is a demonstration project.
            </p>
            <p className="mt-1">
              <span className="text-xs">Prices refresh every 5 minutes or when you click refresh.</span>
            </p>
          </div>
        </div>
      </footer>
    );
  }