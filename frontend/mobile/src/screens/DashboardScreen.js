// src/screens/DashboardScreen.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchDashboardData } from '../store/slices/analyticsSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const DashboardScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dashboardData, analyticsStatus, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (analyticsStatus === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [analyticsStatus, dispatch]);

  const renderKPIItem = ({ item }) => (
    <View style={styles.kpiItem}>
      <Text style={styles.kpiLabel}>{t(`dashboard.kpis.${item.key}`)}</Text>
      <Text style={styles.kpiValue}>{item.value}</Text>
    </View>
  );

  const renderRecommendationItem = ({ item }) => (
    <View style={styles.recommendationItem}>
      <Text style={styles.recommendationText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate(item.actionScreen)}
      >
        <Text style={styles.actionButtonText}>{t('dashboard.apply')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('dashboard.title')}</Text>
      <Text style={styles.subtitle}>{t('dashboard.subtitle')}</Text>

      {analyticsStatus === 'loading' && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {analyticsStatus === 'succeeded' && (
        <>
          <Text style={styles.sectionTitle}>{t('dashboard.kpis')}</Text>
          <FlatList
            data={dashboardData.kpis}
            renderItem={renderKPIItem}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.kpiList}
          />

          <Text style={styles.sectionTitle}>{t('dashboard.recommendations')}</Text>
          <FlatList
            data={dashboardData.recommendations}
            renderItem={renderRecommendationItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.recommendationList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding.regular,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.xlarge,
    color: COLORS.text,
    marginBottom: SIZES.margin.small,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.textLight,
    marginBottom: SIZES.margin.large,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.large,
    color: COLORS.text,
    marginVertical: SIZES.margin.regular,
  },
  kpiList: {
    paddingVertical: SIZES.padding.small,
  },
  kpiItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    marginRight: SIZES.margin.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    minWidth: 120,
    alignItems: 'center',
  },
  kpiLabel: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.textLight,
    marginBottom: SIZES.margin.small,
  },
  kpiValue: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.large,
    color: COLORS.primary,
  },
  recommendationList: {
    paddingBottom: SIZES.padding.large,
  },
  recommendationItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    marginBottom: SIZES.margin.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  recommendationText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    marginBottom: SIZES.margin.regular,
  },
  actionButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.small,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.white,
  },
  loader: {
    marginVertical: SIZES.margin.large,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.error,
    marginBottom: SIZES.margin.regular,
    textAlign: 'center',
  },
});

export default DashboardScreen;