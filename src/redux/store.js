import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./logins/loginSlice";
import studentReducer from "./students/studentSlice";
import teacherReducer from "./teachers/teacherSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    student: studentReducer,
    teacher: teacherReducer,
  },
});
