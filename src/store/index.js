import adminAuthReducer from './adminAuth';
import postReducer from './post';
import userInfoReducer from './userInfo';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userInfo: userInfoReducer,
    post: postReducer,
  },
});

export default store;
