const { createSlice } = require('@reduxjs/toolkit');

const initialUserInfoState = [];

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialUserInfoState,
  reducers: {
    addUserInfo(state, action) {
      state.push(action.payload);
    },
  },
});

export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;
