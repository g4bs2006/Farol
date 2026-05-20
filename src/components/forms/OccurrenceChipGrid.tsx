import React from 'react';
import { View, StyleSheet } from 'react-native';
import Chip from '../ui/Chip';

const OCCURRENCE_TYPES = ['Assédio verbal', 'Assédio físico', 'Perseguição', 'Outro'] as const;
export type OccurrenceType = typeof OCCURRENCE_TYPES[number];

interface OccurrenceChipGridProps {
  selected: OccurrenceType[];
  onChange: (selected: OccurrenceType[]) => void;
}

export default function OccurrenceChipGrid({ selected, onChange }: OccurrenceChipGridProps) {
  const toggle = (type: OccurrenceType) => {
    if (selected.includes(type)) {
      // Manter pelo menos 1 selecionado
      if (selected.length === 1) return;
      onChange(selected.filter(t => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  return (
    <View style={styles.grid}>
      {OCCURRENCE_TYPES.map(type => (
        <View key={type} style={styles.cell}>
          <Chip
            label={type}
            selected={selected.includes(type)}
            onPress={() => toggle(type)}
            variant="soft"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  cell: {
    width: '48%',
  },
});
