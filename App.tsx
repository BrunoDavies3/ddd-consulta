import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDDD } from './src/hooks/useDDD';
import { SearchInput } from './src/components/SearchInput';
import { ResultCard } from './src/components/ResultCard';
import { ErrorMessage } from './src/components/ErrorMessage';

export default function App(): React.JSX.Element {
  const { ddd, setDDD, search, data, loading, error } = useDDD();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>BR</Text>
            </View>
            <Text style={styles.title}>Consulta DDD</Text>
            <Text style={styles.subtitle}>
              Descubra o estado e os municípios{'\n'}pelo código de área
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Código de Área</Text>
            <SearchInput
              value={ddd}
              onChangeText={setDDD}
              onSearch={search}
              loading={loading}
            />
          </View>

          {error !== null && (
            <View style={styles.section}>
              <ErrorMessage message={error} />
            </View>
          )}

          {data !== null && !loading && (
            <View style={styles.section}>
              <ResultCard ddd={ddd} data={data} />
            </View>
          )}

          {data === null && error === null && !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📡</Text>
              <Text style={styles.emptyText}>
                Nenhuma consulta realizada ainda.{'\n'}Digite um DDD e pressione Buscar.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0D1117' },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 40 },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 32 },
  logoBadge: {
    width: 56, height: 56, borderRadius: 14, backgroundColor: '#58A6FF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  logoText: { fontSize: 20, fontWeight: '900', color: '#0D1117', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '800', color: '#E6EDF3', letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6E7681', textAlign: 'center', lineHeight: 20 },
  section: { marginBottom: 20, width: '100%' },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: '#6E7681',
    letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
  },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#4A5568', textAlign: 'center', lineHeight: 22 },
});