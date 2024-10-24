import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./todo-slice";
import editTaskReducer from "./editTask-slice";

export const store = configureStore({
  reducer: {
    todoReducer,
    editTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
