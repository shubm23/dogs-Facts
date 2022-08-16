import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDogFacts } from '../utilities';

const initialState = {
  facts: [],
  isLoading: false
};

export const fetchDogFactsFromApi = createAsyncThunk(
  'facts/fetchFacts',
  async (count) => {
    const facts = await fetchDogFacts(count);
    return facts;
  }
);

export const dogSlice = createSlice({
  name: 'facts',
  initialState,
  extraReducers: {
    [fetchDogFactsFromApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.facts = action.payload;
    },
    [fetchDogFactsFromApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchDogFactsFromApi.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
});
