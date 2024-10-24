import {createSlice} from "@reduxjs/toolkit";
import {TASK} from "@Types";

interface STATE {
  task: TASK | null;
}
const INITIAL_STATE: STATE = {
  task: null,
};

export const editTask = createSlice({
  name: "editTask",
  initialState: INITIAL_STATE,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const {setTask} = editTask.actions;
export default editTask.reducer;
