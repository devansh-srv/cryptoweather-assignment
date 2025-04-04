'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bitcoin, DollarSign, TrendingUp, TrendingDown, LineChart, BarChart2, Activity } from 'lucide-react';
import Link from 'next/link';

// For charting
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CryptoDetail({ params }) {
  const router = useRouter();
  const { symbol } = params;
  const decodedSymbol = decodeURIComponent(symbol);

  // State for crypto data
  const [cryptoData, setCryptoData] = useState({
    name: decodedSymbol === 'BTC' ? 'Bitcoin' : decodedSymbol === 'ETH' ? 'Ethereum' : 'Solana',
    symbol: decodedSymbol,
    price: decodedSymbol === 'BTC' ? '$68,245.32' : decodedSymbol === 'ETH' ? '$3,456.78' : '$142.19',
    change: decodedSymbol === 'BTC' ? '+2.5%' : decodedSymbol === 'ETH' ? '-1.2%' : '+5.7%',
    marketCap: decodedSymbol === 'BTC' ? '$1.32T' : decodedSymbol === 'ETH' ? '$416.8B' : '$61.3B',
    volume24h: decodedSymbol === 'BTC' ? '$42.3B' : decodedSymbol === 'ETH' ? '$18.5B' : '$3.8B',
    circulatingSupply: decodedSymbol === 'BTC' ? '19.35M BTC' : decodedSymbol === 'ETH' ? '120.21M ETH' : '431.15M SOL',
    allTimeHigh: decodedSymbol === 'BTC' ? '$69,045.00' : decodedSymbol === 'ETH' ? '$4,891.70' : '$260.06',
    allTimeHighDate: decodedSymbol === 'BTC' ? '2025-03-15' : decodedSymbol === 'ETH' ? '2024-12-01' : '2024-11-08',
  });

  // State for historical price data (past 30 days)
  const [historicalData, setHistoricalData] = useState({
    labels: [
      '30d ago', '28d ago', '26d ago', '24d ago', '22d ago', '20d ago', '18d ago',
      '16d ago', '14d ago', '12d ago', '10d ago', '8d ago', '6d ago', '4d ago', '2d ago', 'Today'
    ],
    prices: decodedSymbol === 'BTC'
      ? [63000, 62500, 64200, 65100, 63800, 62900, 64500, 66200, 65800, 64900, 65700, 67200, 66800, 67500, 68100, 68245]
      : decodedSymbol === 'ETH'
        ? [3200, 3180, 3250, 3300, 3280, 3350, 3420, 3500, 3480, 3400, 3450, 3520, 3490, 3510, 3490, 3456]
        : [120, 118, 125, 130, 128, 132, 134, 138, 135, 130, 134, 138, 140, 136, 139, 142],
    volumes: decodedSymbol === 'BTC'
      ? [38, 35, 40, 42, 36, 38, 41, 43, 40, 37, 39, 42, 41, 40, 43, 42]
      : decodedSymbol === 'ETH'
        ? [16, 15, 17, 18, 16, 17, 19, 20, 18, 16, 17, 19, 18, 17, 19, 18]
        : [3.2, 3.0, 3.5, 3.7, 3.3, 3.4, 3.6, 3.8, 3.5, 3.2, 3.4, 3.7, 3.6, 3.5, 3.9, 3.8],
  });

  // Current date and time
  const [currentDateTime, setCurrentDateTime] = useState('2025-04-04 17:12:05');

  useEffect(() => {
    // This would fetch real data from a crypto API
    console.log(`Fetching crypto data for ${decodedSymbol}...`);

    // Update current date/time
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0];
      const formattedTime = now.toTimeString().split(' ')[0];
      setCurrentDateTime(`${formattedDate} ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, [decodedSymbol]);

  // Helper function to render crypto icon based on symbol
  const renderCryptoIcon = () => {
    return <Bitcoin className={
      decodedSymbol === 'BTC' ? "text-yellow-500" :
        decodedSymbol === 'ETH' ? "text-purple-500" :
          "text-blue-500"
    } size={48} />;
  };

  // Chart data for price history
  const priceChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Price (USD)',
        data: historicalData.prices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Chart data for volume history
  const volumeChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Volume (Billion USD)',
        data: historicalData.volumes,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '30-Day Price History',
        color: 'white',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  const volumeChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: '30-Day Volume History',
      },
    },
  };

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container py-8 px-4 mx-auto">
        <Link href="/" className="inline-flex items-center mb-6 text-blue-400 hover:text-blue-300">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col justify-between items-start mb-8 md:flex-row">
          <div>
            <h1 className="mb-2 text-3xl font-bold">
              {cryptoData.name} ({cryptoData.symbol})
            </h1>
            <p className="text-gray-400">Last updated: {currentDateTime}</p>
          </div>
        </div>

        {/* Current Crypto Stats Card */}
        <div className="p-6 mb-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-center">
              {renderCryptoIcon()}
              <div className="ml-4">
                <div className="text-4xl font-bold">{cryptoData.price}</div>
                <div className={`flex items-center ${cryptoData.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {cryptoData.change.startsWith('+')
                    ? <TrendingUp size={16} className="mr-1" />
                    : <TrendingDown size={16} className="mr-1" />
                  }
                  {cryptoData.change} (24h)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-1 text-gray-400">
                  <DollarSign size={16} className="mr-2 text-green-400" />
                  Market Cap
                </div>
                <div className="text-xl">{cryptoData.marketCap}</div>
              </div>

              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-1 text-gray-400">
                  <BarChart2 size={16} className="mr-2 text-blue-400" />
                  24h Volume
                </div>
                <div className="text-xl">{cryptoData.volume24h}</div>
              </div>

              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-1 text-gray-400">
                  <Activity size={16} className="mr-2 text-purple-400" />
                  Circulating Supply
                </div>
                <div className="text-xl">{cryptoData.circulatingSupply}</div>
              </div>

              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-1 text-gray-400">
                  <TrendingUp size={16} className="mr-2 text-yellow-400" />
                  All Time High
                </div>
                <div className="text-xl">{cryptoData.allTimeHigh}</div>
                <div className="text-xs text-gray-400">{cryptoData.allTimeHighDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="p-6 mb-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold">Price History</h2>

          <div className="h-80">
            <Line options={chartOptions} data={priceChartData} />
          </div>
        </div>

        {/* Volume History Chart */}
        <div className="p-6 mb-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold">Trading Volume</h2>

          <div className="h-80">
            <Line options={volumeChartOptions} data={volumeChartData} />
          </div>
        </div>

        {/* Historical Price Table */}
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold">30-Day Historical Data</h2>

          <div className="overflow-x-auto">
            <table className="overflow-hidden min-w-full bg-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Price (USD)</th>
                  <th className="py-3 px-4 text-left">Volume (Billion USD)</th>
                  <th className="py-3 px-4 text-left">Change</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.labels.map((date, index) => {
                  const currentPrice = historicalData.prices[index];
                  const prevPrice = index > 0 ? historicalData.prices[index - 1] : currentPrice;
                  const priceChange = ((currentPrice - prevPrice) / prevPrice * 100).toFixed(2);
                  const isPositive = parseFloat(priceChange) >= 0;

                  return (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="py-3 px-4">{date}</td>
                      <td className="py-3 px-4">${historicalData.prices[index].toLocaleString()}</td>
                      <td className="py-3 px-4">${historicalData.volumes[index]}B</td>
                      <td className={`py-3 px-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{priceChange}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
