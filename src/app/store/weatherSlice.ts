import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherCity {
  name: string;
  temp: string;
  humidity: string;
  condition: string;
  isFavorite: boolean;
}

interface WeatherState {
  cities: WeatherCity[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<WeatherCity[]>) {
      state.cities = action.payload;
      state.loading = false;
      state.error = null;
    },
    setWeatherLoading(state) {
      state.loading = true;
    },
    setWeatherError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setWeatherData, setWeatherLoading, setWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
