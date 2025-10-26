// frontend/web/src/store/slices/academySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';

export const fetchAcademyCourses = createAsyncThunk(
  'academy/fetchAcademyCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseUrl}/api/academy/courses`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch academy courses' });
    }
  }
);

const academySlice = createSlice({
  name: 'academy',
  initialState: {
    courses: [],
    academyStatus: 'idle',
    error: null,
  },
  reducers: {
    resetAcademy: (state) => {
      state.courses = [];
      state.academyStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademyCourses.pending, (state) => {
        state.academyStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAcademyCourses.fulfilled, (state, action) => {
        state.academyStatus = 'succeeded';
        state.courses = action.payload.courses;
      })
      .addCase(fetchAcademyCourses.rejected, (state, action) => {
        state.academyStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetAcademy } = academySlice.actions;
export default academySlice.reducer;