// src/screens/BrandingScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { generateBranding, selectBranding } from '../store/slices/brandSlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const BrandingScreen = ({ navigation }) => {
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
      navigation.navigate('Strategy');
    } catch (err) {
      console.error('Branding selection error:', err);
    }
  };

  const renderBrandingItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.brandingItem, selectedBranding?.id === item.id && styles.selectedBranding]}
      onPress={() => handleSelectBranding(item)}
    >
      <Image source={{ uri: item.logoUrl }} style={styles.logo} />
      <Text style={styles.brandName}>{item.name}</Text>
      <View style={styles.colorPalette}>
        {item.colors.map((color, index) => (
          <View key={index} style={[styles.colorSwatch, { backgroundColor: color }]} />
        ))}
      </View>
      <Text style={styles.brandVoice}>{t('branding.voice')}: {item.voice}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('branding.title')}</Text>
      <Text style={styles.subtitle}>{t('branding.subtitle')}</Text>

      {brandingStatus === 'loading' && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {brandingStatus === 'succeeded' && (
        <FlatList
          data={brandingOptions}
          renderItem={renderBrandingItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={[styles.button, !selectedBranding && styles.buttonDisabled]}
        onPress={() => selectedBranding && handleSelectBranding(selectedBranding)}
        disabled={!selectedBranding || brandingStatus === 'loading'}
      >
        <Text style={styles.buttonText}>{t('branding.submit')}</Text>
      </TouchableOpacity>
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
  list: {
    paddingBottom: SIZES.padding.large,
  },
  brandingItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    marginBottom: SIZES.margin.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  selectedBranding: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.margin.small,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: SIZES.radius.small,
    marginHorizontal: SIZES.margin.small,
  },
  brandVoice: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.text,
    textAlign: 'center',
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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    alignItems: 'center',
    marginTop: SIZES.margin.regular,
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

export default BrandingScreen;