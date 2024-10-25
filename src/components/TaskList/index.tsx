"use client";

import TaskItem from "@Components/TaskItem";
import {updateTaskList} from "@Functions/todo-slice";
import {useAppDispatch, useAppSelector} from "@Hooks/redux";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {useSnackbar} from "notistack";
import {useCallback, useEffect, useMemo, useState} from "react";
import {api} from "@Functions/api";
import {CircularProgress} from "@mui/material";

export default function TaskList(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const taskList = useAppSelector((state) => state.todoReducer.list);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const dispatch = useAppDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const dragItems = useMemo(() => taskList.map((item) => ({...item, id: item._id})), [taskList]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const {active, over} = event;
      if (!over?.id || !active?.id) return;
      const oldIndex = taskList.findIndex((item) => item._id === active.id);
      const newIndex = taskList.findIndex((item) => item._id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newArray = arrayMove(taskList, oldIndex, newIndex);
        dispatch(updateTaskList(newArray));
      }
    },
    [dispatch, taskList],
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await api.get("/");
        const data = response.data;
        dispatch(updateTaskList(data));
      } catch (error) {
        const errorMsg = (error as Error).message;
        enqueueSnackbar(errorMsg, {variant: "error"});
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [dispatch, enqueueSnackbar]);

  return loading ? (
    <center className="mt-8">
      <CircularProgress />
    </center>
  ) : (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={dragItems} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 items-center mt-8">
          {taskList.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
