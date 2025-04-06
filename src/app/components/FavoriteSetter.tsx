'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFavouriteCity, addFavouriteCrypto } from '../store/preferenceSlice';

const FavoriteSetter = () => {
  const dispatch = useDispatch();
  const [cityInput, setCityInput] = useState('');
  const [cryptoInput, setCryptoInput] = useState('');

  const handleAddCity = () => {
    if (cityInput.trim()) {
      dispatch(addFavouriteCity(cityInput.trim()));
      setCityInput('');
    }
  };

  const handleAddCrypto = () => {
    if (cryptoInput.trim()) {
      dispatch(addFavouriteCrypto(cryptoInput.trim().toUpperCase()));
      setCryptoInput('');
    }
  };

  return (
    <div className="p-4 my-4 bg-gray-700 rounded-lg">
      <h3 className="mb-2 text-xl font-semibold">Add a Custom Favorite</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">City:</label>
          <div className="flex flex-col w-full sm:flex-row">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Enter city name"
              className="p-2 w-full min-w-0 text-white bg-gray-800 rounded-lg border border-gray-600 sm:rounded-r-none"
            />
            <button
              onClick={handleAddCity}
              className="flex-grow p-2 text-white bg-blue-600 rounded-l-lg border border-gray-600 transition-colors duration-200 hover:bg-blue-700 hover:border-blue-800"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-1">Crypto:</label>
          <div className="flex flex-col w-full sm:flex-row">
            <input
              type="text"
              value={cryptoInput}
              onChange={(e) => setCryptoInput(e.target.value)}
              placeholder="Enter crypto symbol (e.g., BTC)"
              className="p-2 w-full min-w-0 text-white bg-gray-800 rounded-lg border border-gray-600 sm:rounded-r-none"
            />
            <button
              onClick={handleAddCrypto}
              className="flex-grow p-2 text-white bg-yellow-600 rounded-l-lg border border-gray-600 transition-colors duration-200 hover:bg-yellow-700 hover:border-yellow-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteSetter;
