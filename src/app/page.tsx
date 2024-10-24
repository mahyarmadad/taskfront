import TaskField from "@Components/TaskField";
import TaskList from "@Components/TaskList";
import {Typography} from "@mui/material";

export default function Home() {
  return (
    <div className="p-4">
      <Typography variant="h4" align="center" fontWeight={700}>
        To Do List Task Manager
      </Typography>
      <TaskField />
      <TaskList />
    </div>
  );
}
