// frontend/mobile/src/navigation/index.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import BrandingScreen from '../screens/BrandingScreen';
import StrategyScreen from '../screens/StrategyScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AcademyScreen from '../screens/AcademyScreen';
import { COLORS, FONTS } from '../utils/constants';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontFamily: FONTS.bold },
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Branding"
        component={BrandingScreen}
        options={{ title: t('branding.title') }}
      />
      <Stack.Screen
        name="Strategy"
        component={StrategyScreen}
        options={{ title: t('strategy.title') }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: t('dashboard.title') }}
      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ title: t('analytics.title') }}
      />
      <Stack.Screen
        name="Academy"
        component={AcademyScreen}
        options={{ title: t('academy.title') }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;