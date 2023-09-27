import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./features/userSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authSlice } from "./features/authSlice";
export const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    user: authSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
