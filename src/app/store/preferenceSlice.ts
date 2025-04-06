import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

interface PreferencesState {
  favoriteCities: string[];
  favoriteCryptos: string[];
}
const getInitialState = (): PreferencesState => {
  if (typeof window !== 'undefined') {
    return {
      favoriteCities: JSON.parse(localStorage.getItem('favoriteCities') || '[]'),
      favoriteCryptos: JSON.parse(localStorage.getItem('favoriteCryptos') || '[]'),
    };
  }
  return { favoriteCities: [], favoriteCryptos: [] };
};
const initialState: PreferencesState = getInitialState();
const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleCityFavorite(state, action: PayloadAction<string>) {
      const city = action.payload;
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter(c => c !== city);
      } else {
        state.favoriteCities.push(city);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
      }
    },
    toggleCryptoFavorite(state, action: PayloadAction<string>) {
      const crypto = action.payload;
      if (state.favoriteCryptos.includes(crypto)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(c => c !== crypto);
      } else {
        state.favoriteCryptos.push(crypto);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteCryptos', JSON.stringify(state.favoriteCryptos));
      }
    },
    addFavouriteCity(state, action: PayloadAction<string>) {
      const city = action.payload;
      if (!state.favoriteCities.includes(city)) {
        state.favoriteCities.push(city);
        if (typeof window !== 'undefined') {
          localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        }
      }
    },
    addFavouriteCrypto(state, action: PayloadAction<string>) {

      const crypto = action.payload;
      if (!state.favoriteCryptos.includes(crypto)) {
        state.favoriteCryptos.push(crypto);
        if (typeof window !== 'undefined') {
          localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        }
      }
    }
  },
});

export const { toggleCityFavorite, toggleCryptoFavorite, addFavouriteCrypto, addFavouriteCity } = preferencesSlice.actions;
export default preferencesSlice.reducer;
