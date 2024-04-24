const { createSlice } = require('@reduxjs/toolkit');

const initialPostState = [
  // {
  //   title: '',
  //   content: '',
  //   like: '',
  //   commentNum: '',
  //   username: '',
  // }
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
