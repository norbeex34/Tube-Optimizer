import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: '1px solid #ccc', paddingBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 12, color: '#64748b', marginTop: 4 },
  section: { marginVertical: 10, padding: 8, backgroundColor: '#f8fafc', borderRadius: 4 },
  barTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 6, color: '#334155' },
  stats: { fontSize: 10, color: '#475569', marginBottom: 4 },
  cutList: { fontSize: 12, marginTop: 4, flexDirection: 'row', flexWrap: 'wrap' },
  cutItem: { marginRight: 10, padding: 4, backgroundColor: '#e2e8f0', borderRadius: 2, fontSize: 10 },
  summary: { marginTop: 30, padding: 10, borderTop: '2px solid #334155' },
  summaryText: { fontSize: 14, fontWeight: 'bold' }
});

export const PDFReport = ({ results, stockLength }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Plan de Corte - Nesting Pro</Text>
        <Text style={styles.subtitle}>Largo de Barra Estándar: {stockLength}mm</Text>
      </View>

      {results.map((bin, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.barTitle}>Barra #{bin.id}</Text>
          <Text style={styles.stats}>
             Uso: {(((bin.totalLength - bin.freeSpace) / bin.totalLength) * 100).toFixed(1)}% | 
             Sobrante: {bin.freeSpace}mm
          </Text>
          <View style={styles.cutList}>
            <Text style={{fontSize: 10, marginBottom: 4}}>Cortes a realizar:</Text>
            {bin.cuts.map((cut, idx) => (
              <Text key={idx} style={styles.cutItem}>{cut}mm</Text>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total de Barras Necesarias: {results.length}</Text>
      </View>
    </Page>
  </Document>
);