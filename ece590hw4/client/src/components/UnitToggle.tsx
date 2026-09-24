import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme';

interface UnitToggleProps {
  useMetric: boolean;
  onToggle: () => void;
}

export function UnitToggle({ useMetric, onToggle }: UnitToggleProps) {
  return (
    <Pressable onPress={onToggle} style={styles.button} accessibilityRole="button">
      <Text style={styles.text}>{useMetric ? 'Switch to Imperial' : 'Switch to Metric'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.navy,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.surface,
  },
});
