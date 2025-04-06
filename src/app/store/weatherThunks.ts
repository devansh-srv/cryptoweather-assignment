import { createAsyncThunk } from '@reduxjs/toolkit';
import { setWeatherData, setWeatherLoading, setWeatherError } from './weatherSlice';

const BASE_URL_WEATHER = 'http://api.weatherapi.com/v1';
const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API;

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setWeatherLoading());
      const cities = ['New York', 'London', 'Tokyo'];
      const responses = await Promise.all(
        cities.map(async city => {
          const response = await fetch(`${BASE_URL_WEATHER}/current.json?key=${WEATHER_API}&q=${encodeURIComponent(city)}&aqi=no`);
          if (!response.ok) {
            throw new Error(`Weather API failed for ${city}: ${response.status}`);
          }
          const data = await response.json();
          return {
            name: city,
            temp: `${data.current.temp_c}°C`,
            humidity: `${data.current.humidity}%`,
            condition: data.current.condition.text,
            isFavorite: false,
          };
        })
      );
      dispatch(setWeatherData(responses));
    } catch (error: any) {
      dispatch(setWeatherError(error.message));
      return rejectWithValue(error.message);
    }
  }
);
