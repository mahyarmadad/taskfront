"use client";

import {LoadingButton} from "@mui/lab";
import {TextField} from "@mui/material";
import {useCallback, useState} from "react";

export default function TaskField() {
  const [inputTask, setInputTask] = useState<string>("");

  const handleTaskChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value);
  }, []);

  return (
    <center className="mt-6">
      <div className="flex items-center max-w-xl">
        <TextField
          value={inputTask}
          onChange={handleTaskChange}
          fullWidth
          size="small"
          placeholder="Enter Task Name..."
          slotProps={{
            input: {
              classes: {
                notchedOutline: "rounded-r-none",
              },
            },
          }}
        />
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          className="rounded-l-none h-10 max-w-32">
          I Got This
        </LoadingButton>
      </div>
    </center>
  );
}
