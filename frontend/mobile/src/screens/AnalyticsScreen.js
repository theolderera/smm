// frontend/mobile/src/screens/AnalyticsScreen.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchDashboardData } from '../store/slices/analyticsSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const AnalyticsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dashboardData, analyticsStatus, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (analyticsStatus === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [analyticsStatus, dispatch]);

  const renderMetricItem = ({ item }) => (
    <View style={styles.metricItem}>
      <Text style={styles.metricLabel}>{t(`analytics.metrics.${item.key}`)}</Text>
      <Text style={styles.metricValue}>{item.value}</Text>
      <Text style={styles.metricTrend}>{item.trend > 0 ? `+${item.trend}%` : `${item.trend}%`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('analytics.title')}</Text>
      <Text style={styles.subtitle}>{t('analytics.subtitle')}</Text>

      {analyticsStatus === 'loading' && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {analyticsStatus === 'succeeded' && (
        <>
          <Text style={styles.sectionTitle}>{t('analytics.metrics')}</Text>
          <FlatList
            data={dashboardData.kpis}
            renderItem={renderMetricItem}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.metricList}
          />

          <Text style={styles.sectionTitle}>{t('analytics.predictions')}</Text>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              {t('analytics.predictionText', { growth: dashboardData.predictions.growth || 0 })}
            </Text>
          </View>
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
  metricList: {
    paddingBottom: SIZES.padding.large,
  },
  metricItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    marginBottom: SIZES.margin.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  metricLabel: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.textLight,
    marginBottom: SIZES.margin.small,
  },
  metricValue: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.large,
    color: COLORS.primary,
  },
  metricTrend: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.secondary,
    marginTop: SIZES.margin.small,
  },
  predictionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  predictionText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
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

export default AnalyticsScreen;