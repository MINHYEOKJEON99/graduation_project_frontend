const { createSlice } = require('@reduxjs/toolkit');

const initialPostState = {
  boardId: 0,
  title: 'gg',
  content: '',
  viewCount: 0,
  writerName: '',
  driveExp: 0,
  createdDate: '',
  modifiedDate: 'Z',
  comments: [],
  files: [],
};
const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    addPostDetail(state, action) {
      return action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
