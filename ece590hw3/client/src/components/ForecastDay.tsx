import { conditionIconUrl, formatDay, formatTemp } from '../format';
import type { ForecastDayData } from '../types';

interface ForecastDayProps {
  day: ForecastDayData;
  useMetric: boolean;
}

export function ForecastDay({ day, useMetric }: ForecastDayProps) {
  const high = useMetric ? day.day.maxtemp_c : day.day.maxtemp_f;
  const low = useMetric ? day.day.mintemp_c : day.day.mintemp_f;

  return (
    <div className="forecast-card">
      <div className="forecast-date">{formatDay(day.date)}</div>
      <img
        className="forecast-icon"
        src={conditionIconUrl(day.day.condition.icon)}
        alt={day.day.condition.text}
      />
      <div>H: {formatTemp(high, useMetric)}</div>
      <div>L: {formatTemp(low, useMetric)}</div>
    </div>
  );
}
