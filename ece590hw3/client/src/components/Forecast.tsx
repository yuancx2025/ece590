import type { ForecastDayData } from '../types';
import { ForecastDay } from './ForecastDay';

interface ForecastProps {
  days: ForecastDayData[];
  useMetric: boolean;
}

export function Forecast({ days, useMetric }: ForecastProps) {
  return (
    <section className="forecast">
      <h2>3 Day Forecast</h2>
      <div className="forecast-row">
        {days.map((day) => (
          <ForecastDay key={day.date} day={day} useMetric={useMetric} />
        ))}
      </div>
    </section>
  );
}
