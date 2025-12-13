import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
