import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'tableData',
  initialState: {
    tables: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTablesStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchTablesSuccess: (state, action) => {
        state.tables = action.payload;
        state.loading = false;
      },
      fetchTablesFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
  },
});

export const { fetchTablesStart, fetchTablesSuccess, fetchTablesFailure } = dataSlice.actions;
export default dataSlice.reducer;
