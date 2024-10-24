"use client";

import TaskItem from "@Components/TaskItem";
import {useAppSelector} from "@Hooks/redux";

export default function TaskList(): React.JSX.Element {
  const taskList = useAppSelector((state) => state.todoReducer.list);
  return (
    <div className="flex flex-col gap-2 items-center mt-8">
      {taskList.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
