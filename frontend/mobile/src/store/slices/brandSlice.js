// src/store/slices/brandSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';

// Async thunk for generating branding options
export const generateBranding = createAsyncThunk(
  'brand/generateBranding',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/branding/generate`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data; // Expected: { options: [{ id, logoUrl, name, colors, voice }, ...] }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to generate branding options' });
    }
  }
);

// Async thunk for selecting a branding option
export const selectBranding = createAsyncThunk(
  'brand/selectBranding',
  async (branding, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/branding/select`,
        branding,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data; // Expected: { id, logoUrl, name, colors, voice }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to select branding' });
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brandingOptions: [], // Array of branding options from AI
    selectedBranding: null, // Selected branding
    brandingStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetBranding: (state) => {
      state.brandingOptions = [];
      state.selectedBranding = null;
      state.brandingStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate Branding
      .addCase(generateBranding.pending, (state) => {
        state.brandingStatus = 'loading';
        state.error = null;
      })
      .addCase(generateBranding.fulfilled, (state, action) => {
        state.brandingStatus = 'succeeded';
        state.brandingOptions = action.payload.options;
      })
      .addCase(generateBranding.rejected, (state, action) => {
        state.brandingStatus = 'failed';
        state.error = action.payload.message;
      })
      // Select Branding
      .addCase(selectBranding.pending, (state) => {
        state.brandingStatus = 'loading';
        state.error = null;
      })
      .addCase(selectBranding.fulfilled, (state, action) => {
        state.brandingStatus = 'succeeded';
        state.selectedBranding = action.payload;
      })
      .addCase(selectBranding.rejected, (state, action) => {
        state.brandingStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetBranding } = brandSlice.actions;
export default brandSlice.reducer;