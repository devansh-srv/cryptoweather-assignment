import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCryptoData, setCryptoLoading, setCryptoError } from './cryptoSlice';
const BASE_URL_CRYPTO = 'https://min-api.cryptocompare.com';
// const CRYPTO_API = process.env.NEXT_PUBLIC_CRYPTO_API;

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setCryptoLoading());
      const coins = ['BTC', 'ETH', 'SOL'];
      const responses = await Promise.all(
        coins.map(async coin => {
          const response = await fetch(`${BASE_URL_CRYPTO}/data/pricemultifull?fsyms=${coin}&tsyms=USD`);
          if (!response.ok) {
            throw new Error(`Crypto API failed for ${coin}: ${response.status}`);
          }
          const data = await response.json();
          const coinData = data.RAW[coin].USD;
          return {
            name: coin === 'BTC' ? 'Bitcoin' : coin === 'ETH' ? 'Ethereum' : 'Solana',
            symbol: coin,
            price: `$${coinData.PRICE.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            change: `${coinData.CHANGEPCT24HOUR >= 0 ? '+' : ''}${coinData.CHANGEPCT24HOUR.toFixed(2)}%`,
            marketCap: `$${(coinData.MKTCAP / 1e9).toFixed(2)}B`,
          };
        })
      );
      dispatch(setCryptoData(responses));
    } catch (error: any) {
      dispatch(setCryptoError(error.message));
      return rejectWithValue(error.message);
    }
  }
);
