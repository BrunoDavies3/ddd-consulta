import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#2D1317',
    borderWidth: 1,
    borderColor: '#F8514930',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  icon: { fontSize: 16, color: '#F85149' },
  text: { flex: 1, fontSize: 14, color: '#FDA5A0', lineHeight: 20 },
});