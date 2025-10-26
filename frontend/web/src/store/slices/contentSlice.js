// frontend/web/src/store/slices/contentSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';

export const generateContent = createAsyncThunk(
  'content/generateContent',
  async (contentParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/content/generate`,
        contentParams,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data; // Expected: { content: [{ id, type, text, mediaUrl, platform }], abTests: [] }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to generate content' });
    }
  }
);

export const scheduleContent = createAsyncThunk(
  'content/scheduleContent',
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/content/schedule`,
        content,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to schedule content' });
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    generatedContent: [],
    scheduledContent: [],
    contentStatus: 'idle',
    error: null,
  },
  reducers: {
    resetContent: (state) => {
      state.generatedContent = [];
      state.scheduledContent = [];
      state.contentStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateContent.pending, (state) => {
        state.contentStatus = 'loading';
        state.error = null;
      })
      .addCase(generateContent.fulfilled, (state, action) => {
        state.contentStatus = 'succeeded';
        state.generatedContent = action.payload.content;
      })
      .addCase(generateContent.rejected, (state, action) => {
        state.contentStatus = 'failed';
        state.error = action.payload.message;
      })
      .addCase(scheduleContent.pending, (state) => {
        state.contentStatus = 'loading';
        state.error = null;
      })
      .addCase(scheduleContent.fulfilled, (state, action) => {
        state.contentStatus = 'succeeded';
        state.scheduledContent = action.payload;
      })
      .addCase(scheduleContent.rejected, (state, action) => {
        state.contentStatus = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { resetContent } = contentSlice.actions;
export default contentSlice.reducer;