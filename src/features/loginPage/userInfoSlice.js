import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  username: '',
  accessToken: '',
  idToken: '',
  refreshToken: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      const { payload } = action;
      localStorage.setItem('userInfo', JSON.stringify(payload));
      return { ...state, ...payload };
    },
  },
});

export const { updateUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state) => state.userInfo;

export default userInfoSlice.reducer;
