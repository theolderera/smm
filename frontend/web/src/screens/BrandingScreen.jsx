// frontend/web/src/screens/BrandingScreen.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { generateBranding, selectBranding } from '../store/slices/brandSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';
import Button from '../components/Button';

const BrandingScreen = ({ navigate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { brandingOptions, brandingStatus, error } = useSelector((state) => state.brand);
  const [selectedBranding, setSelectedBranding] = useState(null);

  useEffect(() => {
    if (brandingStatus === 'idle') {
      dispatch(generateBranding());
    }
  }, [brandingStatus, dispatch]);

  const handleSelectBranding = async (branding) => {
    setSelectedBranding(branding);
    try {
      await dispatch(selectBranding(branding)).unwrap();
      navigate('/strategy');
    } catch (err) {
      console.error('Branding selection error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('branding.title')}</h1>
      <p style={styles.subtitle}>{t('branding.subtitle')}</p>

      {brandingStatus === 'loading' && (
        <div style={styles.loader}>Loading...</div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {brandingStatus === 'succeeded' && (
        <div style={styles.brandingList}>
          {brandingOptions.map((item) => (
            <div
              key={item.id}
              style={[styles.brandingItem, selectedBranding?.id === item.id && styles.selectedBranding]}
              onClick={() => handleSelectBranding(item)}
            >
              <img src={item.logoUrl} style={styles.logo} alt={item.name} />
              <p style={styles.brandName}>{item.name}</p>
              <div style={styles.colorPalette}>
                {item.colors.map((color, index) => (
                  <div key={index} style={[styles.colorSwatch, { backgroundColor: color }]} />
                ))}
              </div>
              <p style={styles.brandVoice}>{t('branding.voice')}: {item.voice}</p>
            </div>
          ))}
        </div>
      )}

      <Button
        title={t('branding.submit')}
        onPress={() => selectedBranding && handleSelectBranding(selectedBranding)}
        disabled={!selectedBranding || brandingStatus === 'loading'}
      />
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
  brandingList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: SIZES.margin.regular,
  },
  brandingItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    border: `1px solid ${COLORS.textLight}`,
    cursor: 'pointer',
  },
  selectedBranding: {
    border: `2px solid ${COLORS.primary}`,
  },
  logo: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    margin: '0 auto',
    marginBottom: SIZES.margin.small,
  },
  brandName: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin.small,
  },
  colorPalette: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: SIZES.margin.small,
  },
  colorSwatch: {
    width: '30px',
    height: '30px',
    borderRadius: SIZES.radius.small,
    margin: `0 ${SIZES.margin.small}px`,
  },
  brandVoice: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.text,
    textAlign: 'center',
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

export default BrandingScreen;