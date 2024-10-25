import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {setTask} from "@Functions/editTask-slice";
import {deleteTask, updateTask} from "@Functions/todo";
import {removeTodo} from "@Functions/todo-slice";
import {useAppDispatch} from "@Hooks/redux";
import {Checkbox, CircularProgress, Collapse, IconButton, Typography} from "@mui/material";
import {TASK} from "@Types";
import {useSnackbar} from "notistack";
import {useCallback, useMemo, useState} from "react";
import {
  ContentEditEditOutline,
  EssetionalMenuOutline,
  EssetionalTrashOutline,
} from "react-icons-sax";
import {editTodo} from "../../functions/todo-slice";
interface TaskItemProps {
  task: TASK;
}
const prevent = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};
export default function TaskItem({task}: TaskItemProps): React.JSX.Element {
  const [loading, setLoading] = useState<string | null>(null);
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task._id});

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  );

  const {enqueueSnackbar} = useSnackbar();
  const handleToggleTask = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.checked;
        const updatedTask = await updateTask({
          id: task._id,
          title: task.title,
          description: task.description,
          completed: value,
        });
        dispatch(editTodo(updatedTask));
      } catch (error) {
        const errorMsg = (error as Error).message;
        enqueueSnackbar(errorMsg, {variant: "error"});
      }
    },
    [dispatch, enqueueSnackbar, task],
  );

  const handleEditTask = useCallback(
    (e: React.MouseEvent) => {
      prevent(e);
      dispatch(setTask(task));
    },
    [dispatch, task],
  );

  const handleDeleteTask = useCallback(
    async (e: React.MouseEvent) => {
      prevent(e);
      try {
        const id = task._id;
        setLoading(id);
        await deleteTask(id);
        dispatch(removeTodo(task._id));
      } catch (error) {
        const errorMsg = (error as Error).message;
        enqueueSnackbar(errorMsg, {variant: "error"});
      } finally {
        setLoading(null);
      }
    },
    [dispatch, enqueueSnackbar, task],
  );

  const handleItemClick = useCallback(() => {
    setOpenDescription((prev) => !prev);
  }, []);

  return (
    <div
      className="w-full max-w-xl border border-solid border-gray-500 rounded-2xl pl-2"
      ref={setNodeRef}
      style={style}
      {...attributes}>
      <div className="flex items-center">
        <EssetionalMenuOutline className="hover:cursor-move" {...listeners} />
        <Checkbox checked={task.completed} onChange={handleToggleTask} />
        <div onClick={handleItemClick} className="w-full rounded-2xl hover:cursor-pointer">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Typography className="mr-4">{task.title}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <IconButton onClick={handleEditTask}>
                <ContentEditEditOutline />
              </IconButton>
              <IconButton color="error" onClick={handleDeleteTask} disabled={loading === task._id}>
                {loading === task._id ? <CircularProgress size={20} /> : <EssetionalTrashOutline />}
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <Collapse in={openDescription}>
        <div className="p-4">
          <Typography variant="body2">{task.description}</Typography>
        </div>
      </Collapse>
    </div>
  );
}
