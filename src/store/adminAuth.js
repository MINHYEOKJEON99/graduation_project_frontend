const { createSlice } = require('@reduxjs/toolkit');

const initialAuthState = {
  isAdminAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: initialAuthState,
  reducers: {
    adminLogin(state) {
      state.isAdminAuthenticated = true;
    },
    adminLogout(state) {
      state.isAdminAuthenticated = false;
    },
  },
});

export const adminAuthActions = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
