import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import enrollUserReducer from "../features/auth/enrollSlice";
import depositReducer from "../features/user/depositSlice";
import changePassReducer from "../features/user/changePassSlice";
import editProfileReducer from "../features/user/editProfileSlice";
import getUserReducer from "../features/user/getUserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    enrolluser: enrollUserReducer,
    depositcheck: depositReducer,
    changepassword: changePassReducer,
    editprofile: editProfileReducer,
    getuser: getUserReducer,
  },
});

export default store;
