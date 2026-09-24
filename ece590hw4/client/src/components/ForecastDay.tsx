import { Image, StyleSheet, Text, View } from 'react-native';
import { conditionIconUrl, formatDay, formatTemp } from '../format';
import { colors, fonts } from '../theme';
import type { ForecastDayData } from '../types';

interface ForecastDayProps {
  day: ForecastDayData;
  useMetric: boolean;
}

export function ForecastDay({ day, useMetric }: ForecastDayProps) {
  const high = useMetric ? day.day.maxtemp_c : day.day.maxtemp_f;
  const low = useMetric ? day.day.mintemp_c : day.day.mintemp_f;

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatDay(day.date)}</Text>
      <Image
        style={styles.icon}
        source={{ uri: conditionIconUrl(day.day.condition.icon) }}
        accessibilityLabel={day.day.condition.text}
      />
      <Text style={styles.temp}>H: {formatTemp(high, useMetric)}</Text>
      <Text style={styles.temp}>L: {formatTemp(low, useMetric)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: colors.forecast,
    borderRadius: 4,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.text,
  },
  icon: {
    width: 64,
    height: 64,
  },
  temp: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
});
