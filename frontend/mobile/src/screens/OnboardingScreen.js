// src/screens/OnboardingScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setupOnboarding } from '../store/slices/userSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const OnboardingScreen = ({ navigation }) => {
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
      navigation.navigate('Branding');
    } catch (err) {
      console.error('Onboarding error:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('onboarding.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.subtitle')}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>{t('onboarding.businessName')}</Text>
        <TextInput
          style={styles.input}
          value={formData.businessName}
          onChangeText={(text) => handleInputChange('businessName', text)}
          placeholder={t('onboarding.businessNamePlaceholder')}
          placeholderTextColor={COLORS.textLight}
        />

        <Text style={styles.label}>{t('onboarding.goals')}</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={formData.goals}
          onChangeText={(text) => handleInputChange('goals', text)}
          placeholder={t('onboarding.goalsPlaceholder')}
          placeholderTextColor={COLORS.textLight}
          multiline
        />

        <Text style={styles.label}>{t('onboarding.audience')}</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={formData.audience}
          onChangeText={(text) => handleInputChange('audience', text)}
          placeholder={t('onboarding.audiencePlaceholder')}
          placeholderTextColor={COLORS.textLight}
          multiline
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, onboardingStatus === 'loading' && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={onboardingStatus === 'loading'}
        >
          <Text style={styles.buttonText}>{t('onboarding.submit')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  form: {
    flex: 1,
  },
  label: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    marginBottom: SIZES.margin.small,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    marginBottom: SIZES.margin.regular,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.error,
    marginBottom: SIZES.margin.regular,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.white,
  },
});

export default OnboardingScreen;