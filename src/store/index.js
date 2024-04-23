import adminAuthReducer from './adminAuth';
import userInfoReducer from './userInfo';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: { adminAuth: adminAuthReducer, userInfo: userInfoReducer },
});

export default store;
