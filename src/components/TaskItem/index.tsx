import {setTask} from "@Functions/editTask-slice";
import {removeTodo, toggleTodo} from "@Functions/todo-slice";
import {useAppDispatch} from "@Hooks/redux";
import {Checkbox, Collapse, IconButton, ListItem, ListItemButton, Typography} from "@mui/material";
import {TASK} from "@Types";
import {useCallback, useState} from "react";
import {
  ContentEditEditOutline,
  EssetionalMenuOutline,
  EssetionalTrashOutline,
} from "react-icons-sax";

interface TaskItemProps {
  task: TASK;
}
export default function TaskItem({task}: TaskItemProps): React.JSX.Element {
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleToggleTask = useCallback(() => {
    dispatch(toggleTodo(task.id));
  }, [dispatch, task.id]);

  const handleEditTask = useCallback(() => {
    dispatch(setTask(task));
  }, [dispatch, task]);

  const handleDeleteTask = useCallback(() => {
    dispatch(removeTodo(task.id));
  }, [dispatch, task.id]);

  const handleItemClick = useCallback(() => {
    setOpenDescription((prev) => !prev);
  }, []);

  return (
    <ListItem
      disablePadding
      className="w-full max-w-xl border border-solid border-gray-500 rounded-2xl pl-2">
      <EssetionalMenuOutline />
      <ListItemButton onClick={handleItemClick}>
        <div className="w-full">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Checkbox checked={task.done} onChange={handleToggleTask} />
              <Typography className="mr-4">{task.title}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <IconButton onClick={handleEditTask}>
                <ContentEditEditOutline />
              </IconButton>
              <IconButton color="error" onClick={handleDeleteTask}>
                <EssetionalTrashOutline />
              </IconButton>
            </div>
          </div>
          <Collapse in={openDescription}>
            <div className="p-4">
              <Typography variant="body2">{task.description}</Typography>
            </div>
          </Collapse>
        </div>
      </ListItemButton>
    </ListItem>
  );
}
