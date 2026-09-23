import { formatClock, formatTemp, formatWindSpeed } from '../format';
import type { WeatherData } from '../types';
import { Button } from './Button';

interface CurrentConditionsProps {
  weather?: WeatherData;
  zip: string;
  fromFavorite: boolean;
  useMetric: boolean;
  onToggleUnits?: () => void;
}

export function CurrentConditions({
  weather,
  zip,
  fromFavorite,
  useMetric,
  onToggleUnits,
}: CurrentConditionsProps) {
  const today = weather?.forecast.forecastday[0];
  const temp = weather
    ? formatTemp(useMetric ? weather.current.temp_c : weather.current.temp_f, useMetric)
    : undefined;
  const feelsLike = weather
    ? formatTemp(
        useMetric ? weather.current.feelslike_c : weather.current.feelslike_f,
        useMetric,
      )
    : '-';
  const windSpeed = weather
    ? formatWindSpeed(useMetric ? weather.current.wind_kph : weather.current.wind_mph)
    : undefined;
  const location = weather
    ? fromFavorite
      ? `${weather.location.name}, ${weather.location.region} (${zip})`
      : `${weather.location.name}, ${weather.location.region}`
    : undefined;

  return (
    <section className="current-conditions">
      {location && temp && (
        <>
          <div className="current-temp">{temp}</div>
          <div className="current-location">{location}</div>
        </>
      )}

      <div className="feels-like">Feels like {feelsLike}</div>

      <div className="details-row">
        <div className="detail">
          <div>Sunrise:</div>
          <div>{today ? formatClock(today.astro.sunrise) : ''}</div>
        </div>
        <div className="detail">
          <div>Wind</div>
          {windSpeed && (
            <>
              <div>
                {windSpeed} {useMetric ? 'KPH' : 'MPH'}
              </div>
              <div>{weather?.current.wind_dir}</div>
            </>
          )}
        </div>
        <div className="detail">
          <div>Sunset:</div>
          <div>{today ? formatClock(today.astro.sunset) : ''}</div>
        </div>
      </div>

      <div className="units-row">
        <Button onClick={onToggleUnits}>
          {useMetric ? 'Switch to Imperial' : 'Switch to Metric'}
        </Button>
      </div>
    </section>
  );
}
