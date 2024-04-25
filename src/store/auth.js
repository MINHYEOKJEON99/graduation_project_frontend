const { createSlice } = require('@reduxjs/toolkit');

const initialAuthState = {
  isAdminAuthenticated: false,
  isUserAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    adminLogin(state) {
      state.isAdminAuthenticated = true;
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false;
    },
    userLogin(state) {
      state.isUserAuthenticated = true;
    },
    userLogout(state) {
      state.isUserAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
