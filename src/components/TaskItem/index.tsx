import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {setTask} from "@Functions/editTask-slice";
import {removeTodo, toggleTodo} from "@Functions/todo-slice";
import {useAppDispatch} from "@Hooks/redux";
import {Checkbox, Collapse, IconButton, Typography} from "@mui/material";
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
const prevent = (e: React.MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
};
export default function TaskItem({task}: TaskItemProps): React.JSX.Element {
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleTask = useCallback(() => {
    dispatch(toggleTodo(task.id));
  }, [dispatch, task.id]);

  const handleEditTask = useCallback(
    (e: React.MouseEvent) => {
      prevent(e);
      dispatch(setTask(task));
    },
    [dispatch, task],
  );

  const handleDeleteTask = useCallback(
    (e: React.MouseEvent) => {
      prevent(e);
      dispatch(removeTodo(task.id));
    },
    [dispatch, task.id],
  );

  const handleItemClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpenDescription((prev) => !prev);
  }, []);

  return (
    <div
      className="w-full max-w-xl border border-solid border-gray-500 rounded-2xl pl-4"
      ref={setNodeRef}
      style={style}
      {...attributes}>
      <div className="flex items-center">
        <EssetionalMenuOutline className="hover:cursor-move" {...listeners} />
        <Checkbox checked={task.done} onChange={handleToggleTask} />
        <div onClick={handleItemClick} className="w-full rounded-2xl hover:cursor-pointer">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
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
