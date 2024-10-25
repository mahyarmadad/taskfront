import {createSlice} from "@reduxjs/toolkit";
import {TASKLIST} from "@Types";

const INITIAL_STATE: TASKLIST = {
  list: [],
};

export const todo = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    addTodo: (state, action) => {
      const todo = state.list.find((todo) => todo._id === action.payload._id);
      if (!todo) state.list.push(action.payload);
    },
    editTodo: (state, action) => {
      const exist = state.list.find((todo) => todo._id === action.payload._id);
      if (exist)
        state.list = state.list.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo,
        );
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo._id !== action.payload);
    },
    updateTaskList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {addTodo, editTodo, removeTodo, updateTaskList} = todo.actions;
export default todo.reducer;
