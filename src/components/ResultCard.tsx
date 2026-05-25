import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { DDDResponse } from '../types/ddd.types';

interface ResultCardProps {
  ddd: string;
  data: DDDResponse;
}

export function ResultCard({ ddd, data }: ResultCardProps): React.JSX.Element {
  const sortedCities = [...data.cities].sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dddBadge}>
          <Text style={styles.dddLabel}>DDD</Text>
          <Text style={styles.dddValue}>{ddd}</Text>
        </View>
        <View style={styles.stateBadge}>
          <Text style={styles.stateLabel}>Estado (UF)</Text>
          <Text style={styles.stateValue}>{data.state}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.citiesHeader}>
        <Text style={styles.citiesTitle}>Municípios</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{sortedCities.length}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.citiesList}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {sortedCities.map((city, index) => (
          <View
            key={`${city}-${index}`}
            style={[styles.cityRow, index % 2 === 0 && styles.cityRowEven]}
          >
            <Text style={styles.cityIndex}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.cityName}>{city}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#161B22',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#30363D',
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', padding: 20, gap: 12 },
  dddBadge: {
    flex: 1,
    backgroundColor: '#0D1117',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#58A6FF40',
    padding: 14,
    alignItems: 'center',
  },
  dddLabel: { fontSize: 10, fontWeight: '600', color: '#58A6FF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  dddValue: { fontSize: 36, fontWeight: '800', color: '#58A6FF', letterSpacing: 2 },
  stateBadge: {
    flex: 2,
    backgroundColor: '#0D1117',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3FB95040',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateLabel: { fontSize: 10, fontWeight: '600', color: '#3FB950', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  stateValue: { fontSize: 28, fontWeight: '800', color: '#3FB950', letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#30363D', marginHorizontal: 20 },
  citiesHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 10 },
  citiesTitle: { fontSize: 13, fontWeight: '700', color: '#8B949E', letterSpacing: 1.5, textTransform: 'uppercase' },
  countBadge: { backgroundColor: '#21262D', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: '#30363D' },
  countText: { fontSize: 12, color: '#8B949E', fontWeight: '600' },
  citiesList: { maxHeight: 320 },
  cityRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, gap: 12 },
  cityRowEven: { backgroundColor: '#0D111730' },
  cityIndex: { fontSize: 11, color: '#4A5568', fontWeight: '600', width: 24 },
  cityName: { flex: 1, fontSize: 14, color: '#E6EDF3', fontWeight: '500' },
});