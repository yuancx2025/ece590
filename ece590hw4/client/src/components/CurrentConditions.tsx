import { StyleSheet, Text, View } from 'react-native';
import { formatClock, formatLocation, formatTemp, formatWindSpeed } from '../format';
import { colors, fonts } from '../theme';
import type { WeatherData } from '../types';

interface CurrentConditionsProps {
  weather: WeatherData;
  zip: string;
  fromFavorite: boolean;
  useMetric: boolean;
}

export function CurrentConditions({
  weather,
  zip,
  fromFavorite,
  useMetric,
}: CurrentConditionsProps) {
  const today = weather.forecast.forecastday[0];
  const temp = formatTemp(useMetric ? weather.current.temp_c : weather.current.temp_f, useMetric);
  const feelsLike = formatTemp(
    useMetric ? weather.current.feelslike_c : weather.current.feelslike_f,
    useMetric,
  );
  const windSpeed = formatWindSpeed(useMetric ? weather.current.wind_kph : weather.current.wind_mph);
  const location = formatLocation(
    weather.location.name,
    weather.location.region,
    fromFavorite ? zip : undefined,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{temp}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.feelsLike}>Feels like {feelsLike}</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Sunrise:</Text>
          <Text style={styles.detailValue}>{today ? formatClock(today.astro.sunrise) : ''}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>
            {windSpeed} {useMetric ? 'KPH' : 'MPH'}
          </Text>
          <Text style={styles.detailValue}>{weather.current.wind_dir}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Sunset:</Text>
          <Text style={styles.detailValue}>{today ? formatClock(today.astro.sunset) : ''}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  temp: {
    fontFamily: fonts.regular,
    fontSize: 64,
    lineHeight: 72,
    color: colors.text,
  },
  location: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
  },
  feelsLike: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.text,
  },
  detailsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detail: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
  },
  detailValue: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
});
