import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

interface FavoriteHeartProps {
  isFavorite: boolean;
  onAddFavorite: () => void;
}

export function FavoriteHeart({ isFavorite, onAddFavorite }: FavoriteHeartProps) {
  if (isFavorite) {
    return (
      <View style={styles.row}>
        <FontAwesome name="heart" size={22} color={colors.heart} />
      </View>
    );
  }

  return (
    <Pressable onPress={onAddFavorite} style={styles.button} accessibilityRole="button">
      <FontAwesome name="heart-o" size={18} color={colors.surface} />
      <Text style={styles.buttonText}>Add to Favorites</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.navy,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.surface,
  },
});
