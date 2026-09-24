import { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatTemp } from '../format';
import { colors, fonts } from '../theme';
import type { Favorite, SearchStatus, WeatherData } from '../types';

interface SearchModalProps {
  visible: boolean;
  draftZip: string;
  searchStatus: SearchStatus;
  searchResult?: WeatherData;
  favorites: Favorite[];
  loadingFavoriteId?: string;
  useMetric: boolean;
  onChangeZip: (zip: string) => void;
  onCancel: () => void;
  onSelectResult: () => void;
  onSelectFavorite: (favorite: Favorite) => void;
  onRemoveFavorite: (favorite: Favorite) => void;
}

export function SearchModal({
  visible,
  draftZip,
  searchStatus,
  searchResult,
  favorites,
  loadingFavoriteId,
  useMetric,
  onChangeZip,
  onCancel,
  onSelectResult,
  onSelectFavorite,
  onRemoveFavorite,
}: SearchModalProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(id);
    }
  }, [visible]);

  const renderFavorite = ({ item }: { item: Favorite }) => {
    const isLoading = loadingFavoriteId === item.id;

    return (
      <View style={styles.favoriteRow}>
        <Pressable
          style={styles.favoritePress}
          onPress={() => onSelectFavorite(item)}
          disabled={Boolean(loadingFavoriteId)}
          accessibilityRole="button"
        >
          {isLoading ? (
            <ActivityIndicator color={colors.navy} />
          ) : (
            <Text style={styles.favoriteZip}>{item.zip}</Text>
          )}
        </Pressable>
        <Pressable
          style={styles.removeButton}
          onPress={() => onRemoveFavorite(item)}
          disabled={isLoading}
          accessibilityRole="button"
        >
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.searchRow}>
            <View style={styles.inputWrap}>
              <FontAwesome name="search" size={18} color={colors.muted} />
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={draftZip}
                onChangeText={onChangeZip}
                placeholder="Enter a zip code"
                placeholderTextColor={colors.muted}
                keyboardType="number-pad"
                maxLength={5}
                returnKeyType="search"
              />
            </View>
            <Pressable onPress={onCancel} accessibilityRole="button">
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>

          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavorite}
            style={styles.flex}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View style={styles.results}>
                {searchStatus === 'loading' && !loadingFavoriteId ? (
                  <ActivityIndicator size="large" color={colors.navy} style={styles.spinner} />
                ) : null}

                {searchStatus === 'error' ? (
                  <Text style={styles.notFound}>Location not found.</Text>
                ) : null}

                {searchStatus === 'found' && searchResult ? (
                  <Pressable
                    style={styles.resultCard}
                    onPress={onSelectResult}
                    accessibilityRole="button"
                  >
                    <Text style={styles.resultLocation}>
                      {searchResult.location.name}, {searchResult.location.region}
                    </Text>
                    <Text style={styles.resultTemp}>
                      {formatTemp(
                        useMetric ? searchResult.current.temp_c : searchResult.current.temp_f,
                        useMetric,
                      )}
                    </Text>
                  </Pressable>
                ) : null}

                <Text style={styles.favoritesTitle}>Favorites</Text>
                {favorites.length === 0 ? (
                  <Text style={styles.emptyFavorites}>No favorites yet.</Text>
                ) : null}
              </View>
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 6,
  },
  cancel: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.navy,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  results: {
    minHeight: 80,
    marginBottom: 8,
  },
  spinner: {
    marginVertical: 24,
  },
  notFound: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.error,
    marginVertical: 16,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    gap: 6,
  },
  resultLocation: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.text,
  },
  resultTemp: {
    fontFamily: fonts.regular,
    fontSize: 22,
    color: colors.text,
  },
  favoritesTitle: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: colors.text,
    marginBottom: 10,
  },
  emptyFavorites: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.muted,
    marginBottom: 8,
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    gap: 12,
  },
  favoritePress: {
    flex: 1,
    minHeight: 28,
    justifyContent: 'center',
  },
  favoriteZip: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.text,
  },
  removeButton: {
    backgroundColor: colors.navy,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  removeText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.surface,
  },
});
