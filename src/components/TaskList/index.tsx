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
import {useCallback} from "react";

export default function TaskList(): React.JSX.Element {
  const taskList = useAppSelector((state) => state.todoReducer.list);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const dispatch = useAppDispatch();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const {active, over} = event;
      if (!over?.id || !active?.id) return;
      const oldIndex = taskList.findIndex((item) => item.id === active.id);
      const newIndex = taskList.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newArray = arrayMove(taskList, oldIndex, newIndex);
        dispatch(updateTaskList(newArray));
      }
    },
    [dispatch, taskList],
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={taskList} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 items-center mt-8">
          {taskList.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
