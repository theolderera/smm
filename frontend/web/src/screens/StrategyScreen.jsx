// frontend/web/src/screens/StrategyScreen.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { generateStrategy, confirmStrategy } from '../store/slices/strategySlice';
import { COLORS, SIZES, FONTS, SOCIAL_PLATFORMS } from '../utils/constants';
import Button from '../components/Button';

const StrategyScreen = ({ navigate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { strategy, strategyStatus, error } = useSelector((state) => state.strategy);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    if (strategyStatus === 'idle') {
      dispatch(generateStrategy());
    }
  }, [strategyStatus, dispatch]);

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleConfirmStrategy = async () => {
    try {
      await dispatch(confirmStrategy({ platforms: selectedPlatforms, strategy })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Strategy confirmation error:', err);
    }
  };

  const renderPlatformItem = (item) => (
    <div
      style={[
        styles.platformItem,
        selectedPlatforms.includes(item.id) && styles.selectedPlatform,
      ]}
      onClick={() => handlePlatformToggle(item.id)}
    >
      <p style={styles.platformName}>{item.name}</p>
    </div>
  );

  const renderContentPlan = (item) => (
    <div style={styles.contentItem}>
      <p style={styles.contentDate}>{item.date}</p>
      <p style={styles.contentType}>{t(`strategy.contentTypes.${item.type}`)}</p>
      <p style={styles.contentDescription}>{item.description}</p>
      <p style={styles.contentHashtags}>{item.hashtags.join(' ')}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('strategy.title')}</h1>
      <p style={styles.subtitle}>{t('strategy.subtitle')}</p>

      {strategyStatus === 'loading' && (
        <div style={styles.loader}>Loading...</div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {strategyStatus === 'succeeded' && (
        <>
          <h2 style={styles.sectionTitle}>{t('strategy.platforms')}</h2>
          <div style={styles.platformList}>
            {SOCIAL_PLATFORMS.map((item) => renderPlatformItem(item))}
          </div>

          <h2 style={styles.sectionTitle}>{t('strategy.contentPlan')}</h2>
          <div style={styles.contentList}>
            {strategy.contentPlan.map((item) => renderContentPlan(item))}
          </div>

          <Button
            title={t('strategy.confirm')}
            onPress={handleConfirmStrategy}
            disabled={selectedPlatforms.length === 0 || strategyStatus === 'loading'}
          />
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
  platformList: {
    display: 'flex',
    gap: SIZES.margin.small,
    overflowX: 'auto',
    padding: `${SIZES.padding.small}px 0`,
  },
  platformItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.small,
    border: `1px solid ${COLORS.textLight}`,
    cursor: 'pointer',
  },
  selectedPlatform: {
    border: `2px solid ${COLORS.primary}`,
  },
  platformName: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
  },
  contentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: SIZES.margin.regular,
    paddingBottom: SIZES.padding.large,
  },
  contentItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    border: `1px solid ${COLORS.textLight}`,
  },
  contentDate: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    marginBottom: SIZES.margin.small,
  },
  contentType: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.primary,
    marginBottom: SIZES.margin.small,
  },
  contentDescription: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.text,
    marginBottom: SIZES.margin.small,
  },
  contentHashtags: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.textLight,
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

export default StrategyScreen;