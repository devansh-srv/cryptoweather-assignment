'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Cloud,
  CloudRain,
  Sun,
  Droplets,
  Wind,
  Bitcoin,
  TrendingUp,
  TrendingDown,
  Newspaper,
  Star,
  StarOff
} from 'lucide-react';

export default function Dashboard() {
  // State for weather data
  const [weatherData, setWeatherData] = useState({
    cities: [
      { name: 'New York', temp: '22°C', humidity: '45%', condition: 'Sunny', isFavorite: false },
      { name: 'London', temp: '15°C', humidity: '68%', condition: 'Cloudy', isFavorite: false },
      { name: 'Tokyo', temp: '28°C', humidity: '72%', condition: 'Rainy', isFavorite: false }
    ]
  });

  // State for crypto data
  const [cryptoData, setCryptoData] = useState({
    coins: [
      { name: 'Bitcoin', symbol: 'BTC', price: '$68,245.32', change: '+2.5%', marketCap: '$1.32T', isFavorite: false },
      { name: 'Ethereum', symbol: 'ETH', price: '$3,456.78', change: '-1.2%', marketCap: '$416.8B', isFavorite: false },
      { name: 'Solana', symbol: 'SOL', price: '$142.19', change: '+5.7%', marketCap: '$61.3B', isFavorite: false }
    ]
  });

  // State for news data
  const [newsData, setNewsData] = useState({
    headlines: [
      { title: 'Bitcoin Hits New All-Time High as Institutional Adoption Grows', date: '2025-04-03', source: 'CryptoNews' },
      { title: 'Extreme Weather Events Predicted to Increase in Coming Months', date: '2025-04-02', source: 'Weather Today' },
      { title: 'Ethereum Upgrades Network to Reduce Energy Consumption by 99%', date: '2025-04-01', source: 'Blockchain Report' },
      { title: 'Record Heatwave Expected Across European Cities Next Week', date: '2025-03-31', source: 'Global Weather' },
      { title: 'New Crypto Regulations Set to Take Effect in Major Markets', date: '2025-03-30', source: 'Finance Daily' }
    ]
  });

  // Function to toggle favorite status for cities
  const toggleCityFavorite = (cityName) => {
    setWeatherData({
      ...weatherData,
      cities: weatherData.cities.map(city =>
        city.name === cityName ? { ...city, isFavorite: !city.isFavorite } : city
      )
    });
  };

  // Function to toggle favorite status for cryptocurrencies
  const toggleCryptoFavorite = (symbol) => {
    setCryptoData({
      ...cryptoData,
      coins: cryptoData.coins.map(coin =>
        coin.symbol === symbol ? { ...coin, isFavorite: !coin.isFavorite } : coin
      )
    });
  };

  // Effect to simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, you would fetch data from APIs here
      console.log('Fetching updated data...');
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Helper function to render weather icon based on condition
  const renderWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="text-gray-400" />;
      case 'rainy':
        return <CloudRain className="text-blue-400" />;
      default:
        return <Cloud className="text-gray-400" />;
    }
  };

  // Helper function to render crypto change icon based on value
  const renderChangeIcon = (change) => {
    return change.startsWith('+')
      ? <TrendingUp className="text-green-500" />
      : <TrendingDown className="text-red-500" />;
  };

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container py-8 px-4 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          CryptoWeather Nexus
        </h1>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Weather Section */}
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex gap-2 items-center text-2xl font-semibold">
                <Cloud className="text-blue-400" />
                Weather
              </h2>
              <span className="text-xs text-gray-400">Last updated: 2025-04-04 17:00</span>
            </div>

            <div className="space-y-6">
              {weatherData.cities.map((city) => (
                <div key={city.name} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                  <div>
                    <div className="flex gap-2 items-center">
                      <h3 className="text-lg font-medium">{city.name}</h3>
                      <button
                        onClick={() => toggleCityFavorite(city.name)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        {city.isFavorite ? <Star size={16} /> : <StarOff size={16} />}
                      </button>
                    </div>
                    <div className="flex gap-4 items-center mt-2">
                      <div className="flex gap-1 items-center text-sm text-gray-300">
                        <Droplets size={14} className="text-blue-400" />
                        {city.humidity}
                      </div>
                      <div className="flex gap-1 items-center text-sm text-gray-300">
                        <Wind size={14} className="text-blue-300" />
                        {city.condition}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    {renderWeatherIcon(city.condition)}
                    <span className="text-2xl">{city.temp}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`/weather/${encodeURIComponent(weatherData.cities[0].name)}`} className="block py-2 px-4 mt-6 w-full text-center bg-blue-600 rounded-lg transition-colors duration-300 hover:bg-blue-700">
              View Detailed Weather
            </Link>
          </div>

          {/* Cryptocurrency Section */}
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex gap-2 items-center text-2xl font-semibold">
                <Bitcoin className="text-yellow-500" />
                Cryptocurrency
              </h2>
              <span className="text-xs text-gray-400">Live updates</span>
            </div>

            <div className="space-y-6">
              {cryptoData.coins.map((coin) => (
                <div key={coin.symbol} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <h3 className="text-lg font-medium">{coin.name}</h3>
                      <span className="text-sm text-gray-400">{coin.symbol}</span>
                      <button
                        onClick={() => toggleCryptoFavorite(coin.symbol)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        {coin.isFavorite ? <Star size={16} /> : <StarOff size={16} />}
                      </button>
                    </div>
                    <div className="text-xl font-medium">{coin.price}</div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm text-gray-300">
                      Market Cap: {coin.marketCap}
                    </div>
                    <div className={`flex items-center gap-1 ${coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                      {renderChangeIcon(coin.change)}
                      {coin.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`/crypto/${encodeURIComponent(cryptoData.coins[0].symbol)}`} className="block py-2 px-4 mt-6 w-full text-center bg-yellow-600 rounded-lg transition-colors duration-300 hover:bg-yellow-700">
              View Crypto Details
            </Link>
          </div>

          {/* News Section */}
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex gap-2 items-center text-2xl font-semibold">
                <Newspaper className="text-purple-400" />
                Latest News
              </h2>
              <span className="text-xs text-gray-400">Top headlines</span>
            </div>

            <div className="space-y-4">
              {newsData.headlines.map((headline, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="mb-2 font-medium text-md">{headline.title}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{headline.source}</span>
                    <span className="text-gray-400">{headline.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="py-2 px-4 mt-6 w-full bg-purple-600 rounded-lg transition-colors duration-300 hover:bg-purple-700">
              View All News
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
