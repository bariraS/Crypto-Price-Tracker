export default function ErrorMessage({ message = 'Something went wrong', onRetry }) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center my-8">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 mb-3">{message}</p>
          
          {onRetry && (
            <button 
              onClick={onRetry}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }