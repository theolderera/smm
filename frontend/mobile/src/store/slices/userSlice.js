// src/store/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';

// Async thunk for onboarding (business profile setup)
export const setupOnboarding = createAsyncThunk(
  'user/setupOnboarding',
  async (onboardingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_CONFIG.baseUrl}/api/onboarding`, onboardingData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to setup onboarding' });
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch user profile' });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {
      businessName: '',
      goals: [],
      audience: [],
      niche: '',
    },
    onboardingStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      state.profile = { businessName: '', goals: [], audience: [], niche: '' };
      state.onboardingStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Onboarding
      .addCase(setupOnboarding.pending, (state) => {
        state.onboardingStatus = 'loading';
        state.error = null;
      })
      .addCase(setupOnboarding.fulfilled, (state, action) => {
        state.onboardingStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(setupOnboarding.rejected, (state, action) => {
        state.onboardingStatus = 'failed';
        state.error = action.payload.message;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.onboardingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.onboardingStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.onboardingStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;