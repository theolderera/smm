// frontend/web/src/components/Input.jsx

import React from 'react';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const Input = ({ value, onChangeText, placeholder, multiline, style }) => (
  <textarea
    style={[styles.input, multiline && styles.multiline, style]}
    value={value}
    onChange={(e) => onChangeText(e.target.value)}
    placeholder={placeholder}
    rows={multiline ? 4 : 1}
  />
);

const styles = {
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    border: `1px solid ${COLORS.textLight}`,
    width: '100%',
    boxSizing: 'border-box',
  },
  multiline: {
    minHeight: '100px',
    resize: 'vertical',
  },
};

export default Input;