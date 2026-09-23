import { useEffect, useState } from 'react';
import { addFavorite, deleteFavorite, fetchFavorites, fetchWeather, getWeatherApiKey } from './api';
import { CurrentConditions } from './components/CurrentConditions';
import { FavoritesControls } from './components/FavoritesControls';
import { Forecast } from './components/Forecast';
import { ZipSearch } from './components/ZipSearch';
import type { Favorite, WeatherData } from './types';
import './App.css';

const US_ZIP = /^\d{5}$/;

export default function App() {
  const [zip, setZip] = useState('27513');
  const [submittedZip, setSubmittedZip] = useState<string | undefined>(undefined);
  const [weather, setWeather] = useState<WeatherData | undefined>(undefined);
  const [useMetric, setUseMetric] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState('');
  const [fromFavorite, setFromFavorite] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const nextFavorites = await fetchFavorites();
        setFavorites(nextFavorites);
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Could not load favorites.');
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    if (!submittedZip) {
      return;
    }

    if (!getWeatherApiKey()) {
      setStatus('Add your WeatherAPI key to the client .env file.');
      setWeather(undefined);
      return;
    }

    const doGetWeather = async () => {
      setStatus('Loading…');
      try {
        const data = await fetchWeather(submittedZip);
        setWeather(data);
        setUseMetric(false);
        setStatus('');
      } catch (error) {
        setWeather(undefined);
        setStatus(error instanceof Error ? error.message : 'Network error. Try again.');
      }
    };

    doGetWeather();
  }, [submittedZip]);

  const handleGetForecast = () => {
    const nextZip = zip.trim();
    if (nextZip === '') {
      setStatus('Enter a zip code.');
      setWeather(undefined);
      setSubmittedZip(undefined);
      return;
    }

    setFromFavorite(false);
    setSubmittedZip(nextZip);
  };

  const handleAddFavorite = async () => {
    const nextZip = zip.trim();
    if (!US_ZIP.test(nextZip)) {
      setStatus('Enter a valid 5-digit US zip code.');
      return;
    }

    try {
      const favorite = await addFavorite(nextZip);
      const nextFavorites = await fetchFavorites();
      setFavorites(nextFavorites);
      setSelectedFavoriteId(favorite.id);
      setStatus('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not add favorite.');
    }
  };

  const handleDeleteFavorite = async () => {
    const favorite =
      favorites.find((item) => item.id === selectedFavoriteId) ??
      favorites.find((item) => item.zip === zip.trim());

    if (!favorite) {
      setStatus('Select a favorite to delete.');
      return;
    }

    try {
      await deleteFavorite(favorite.id);
      const nextFavorites = await fetchFavorites();
      setFavorites(nextFavorites);
      setSelectedFavoriteId('');
      if (fromFavorite && favorite.zip === zip.trim()) {
        setFromFavorite(false);
      }
      setStatus('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not delete favorite.');
    }
  };

  const handleGoToFavorite = (favoriteZip: string) => {
    setZip(favoriteZip);
    setFromFavorite(true);
    setSubmittedZip(favoriteZip);
  };

  const handleToggleUnits = () => {
    if (!weather) {
      return;
    }
    setUseMetric((current) => !current);
  };

  return (
    <div className="app">
      <ZipSearch zip={zip} onZipChange={setZip} onGetForecast={handleGetForecast} />

      {status && <p className="status">{status}</p>}

      <CurrentConditions
        weather={weather}
        zip={submittedZip ?? zip}
        fromFavorite={fromFavorite}
        useMetric={useMetric}
        onToggleUnits={handleToggleUnits}
      />

      {weather && <Forecast days={weather.forecast.forecastday} useMetric={useMetric} />}

      <FavoritesControls
        favorites={favorites}
        selectedFavoriteId={selectedFavoriteId}
        onSelectedFavoriteChange={setSelectedFavoriteId}
        onAddFavorite={handleAddFavorite}
        onDeleteFavorite={handleDeleteFavorite}
        onGoToFavorite={handleGoToFavorite}
      />
    </div>
  );
}
