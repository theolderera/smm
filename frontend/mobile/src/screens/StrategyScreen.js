// src/screens/StrategyScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { generateStrategy, confirmStrategy } from '../store/slices/strategySlice';
import { COLORS, SIZES, FONTS, SOCIAL_PLATFORMS } from '../utils/constants';

const StrategyScreen = ({ navigation }) => {
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
      navigation.navigate('Dashboard');
    } catch (err) {
      console.error('Strategy confirmation error:', err);
    }
  };

  const renderPlatformItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.platformItem,
        selectedPlatforms.includes(item.id) && styles.selectedPlatform,
      ]}
      onPress={() => handlePlatformToggle(item.id)}
    >
      <Text style={styles.platformName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderContentPlan = ({ item }) => (
    <View style={styles.contentItem}>
      <Text style={styles.contentDate}>{item.date}</Text>
      <Text style={styles.contentType}>{t(`strategy.contentTypes.${item.type}`)}</Text>
      <Text style={styles.contentDescription}>{item.description}</Text>
      <Text style={styles.contentHashtags}>{item.hashtags.join(' ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('strategy.title')}</Text>
      <Text style={styles.subtitle}>{t('strategy.subtitle')}</Text>

      {strategyStatus === 'loading' && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {strategyStatus === 'succeeded' && (
        <>
          <Text style={styles.sectionTitle}>{t('strategy.platforms')}</Text>
          <FlatList
            data={SOCIAL_PLATFORMS}
            renderItem={renderPlatformItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.platformList}
          />

          <Text style={styles.sectionTitle}>{t('strategy.contentPlan')}</Text>
          <FlatList
            data={strategy.contentPlan}
            renderItem={renderContentPlan}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentList}
          />

          <TouchableOpacity
            style={[styles.button, selectedPlatforms.length === 0 && styles.buttonDisabled]}
            onPress={handleConfirmStrategy}
            disabled={selectedPlatforms.length === 0 || strategyStatus === 'loading'}
          >
            <Text style={styles.buttonText}>{t('strategy.confirm')}</Text>
          </TouchableOpacity>
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
  platformList: {
    paddingVertical: SIZES.padding.small,
  },
  platformItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.small,
    marginRight: SIZES.margin.small,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  selectedPlatform: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  platformName: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
  },
  contentList: {
    paddingBottom: SIZES.padding.large,
  },
  contentItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    marginBottom: SIZES.margin.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
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

export default StrategyScreen;