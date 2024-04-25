const { createSlice } = require('@reduxjs/toolkit');

const initialCurrentUserInfoState = {
  name: '',
  nickName: '',
  username: '',
  email: '',
  pwd: '',
  birth: '',
  drivingExperience: 0,
};

const currentUserInfoSlice = createSlice({
  name: 'currentUserInfo',
  initialState: initialCurrentUserInfoState,
  reducers: {
    addCurrentUserInfo(state, action) {
      return action.payload;
    },
  },
});

export const currentUserInfoActions = currentUserInfoSlice.actions;

export default currentUserInfoSlice.reducer;
