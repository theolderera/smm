// frontend/web/src/screens/OnboardingScreen.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setupOnboarding } from '../store/slices/userSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';
import Button from '../components/Button';
import Input from '../components/Input';

const OnboardingScreen = ({ navigate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { onboardingStatus, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    businessName: '',
    goals: '',
    audience: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const onboardingData = {
        businessName: formData.businessName,
        goals: formData.goals.split(',').map((goal) => goal.trim()),
        audience: formData.audience.split(',').map((aud) => aud.trim()),
      };
      await dispatch(setupOnboarding(onboardingData)).unwrap();
      navigate('/branding');
    } catch (err) {
      console.error('Onboarding error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('onboarding.title')}</h1>
      <p style={styles.subtitle}>{t('onboarding.subtitle')}</p>

      <div style={styles.form}>
        <label style={styles.label}>{t('onboarding.businessName')}</label>
        <Input
          value={formData.businessName}
          onChangeText={(text) => handleInputChange('businessName', text)}
          placeholder={t('onboarding.businessNamePlaceholder')}
        />

        <label style={styles.label}>{t('onboarding.goals')}</label>
        <Input
          value={formData.goals}
          onChangeText={(text) => handleInputChange('goals', text)}
          placeholder={t('onboarding.goalsPlaceholder')}
          multiline
        />

        <label style={styles.label}>{t('onboarding.audience')}</label>
        <Input
          value={formData.audience}
          onChangeText={(text) => handleInputChange('audience', text)}
          placeholder={t('onboarding.audiencePlaceholder')}
          multiline
        />

        {error && <p style={styles.error}>{error}</p>}

        <Button
          title={t('onboarding.submit')}
          onPress={handleSubmit}
          disabled={onboardingStatus === 'loading'}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    marginBottom: SIZES.margin.small,
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.error,
    marginBottom: SIZES.margin.regular,
  },
};

export default OnboardingScreen;