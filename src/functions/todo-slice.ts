import {createSlice} from "@reduxjs/toolkit";
import {TASKLIST} from "@Types";

const FAKE_TASKS = [
  {
    id: "1",
    title: "task 1",
    description: "avadga",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "task 2",
    description: "agasgas",
    done: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const INITIAL_STATE: TASKLIST = {
  list: FAKE_TASKS,
};

export const todo = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    addTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (!todo) state.list.push(action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
  },
});

export const {addTodo, editTodo, removeTodo, toggleTodo} = todo.actions;
export default todo.reducer;
