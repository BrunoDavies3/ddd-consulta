import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchInput({
  value,
  onChangeText,
  onSearch,
  loading,
}: SearchInputProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Ex: 11"
          placeholderTextColor="#4A5568"
          keyboardType="numeric"
          maxLength={2}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          editable={!loading}
          accessibilityLabel="Campo de código DDD"
          accessibilityHint="Insira 2 dígitos numéricos do código de área"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onSearch}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Buscar DDD"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#0D1117" />
          ) : (
            <Text style={styles.buttonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.hint}>Digite o DDD com 2 dígitos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  inputRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 22,
    fontWeight: '600',
    color: '#E6EDF3',
    textAlign: 'center',
    letterSpacing: 4,
  },
  button: {
    height: 52,
    paddingHorizontal: 24,
    backgroundColor: '#58A6FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#0D1117', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  hint: { marginTop: 6, fontSize: 12, color: '#4A5568', textAlign: 'center' },
});