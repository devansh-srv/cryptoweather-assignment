import WeatherDetailClient from './WeatherDetailClient';

export default async function CityWeatherDetail({ params }: { params: Promise<{ city: string }> }) {
  const awaitedParams = await params;
  const { city } = awaitedParams;
  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=${encodeURIComponent(city)}&aqi=no`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch initial weather data');
  }
  const initialData = await res.json();
  return (
    <>
      <WeatherDetailClient params={params} initialData={initialData} />
    </>
  );
}
