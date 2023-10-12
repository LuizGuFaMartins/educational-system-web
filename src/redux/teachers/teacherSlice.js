import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  teacher_id: null,
  teacher_name: null,
  teacher_birthday: null,
  teacher_phone_number: null,
  teacher_specialization: null,
  login_id: null,
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: initialValues,
  reducers: {
    reducerSetTeacher: (state, action) => {
      // eslint-disable-next-line no-unused-expressions
      (state.teacher_id = action.payload.teacher_id),
        (state.teacher_name = action.payload.teacher_name),
        (state.teacher_birthday = action.payload.teacher_birthday),
        (state.teacher_phone_number = action.payload.teacher_phone_number),
        (state.teacher_specialization = action.payload.teacher_specialization),
        (state.login_id = action.payload.login_id);
    },
  },
});

export const { reducerSetTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;
