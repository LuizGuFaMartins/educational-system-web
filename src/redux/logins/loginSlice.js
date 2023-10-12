import { createSlice } from "@reduxjs/toolkit";
import { getLoginObject } from "../../services/auth";

const initialValues = {
  login_id: getLoginObject()?.login_id,
  login_email: getLoginObject()?.login_email,
  login_name: getLoginObject()?.login_name,
  login_type: getLoginObject()?.login_type,
  created_by: getLoginObject()?.created_by,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialValues,
  reducers: {
    reducerSetLogin: (state, action) => {
      // eslint-disable-next-line no-unused-expressions
      (state.login_id = action.payload.login_id),
        (state.login_email = action.payload.login_email),
        (state.login_name = action.payload.login_name),
        (state.login_type = action.payload.login_type),
        (state.created_by = action.payload.created_by);
    },
  },
});

export const { reducerSetLogin } = loginSlice.actions;

export default loginSlice.reducer;
