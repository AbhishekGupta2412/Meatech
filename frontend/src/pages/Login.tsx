import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/auth/login", data);
      dispatch(loginSuccess(res.data.token));
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <input
          {...register("username")}
          placeholder="Username"
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          No account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
