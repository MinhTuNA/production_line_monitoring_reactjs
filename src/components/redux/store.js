import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import dataReducer from './reducers/dataReducer';

const store = configureStore({
  reducer: {
    user: authReducer, // Đảm bảo tên 'user' khớp với name trong createSlice
    tableData: dataReducer,
  },
});

export default store;
