"use client";

import {setTask} from "@Functions/editTask-slice";
import {useAppDispatch, useAppSelector} from "@Hooks/redux";
import {LoadingButton} from "@mui/lab";
import {Button, TextField} from "@mui/material";
import {useCallback, useEffect, useMemo, useState} from "react";
import {addTodo, editTodo} from "@Functions/todo-slice";
import {addTask, updateTask} from "@Functions/todo";
import {useSnackbar} from "notistack";

interface TaskState {
  title: string;
  description: string;
}
export default function TaskField(): React.JSX.Element {
  const [inputTask, setInputTask] = useState<TaskState>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const editedTask = useAppSelector((state) => state.editTaskReducer.task);
  const dispatch = useAppDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const buttonDisable = useMemo(
    () => !inputTask.title.trim() || !inputTask.description.trim(),
    [inputTask],
  );

  const handleTaskChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputTask((prev) => ({...prev, [name]: value}));
  }, []);

  const handleClearForm = useCallback(() => {
    dispatch(setTask(null));
    setInputTask({
      title: "",
      description: "",
    });
  }, [dispatch]);

  const handleAddEditTask = useCallback(async () => {
    try {
      if (editedTask) {
        const updatedTask = await updateTask({
          ...inputTask,
          id: editedTask._id,
          completed: editedTask.completed,
        });
        dispatch(editTodo(updatedTask));
      } else {
        const newTask = await addTask(inputTask);
        dispatch(addTodo(newTask));
      }
    } catch (error) {
      const errorMsg = (error as Error).message;
      enqueueSnackbar(errorMsg, {variant: "error"});
    } finally {
      setLoading(false);
    }

    handleClearForm();
  }, [handleClearForm, editedTask, inputTask, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (!editedTask) return;
    setInputTask({
      title: editedTask.title,
      description: editedTask.description,
    });
  }, [editedTask]);

  return (
    <center className="mt-6">
      <div className="flex flex-col gap-4 items-center max-w-xl">
        <TextField
          value={inputTask.title}
          onChange={handleTaskChange}
          name="title"
          fullWidth
          size="small"
          label="Title"
          placeholder="Enter Task Title..."
        />
        <TextField
          value={inputTask.description}
          onChange={handleTaskChange}
          label="Description"
          name="description"
          multiline
          minRows={2}
          fullWidth
          size="small"
          placeholder="Enter Task description..."
        />
        <div className="flex items-center gap-2 w-full">
          {editedTask ? (
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              fullWidth
              onClick={handleAddEditTask}>
              Clear
            </Button>
          ) : null}

          <LoadingButton
            variant="contained"
            size="large"
            fullWidth
            loading={loading}
            disabled={buttonDisable}
            onClick={handleAddEditTask}>
            {editedTask ? "Make Change" : "I Got This"}
          </LoadingButton>
        </div>
      </div>
    </center>
  );
}
