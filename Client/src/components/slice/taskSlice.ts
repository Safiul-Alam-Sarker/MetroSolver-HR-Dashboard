import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const getUserTasks = createAsyncThunk(
  "task/getUserTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/task/all");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/task/delete/${taskId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(getUserTasks.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tasks";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task: any) => task._id !== action.meta.arg
        );
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
