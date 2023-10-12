import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  student_id: null,
  student_name: null,
  student_birthday: null,
  student_phone_number: null,
  login_id: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState: initialValues,
  reducers: {
    reducerSetStudent: (state, action) => {
      // eslint-disable-next-line no-unused-expressions
      (state.student_id = action.payload.student_id),
        (state.student_name = action.payload.student_name),
        (state.student_birthday = action.payload.student_birthday),
        (state.student_phone_number = action.payload.student_phone_number),
        (state.login_id = action.payload.login_id);
    },
  },
});

export const { reducerSetStudent } = studentSlice.actions;

export default studentSlice.reducer;
