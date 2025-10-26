import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import * as Font from 'expo-font';
import i18n from './src/config/i18n';
import store from './src/store';
import OnboardingScreen from './src/screens/OnboardingScreen';
import BrandingScreen from './src/screens/BrandingScreen';
import StrategyScreen from './src/screens/StrategyScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import AcademyScreen from './src/screens/AcademyScreen';
import { COLORS } from './src/utils/constants';

const Stack = createStackNavigator();

const App = () => {
  // Load custom fonts
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
        'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
      });
    }
    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" backgroundColor={COLORS.primary} />
            <Stack.Navigator
              initialRouteName="Onboarding"
              screenOptions={{
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: COLORS.white,
                headerTitleStyle: { fontFamily: 'Inter-Bold' },
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
                options={{ title: i18n.t('branding.title') }}
              />
              <Stack.Screen
                name="Strategy"
                component={StrategyScreen}
                options={{ title: i18n.t('strategy.title') }}
              />
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: i18n.t('dashboard.title') }}
              />
              <Stack.Screen
                name="Analytics"
                component={AnalyticsScreen}
                options={{ title: i18n.t('analytics.title') }}
              />
              <Stack.Screen
                name="Academy"
                component={AcademyScreen}
                options={{ title: i18n.t('academy.title') }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;