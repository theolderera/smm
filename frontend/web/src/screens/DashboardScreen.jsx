// frontend/web/src/screens/DashboardScreen.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchDashboardData } from '../store/slices/analyticsSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';
import Button from '../components/Button';

const DashboardScreen = ({ navigate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dashboardData, analyticsStatus, error } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (analyticsStatus === 'idle') {
      dispatch(fetchDashboardData());
    }
  }, [analyticsStatus, dispatch]);

  const renderKPIItem = (item) => (
    <div style={styles.kpiItem}>
      <p style={styles.kpiLabel}>{t(`dashboard.kpis.${item.key}`)}</p>
      <p style={styles.kpiValue}>{item.value}</p>
    </div>
  );

  const renderRecommendationItem = (item) => (
    <div style={styles.recommendationItem}>
      <p style={styles.recommendationText}>{item.text}</p>
      <Button
        title={t('dashboard.apply')}
        onPress={() => navigate(item.actionScreen)}
        style={styles.actionButton}
      />
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('dashboard.title')}</h1>
      <p style={styles.subtitle}>{t('dashboard.subtitle')}</p>

      {analyticsStatus === 'loading' && (
        <div style={styles.loader}>Loading...</div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {analyticsStatus === 'succeeded' && (
        <>
          <h2 style={styles.sectionTitle}>{t('dashboard.kpis')}</h2>
          <div style={styles.kpiList}>
            {dashboardData.kpis.map((item) => renderKPIItem(item))}
          </div>

          <h2 style={styles.sectionTitle}>{t('dashboard.recommendations')}</h2>
          <div style={styles.recommendationList}>
            {dashboardData.recommendations.map((item) => renderRecommendationItem(item))}
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
  kpiList: {
    display: 'flex',
    gap: SIZES.margin.regular,
    overflowX: 'auto',
    padding: `${SIZES.padding.small}px 0`,
  },
  kpiItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    border: `1px solid ${COLORS.textLight}`,
    minWidth: '120px',
    textAlign: 'center',
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
    display: 'flex',
    flexDirection: 'column',
    gap: SIZES.margin.regular,
    paddingBottom: SIZES.padding.large,
  },
  recommendationItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    border: `1px solid ${COLORS.textLight}`,
  },
  recommendationText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    marginBottom: SIZES.margin.regular,
  },
  actionButton: {
    backgroundColor: COLORS.secondary,
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

export default DashboardScreen;