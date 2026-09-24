import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { WeatherData } from '../types';
import { colors, fonts } from '../theme';
import { CurrentConditions } from './CurrentConditions';
import { FavoriteHeart } from './FavoriteHeart';
import { Forecast } from './Forecast';
import { SearchBar } from './SearchBar';
import { UnitToggle } from './UnitToggle';

interface MainScreenProps {
  weather?: WeatherData;
  selectedZip?: string;
  fromFavorite: boolean;
  isFavorite: boolean;
  useMetric: boolean;
  onOpenSearch: () => void;
  onAddFavorite: () => void;
  onToggleUnits: () => void;
}

export function MainScreen({
  weather,
  selectedZip,
  fromFavorite,
  isFavorite,
  useMetric,
  onOpenSearch,
  onAddFavorite,
  onToggleUnits,
}: MainScreenProps) {
  const searchLabel = selectedZip ?? 'Search zip code';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.page}>
        <SearchBar label={searchLabel} onPress={onOpenSearch} />

        {weather && selectedZip ? (
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <CurrentConditions
              weather={weather}
              zip={selectedZip}
              fromFavorite={fromFavorite}
              useMetric={useMetric}
            />

            <View style={styles.actions}>
              <FavoriteHeart isFavorite={isFavorite} onAddFavorite={onAddFavorite} />
              <UnitToggle useMetric={useMetric} onToggle={onToggleUnits} />
            </View>

            <Forecast days={weather.forecast.forecastday} useMetric={useMetric} />
          </ScrollView>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Touch the search bar to enter a zip code</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  content: {
    paddingTop: 28,
    paddingBottom: 32,
    gap: 24,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
});
