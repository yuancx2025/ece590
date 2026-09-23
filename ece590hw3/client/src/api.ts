import type { Favorite, WeatherData } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? '';

export function getWeatherApiKey(): string {
  return WEATHER_API_KEY;
}

export async function fetchWeather(zip: string): Promise<WeatherData> {
  const url =
    'https://api.weatherapi.com/v1/forecast.json?key=' +
    encodeURIComponent(WEATHER_API_KEY) +
    '&q=' +
    encodeURIComponent(zip) +
    '&days=3';

  const res = await fetch(url);
  const data = (await res.json()) as WeatherData;

  if (!res.ok || data.error) {
    throw new Error(data.error?.message ?? 'Could not load the forecast.');
  }

  return data;
}

export async function fetchFavorites(): Promise<Favorite[]> {
  const res = await fetch(`${API_URL}/favorites`);
  if (!res.ok) {
    throw new Error('Could not load favorites.');
  }
  return (await res.json()) as Favorite[];
}

export async function addFavorite(zip: string): Promise<Favorite> {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ zip }),
  });
  const data = (await res.json()) as Favorite & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? 'Could not add favorite.');
  }
  return data;
}

export async function deleteFavorite(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/favorites/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? 'Could not delete favorite.');
  }
}
