import adminAuthReducer from './adminAuth';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: { adminAuth: adminAuthReducer },
});

export default store;
