const { createSlice } = require('@reduxjs/toolkit');

const initialPostState = [
  {
    id: '1',
    title: '테스트',
    content: '테스트 커뮤니티',
    like: 5,
    commentNum: 7,
    username: '전빡빡',
  },
];

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    addPost(state, action) {
      state.push(action.payload);
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
