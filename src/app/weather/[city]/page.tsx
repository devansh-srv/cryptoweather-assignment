'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Cloud, CloudRain, Sun, Droplets, Wind, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { v4 as uuidv4 } from 'uuid';

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

const BASE_URL_WEATHER = 'http://api.weatherapi.com/v1';
const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API;
export default function CityWeatherDetail({ params }) {
  const dispatch = useDispatch()
  const router = useRouter();
  const { city } = React.use(params);
  const decodedCity = decodeURIComponent(city);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // State for weather data
  const [currentWeather, setCurrentWeather] = useState({
    temp: '22°C',
    humidity: '45%',
    condition: 'Sunny',
    wind: '12 km/h',
    feelsLike: '24°C',
    pressure: '1015 hPa',
  });

  // State for historical data (past 7 days)
  const [historicalData, setHistoricalData] = useState({
    labels: ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],
    temperatures: [19, 21, 20, 18, 22, 24, 21, 22],
    humidity: [50, 48, 55, 60, 52, 45, 47, 45],
  });

  // Current date and time
  const [currentDateTime, setCurrentDateTime] = useState('2025-04-04 17:12:05');

  const fetchCurrentWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL_WEATHER}/current.json?key=${WEATHER_API}&q=${encodeURIComponent(decodedCity)}&aqi=no`);

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      const data = await response.json();
      setCurrentWeather({
        temp: `${data.current.temp_c}°C`,
        humidity: `${data.current.humidity}%`,
        condition: data.current.condition.text,
        wind: `${data.current.wind_kph} km/h`,
        feelsLike: `${data.current.feelslike_c}°C`,
        pressure: `${data.current.pressure_mb} hPa`,
      });
      setError(null)
    } catch (error: any) {
      console.error(`Current Weather Fetch failed due to : ${error}`)
      setError(error.message);
      dispatch(addNotification({
        id: uuidv4(),
        type: 'weather_alert',
        message: `Error fetching weather data for ${decodedCity}: ${error.message}`,
        timestamp: Date.now(),
      }));
    } finally {
      setLoading(false)
    }
  }

  const fetchHistoricalWeatherData = async () => {
    try {
      const dates = [];
      const temperatures = [];
      const humidities = [];
      const today = new Date();
      for (let i = 7; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const response = await fetch(`${BASE_URL_WEATHER}/history.json?key=${WEATHER_API}&q=${encodeURIComponent(decodedCity)}&dt=${dateStr}`);
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();
        const dayData = data?.forecast?.forecastday[0];
        dates.push(i === 0 ? 'Today' : i === 1 ? 'Yesterday' : `${i} days ago`);
        temperatures.push(dayData.day.avgtemp_c);
        humidities.push(dayData.day.avghumidity);
      }
      setHistoricalData({
        labels: dates,
        temperatures: temperatures,
        humidity: humidities,
      });
    }
    catch (error) {
      console.error(`Error fetching historical data: ${error}`);
    }
  };
  useEffect(() => {
    const weatherAlertInterval = setInterval(() => {
      const alerts = [
        'Storm Warning in ' + decodedCity,
        'Heavy Rain Expected in ' + decodedCity,
        'Extreme Heat Alert in ' + decodedCity,
      ];
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      dispatch(addNotification({
        id: uuidv4(),
        type: 'weather_alert',
        message: randomAlert,
        timestamp: Date.now(),
      }));
    }, 60000);

    const fetchAllWeatherData = () => {
      fetchCurrentWeather();
      fetchHistoricalWeatherData();
      console.log('Weather data updated at:', new Date().toLocaleString());
    }
    fetchAllWeatherData();
    const currentWeatherInterval = setInterval(() => {
      fetchCurrentWeather();
    }, 60000)

    const historicalWeatherDataInterval = setInterval(() => {
      fetchHistoricalWeatherData();
    }, 3600000)
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0];
      const formattedTime = now.toTimeString().split(' ')[0];
      setCurrentDateTime(`${formattedDate} ${formattedTime} `);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => {
      clearInterval(currentWeatherInterval);
      clearInterval(historicalWeatherDataInterval);
      clearInterval(interval)
      clearInterval(weatherAlertInterval)
    };
  }, [decodedCity, dispatch]);

  // Helper function to render weather icon based on condition
  const renderWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="text-yellow-400" size={48} />;
      case 'cloudy':
        return <Cloud className="text-gray-400" size={48} />;
      case 'rainy':
        return <CloudRain className="text-blue-400" size={48} />;
      default:
        return <Cloud className="text-gray-400" size={48} />;
    }
  };

  // Chart data
  const temperatureChartData = {
    labels: historicalData.labels,
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: historicalData.temperatures,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Humidity (%)',
        data: historicalData.humidity,
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
        text: '7-Day Weather History',
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

  return (
    <main className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container py-8 px-4 mx-auto">
        {loading && <p className="text-center">Loading weather data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {
          <>
            <Link href="/" className="inline-flex items-center mb-6 text-blue-400 hover:text-blue-300">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Link>

            <div className="flex flex-col justify-between items-start mb-8 md:flex-row">
              <div>
                <h1 className="mb-2 text-3xl font-bold">
                  {decodedCity} Weather
                </h1>
                <p className="text-gray-400">Last updated: {currentDateTime}</p>
              </div>
            </div>

            {/* Current Weather Card */}
            <div className="p-6 mb-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex items-center">
                  {renderWeatherIcon(currentWeather.condition)}
                  <div className="ml-4">
                    <div className="text-4xl font-bold">{currentWeather.temp}</div>
                    <div className="text-gray-400">{currentWeather.condition}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-1 text-gray-400">
                      <Droplets size={16} className="mr-2 text-blue-400" />
                      Humidity
                    </div>
                    <div className="text-xl">{currentWeather.humidity}</div>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-1 text-gray-400">
                      <Wind size={16} className="mr-2 text-blue-300" />
                      Wind
                    </div>
                    <div className="text-xl">{currentWeather.wind}</div>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-1 text-gray-400">
                      <Thermometer size={16} className="mr-2 text-red-400" />
                      Feels Like
                    </div>
                    <div className="text-xl">{currentWeather.feelsLike}</div>
                  </div>

                  <div className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center mb-1 text-gray-400">
                      <Cloud size={16} className="mr-2 text-gray-400" />
                      Pressure
                    </div>
                    <div className="text-xl">{currentWeather.pressure}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Weather Chart */}
            <div className="p-6 mb-8 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
              <h2 className="mb-6 text-xl font-semibold">Historical Weather Data</h2>

              <div className="h-80">
                <Line options={chartOptions} data={temperatureChartData} />
              </div>
            </div>

            {/* Historical Weather Table */}
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
              <h2 className="mb-6 text-xl font-semibold">7-Day Weather History</h2>

              <div className="overflow-x-auto">
                <table className="overflow-hidden min-w-full bg-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-gray-600">
                      <th className="py-3 px-4 text-left">Day</th>
                      <th className="py-3 px-4 text-left">Temperature</th>
                      <th className="py-3 px-4 text-left">Humidity</th>
                      <th className="py-3 px-4 text-left">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.labels.map((day, index) => (
                      <tr key={index} className="border-t border-gray-600">
                        <td className="py-3 px-4">{day}</td>
                        <td className="py-3 px-4">{historicalData.temperatures[index]}°C</td>
                        <td className="py-3 px-4">{historicalData.humidity[index]}%</td>
                        <td className="py-3 px-4">
                          {index === 7 ? 'Sunny' :
                            index === 6 ? 'Cloudy' :
                              index === 5 ? 'Sunny' :
                                index === 4 ? 'Sunny' :
                                  index === 3 ? 'Rainy' :
                                    index === 2 ? 'Cloudy' :
                                      index === 1 ? 'Sunny' : 'Cloudy'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        }
      </div>
    </main>
  );
}
