// frontend/web/src/components/Button.jsx

import React from 'react';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const Button = ({ title, onPress, disabled, style }) => (
  <button
    style={[styles.button, disabled && styles.disabled, style]}
    onClick={onPress}
    disabled={disabled}
  >
    <span style={styles.buttonText}>{title}</span>
  </button>
);

const styles = {
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
  },
  disabled: {
    backgroundColor: COLORS.textLight,
    cursor: 'not-allowed',
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.font.regular,
    color: COLORS.white,
  },
};

export default Button;