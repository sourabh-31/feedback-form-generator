import { configureStore } from "@reduxjs/toolkit";
import formPropReducer from "./features/formPropSlice";

const store = configureStore({
  reducer: {
    formProp: formPropReducer,
  },
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
