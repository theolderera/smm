// frontend/mobile/src/components/Button.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const Button = ({ title, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled, style]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.textLight,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.white,
  },
});

export default Button;