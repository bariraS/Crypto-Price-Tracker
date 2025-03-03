# Crypto Price Tracker

A simple web application that tracks cryptocurrency prices using the CoinGecko API. This project demonstrates Next.js, API integration, state management with React Query, and documentation with Docusaurus.

## Features

- Display live prices of cryptocurrencies
- Search functionality to find specific cryptocurrencies
- Manual refresh button to update prices
- Responsive design for both desktop and mobile
- Loading and error states

## Project Structure

```
crypto-tracker/
├── README.md           # You are here
├── web-app/            # Next.js web application
└── docs/               # Docusaurus documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Git

### Running the Web Application

1. Clone the repository:
```bash
git clone https://github.com/your-github-username/crypto-tracker.git
cd crypto-tracker
```

2. Navigate to the web app directory:
```bash
cd web-app
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Documentation

1. Navigate to the docs directory from the project root:
```bash
cd docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the documentation server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

### Web Application
- Next.js 14
- React 18
- TypeScript
- React Query (for state management)
- Tailwind CSS (for styling)
- Axios (for API requests)

### Documentation
- Docusaurus 2
- Markdown
- React

## API Integration

The application uses the CoinGecko API to fetch cryptocurrency data. The integration includes:

- Fetching top cryptocurrencies by market cap
- Searching for cryptocurrencies by name or symbol
- Error handling and loading states

For more details, see the [API Integration documentation](./docs/docs/api-integration.md).

## State Management

React Query is used for state management, providing:

- Caching and automatic refetching
- Loading and error states
- Manual data refreshing

For more details, see the [State Management documentation](./docs/docs/state-management.md).

## License

This project is open source and available under the [MIT License](LICENSE).