// frontend/mobile/src/components/Input.js

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../utils/constants';

const Input = ({ value, onChangeText, placeholder, multiline, style }) => (
  <TextInput
    style={[styles.input, multiline && styles.multiline, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={COLORS.textLight}
    multiline={multiline}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.regular,
    padding: SIZES.padding.regular,
    fontFamily: FONTS.regular,
    fontSize: SIZES.font.regular,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.textLight,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default Input;