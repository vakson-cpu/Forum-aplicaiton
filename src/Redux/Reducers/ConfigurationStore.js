import { configureStore } from '@reduxjs/toolkit'
import threadsSlice from './Slices'
import UserSlices from './UserSlices';
export const store = configureStore({
  reducer: {
    threads:threadsSlice,
    users:UserSlices
  },
})
export default store;
//Ovde turamo svoje reducere