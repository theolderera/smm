// frontend/mobile/src/screens/AcademyScreen.js

import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchAcademyCourses } from '../store/slices/academySlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const AcademyScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { courses, academyStatus, error } = useSelector((state) => state.academy);

  useEffect(() => {
    if (academyStatus === 'idle') {
      dispatch(fetchAcademyCourses());
    }
  }, [academyStatus, dispatch]);

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
      <Text style={styles.courseLevel}>{t(`academy.levels.${item.level}`)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('academy.title')}</Text>
      <Text style={styles.subtitle}>{t('academy.subtitle')}</Text>

      {academyStatus === 'loading' && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {academyStatus === 'succeeded' && (
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.courseList}
        />
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
  courseList: {
    paddingBottom: SIZES.padding.large,
  },
  courseItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    marginBottom: SIZES.margin.regular,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  courseTitle: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    marginBottom: SIZES.margin.small,
  },
  courseDescription: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.textLight,
    marginBottom: SIZES.margin.small,
  },
  courseLevel: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.small,
    color: COLORS.primary,
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

export default AcademyScreen;