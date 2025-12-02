import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Define the shape of a single task
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

// 2. Define the initial state for tasks
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
    // Action to set all tasks (e.g., after fetching from backend)
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    // Action to add a single task
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Action to remove a task by ID
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Action to update a task (toggle status, edit title, etc.)
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
