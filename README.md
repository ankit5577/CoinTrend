# CoinTrend

## Overview

**CoinTrend** tracks and visualizes cryptocurrency market movements with precision. Built with React, Tailwind CSS, and Lightweight Charts, CoinTrend offers interactive charts that cater to both novice and experienced traders. Manage your trading data effortlessly with Zustand and stay informed with real-time updates and insightful visualizations.

## Features

- `**Real-Time Data Visualization:**` Fetches live cryptocurrency data from the CoinGecko API and displays it using interactive charts powered by Lightweight Charts.
- `**API Rate Limit Handling:**` Automatically switches to dummy data when CoinGecko API rate limits are exceeded, ensuring uninterrupted user experience.
- `**Fullscreen Mode:**` Allows users to view charts in fullscreen for a more detailed and immersive analysis.
- `**Responsive Design:**` Built with Tailwind CSS to ensure the application is fully responsive and looks great on all devices.
- `**State Management:**` Utilizes Zustand for efficient and scalable state management.
- `**User-Friendly Interface:**` Clean and intuitive UI components built with React and Radix UI.

## Demo

![CoinTrend Demo](https://cointrend.pages.dev/)

**Technologies Used**

- `React:` UI library!
- `Tailwind CSS:` for Styling.
- `Lightweight Charts:` for Charts.
- `Zustand:` for state-management
- `Radix UI:` UI component lib for React/NextJs
- `Vite`
- `TypeScript:` Javascript with Types.

## Getting Started

Follow these instructions

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/ankit5577/CoinTrend.git
```

2. **Navigate to the Project Directory**

```bash
cd CoinTrend
```

3. **Install Dependecies**

```bash
npm install -f
```

3. **Configuration**
1. **_Environment Variables_**
   Create a .env file in the root directory to configure environment-specific variables. For example:

```env
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

4. **Running the Application**
   Start the development server:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:5173

5. **Building for Production**

```bash
npm run build
```

**Usage**

**_Handling API Limits:_**
If the CoinGecko API rate limit is exceeded, the application can switch to displaying dummy data to ensure continuous usability.

**_Fullscreen Mode:_**
Click the Fullscreen button to expand the chart to occupy the entire viewport.
Press the Escape (ESC) key or click the Fullscreen button again to exit fullscreen mode.
