import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type RegisterForm = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/auth/register", data);
      alert("Registration Successful! Please Login.");
      navigate("/");
    } catch (error: any) {
      alert(
        "Registration Failed: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Register</h2>

        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          {...register("username")}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}

        <label className="block text-sm font-medium text-gray-700 mt-2">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded mt-4"
        >
          Create Account
        </button>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
