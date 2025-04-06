import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoState {
  coins: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  coins: [],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData(state, action: PayloadAction<any[]>) {
      state.coins = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCryptoLoading(state) {
      state.loading = true;
    },
    setCryptoError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateCryptoPrice(state, action: PayloadAction<{ symbol: string; price: number; changePct: number; volume24h: number }>) {
      state.coins = state.coins.map(coin =>
        coin.symbol === action.payload.symbol
          ? {
            ...coin,
            price: `$${action.payload.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            change: `${action.payload.changePct >= 0 ? '+' : ''}${action.payload.changePct.toFixed(2)}%`,
            volume24h: `$${action.payload.volume24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          }
          : coin
      );
    },
  },
});

export const { setCryptoData, setCryptoLoading, setCryptoError, updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
