import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import enrollUserReducer from "../features/auth/enrollSlice";
import depositReducer from "../features/user/depositSlice";
import externalAcctReducer from "../features/user/externalAcctSlice";
import TransferReducer from "../features/user/TransferSlice";
import otpReducer from "../features/auth/otpSlice";
import userReducer from "../features/user/userSlice";
import accountReducer from "../features/user/accountSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    enrolluser: enrollUserReducer,
    user: userReducer,
    account: accountReducer,
    depositcheck: depositReducer,
    external: externalAcctReducer,
    transfer: TransferReducer,
    otp: otpReducer,
  },
});

export default store;
