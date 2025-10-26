// frontend/web/src/screens/AcademyScreen.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchAcademyCourses } from '../store/slices/academySlice';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const AcademyScreen = ({ navigate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { courses, academyStatus, error } = useSelector((state) => state.academy);

  useEffect(() => {
    if (academyStatus === 'idle') {
      dispatch(fetchAcademyCourses());
    }
  }, [academyStatus, dispatch]);

  const renderCourseItem = (item) => (
    <div
      style={styles.courseItem}
      onClick={() => navigate(`/course/${item.id}`)}
    >
      <p style={styles.courseTitle}>{item.title}</p>
      <p style={styles.courseDescription}>{item.description}</p>
      <p style={styles.courseLevel}>{t(`academy.levels.${item.level}`)}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('academy.title')}</h1>
      <p style={styles.subtitle}>{t('academy.subtitle')}</p>

      {academyStatus === 'loading' && (
        <div style={styles.loader}>Loading...</div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {academyStatus === 'succeeded' && (
        <div style={styles.courseList}>
          {courses.map((item) => renderCourseItem(item))}
        </div>
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
  courseList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: SIZES.margin.regular,
    paddingBottom: SIZES.padding.large,
  },
  courseItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    border: `1px solid ${COLORS.textLight}`,
    cursor: 'pointer',
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

export default AcademyScreen;