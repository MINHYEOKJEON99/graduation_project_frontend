const { createSlice } = require('@reduxjs/toolkit');

const initialUserInfoState = [
  {
    name: '전민혁',
    nickName: '전빡빡',
    username: 'mari0000',
    email: 'mari394337@gmail.com',
    pwd: 'alsgur12',
    birth: '1999-12-08',
    drivingExperience: 6,
  },
];

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
