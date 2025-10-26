// frontend/web/src/screens/AnalyticsScreen.jsx

import React, { useEffect } from 'react';
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

  const renderMetricItem = (item) => (
    <div style={styles.metricItem}>
      <p style={styles.metricLabel}>{t(`analytics.metrics.${item.key}`)}</p>
      <p style={styles.metricValue}>{item.value}</p>
      <p style={styles.metricTrend}>{item.trend > 0 ? `+${item.trend}%` : `${item.trend}%`}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('analytics.title')}</h1>
      <p style={styles.subtitle}>{t('analytics.subtitle')}</p>

      {analyticsStatus === 'loading' && (
        <div style={styles.loader}>Loading...</div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {analyticsStatus === 'succeeded' && (
        <>
          <h2 style={styles.sectionTitle}>{t('analytics.metrics')}</h2>
          <div style={styles.metricList}>
            {dashboardData.kpis.map((item) => renderMetricItem(item))}
          </div>

          <h2 style={styles.sectionTitle}>{t('analytics.predictions')}</h2>
          <div style={styles.predictionContainer}>
            <p style={styles.predictionText}>
              {t('analytics.predictionText', { growth: dashboardData.predictions.growth || 0 })}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: SIZES.padding.regular,
    backgroundColor: COLORS.background,
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
    margin: `${SIZES.margin.regular}px 0`,
  },
  metricList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: SIZES.margin.regular,
    paddingBottom: SIZES.padding.large,
  },
  metricItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    border: `1px solid ${COLORS.textLight}`,
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
    border: `1px solid ${COLORS.textLight}`,
  },
  predictionText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
  },
  loader: {
    textAlign: 'center',
    margin: `${SIZES.margin.large}px 0`,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.error,
    marginBottom: SIZES.margin.regular,
    textAlign: 'center',
  },
};

export default AnalyticsScreen;