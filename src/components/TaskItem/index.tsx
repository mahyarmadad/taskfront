import {Checkbox, IconButton, Typography} from "@mui/material";
import {TASK} from "@Types";
import {
  ContentEditEditOutline,
  EssetionalMenuOutline,
  EssetionalTrashOutline,
} from "react-icons-sax";

interface TaskItemProps {
  task: TASK;
}
export default function TaskItem({task}: TaskItemProps) {
  return (
    <div className="flex items-center p-4 justify-between w-full max-w-xl border border-solid border-gray-500 rounded-2xl">
      <div className="flex items-center gap-2">
        <EssetionalMenuOutline />
        <Checkbox checked={task.done} />
        <Typography className="mr-4">{task.title}</Typography>
      </div>
      <div className="flex items-center gap-2">
        <IconButton>
          <ContentEditEditOutline />
        </IconButton>
        <IconButton color="error">
          <EssetionalTrashOutline />
        </IconButton>
      </div>
    </div>
  );
}
