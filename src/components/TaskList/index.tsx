import TaskItem from "@Components/TaskItem";

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
export default function TaskList() {
  return (
    <div className="flex flex-col gap-2 items-center mt-8">
      {FAKE_TASKS.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
