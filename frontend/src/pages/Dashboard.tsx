import { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  status: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const [showPop, setShowPop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddClick = () => {
    if (!title.trim()) return;
    setShowPop(true);
  };

  const confirmAddTask = async () => {
    await api.post('/tasks', {title, status: 'pending' });
    setTitle('');
    setShowPop(false);
    fetchTasks();
  };

  const cancelAddTask = () => {
    setShowPop(false);
  };
  
  const addTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title, status: "pending" });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="New Task Title"
        />
        <button
          onClick={handleAddClick}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>
              {task.title}{" "}
              <span className="text-xs text-gray-500">({task.status})</span>
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {showPop && (
      <div className ="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div classname="bg-white p-6 rounded-lg shadow-xl w-80 text-center animate-bounce-in">
          <h3 className="text-xl font-bold mb-4">Confirm Task</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to add "{title}"?</p>

          <div className="flex justify-center gap-4">
            <button onClick={cancelAddTask} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">No</button>
            <button onClick={confirmAddTask} className="bg-blue-600 text-ehite px-4 py-2 rounded hover:bg-blue-700 transition">Yes</button>

          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Dashboard;
