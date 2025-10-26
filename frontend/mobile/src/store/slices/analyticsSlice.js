// src/store/slices/analyticsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';

// Async thunk for fetching dashboard data (KPIs, recommendations, predictions)
export const fetchDashboardData = createAsyncThunk(
  'analytics/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseUrl}/api/analytics/dashboard`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data; // Expected: { kpis: [{ key, value }], recommendations: [{ id, text, actionScreen }], predictions: {} }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch dashboard data' });
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    dashboardData: {
      kpis: [],
      recommendations: [],
      predictions: {},
    },
    analyticsStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetAnalytics: (state) => {
      state.dashboardData = { kpis: [], recommendations: [], predictions: {} };
      state.analyticsStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Data
      .addCase(fetchDashboardData.pending, (state) => {
        state.analyticsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.analyticsStatus = 'succeeded';
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.analyticsStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;