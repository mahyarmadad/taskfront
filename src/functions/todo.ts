import {TASK} from "@Types";
import {api} from "./api";

interface AddTaskProps {
  title: string;
  description: string;
}
interface UpdateTaskProps extends AddTaskProps {
  id: string;
  completed: boolean;
}
export async function addTask({title, description}: AddTaskProps): Promise<TASK> {
  const response = await api.post("/", {title, description});
  return response.data;
}

export async function updateTask({
  id,
  title,
  description,
  completed,
}: UpdateTaskProps): Promise<TASK> {
  const response = await api.put(`/${id}`, {title, description, completed});
  return response.data;
}
export async function deleteTask(taskId: string): Promise<TASK> {
  const response = await api.delete(`/${taskId}`);
  return response.data;
}
