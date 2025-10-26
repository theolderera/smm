// frontend/web/src/store/slices/strategySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';

export const generateStrategy = createAsyncThunk(
  'strategy/generateStrategy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/strategy/generate`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to generate strategy' });
    }
  }
);

export const confirmStrategy = createAsyncThunk(
  'strategy/confirmStrategy',
  async ({ platforms, strategy }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/strategy/confirm`,
        { platforms, strategy },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to confirm strategy' });
    }
  }
);

const strategySlice = createSlice({
  name: 'strategy',
  initialState: {
    strategy: {
      contentPlan: [],
      platforms: [],
      seoRecommendations: '',
    },
    strategyStatus: 'idle',
    selectedPlatforms: [],
    confirmedStrategy: null,
    error: null,
  },
  reducers: {
    resetStrategy: (state) => {
      state.strategy = { contentPlan: [], platforms: [], seoRecommendations: '' };
      state.strategyStatus = 'idle';
      state.selectedPlatforms = [];
      state.confirmedStrategy = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateStrategy.pending, (state) => {
        state.strategyStatus = 'loading';
        state.error = null;
      })
      .addCase(generateStrategy.fulfilled, (state, action) => {
        state.strategyStatus = 'succeeded';
        state.strategy = action.payload;
      })
      .addCase(generateStrategy.rejected, (state, action) => {
        state.strategyStatus = 'failed';
        state.error = action.payload.message;
      })
      .addCase(confirmStrategy.pending, (state) => {
        state.strategyStatus = 'loading';
        state.error = null;
      })
      .addCase(confirmStrategy.fulfilled, (state, action) => {
        state.strategyStatus = 'succeeded';
        state.selectedPlatforms = action.payload.selectedPlatforms;
        state.confirmedStrategy = action.payload.confirmedStrategy;
      })
      .addCase(confirmStrategy.rejected, (state, action) => {
        state.strategyStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetStrategy } = strategySlice.actions;
export default strategySlice.reducer;