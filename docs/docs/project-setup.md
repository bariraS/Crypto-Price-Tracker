# Project Setup

This guide will help you set up both the web application and documentation locally for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or newer)
- npm or yarn
- Git

## Setting Up the Web Application

Follow these steps to set up the Next.js web application:

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

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## Setting Up the Documentation

To set up and run the Docusaurus documentation:

1. From the project root, navigate to the docs directory:

```bash
cd docs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the documentation development server:

```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the documentation.

## Production Build

### Building the Web App

```bash
cd web-app
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

### Building the Documentation

```bash
cd docs
npm run build
# or
yarn build
```

The built documentation will be in the `build` directory and can be served with any static site hosting.

## Environment Variables

The web application uses the following environment variables:

- None required for the basic setup as we're using the public CoinGecko API without authentication

If you wish to use a different API or add features requiring environment variables, create a `.env.local` file in the `web-app` directory and add your variables there.