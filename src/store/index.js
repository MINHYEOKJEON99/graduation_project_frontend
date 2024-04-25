import postReducer from './post';
import userInfoReducer from './userInfo';
import authReducer from './auth';
import currentUserInfoReducer from './currentUserInfo';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    currentUserInfo: currentUserInfoReducer,
    auth: authReducer,
    userInfo: userInfoReducer,
    post: postReducer,
  },
});

export default store;
