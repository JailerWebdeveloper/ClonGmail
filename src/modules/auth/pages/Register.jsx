import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

const Register = () => {
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Cambia Navigate a useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formState.username) newErrors.username = "Username is required.";
        if (!formState.email) newErrors.email = "Please include a valid email address.";
        if (!formState.password || formState.password.length < 8) newErrors.password = "Password must be 8+ characters.";
        if (formState.password !== formState.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("https://seguridargmail.onrender.com/api/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: formState.username,
                        email: formState.email,
                        password: formState.password,
                    }),
                });

                if (response.ok) {
                    toast.success('Usuario Registrado correctamente');
                    navigate("/login"); // Usar navigate para redirigir
                } else {
                    toast.error(`Error al crear registro: ${response.statusText}`);
                    console.error("Registration failed");
                }
            } catch (error) {
                toast.error('Event has not been created');
                console.error("Error during registration:", error);
            }
        }
    };

    return (
        <div className="mt-7 max-w-lg mx-auto bg-white border border-gray-200 rounded-xl shadow-sm">
            <Toaster position="top-right" />
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account?
                        <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/login">
                            Sign in here
                        </a>
                    </p>
                </div>

                <div className="mt-5">
                    <button
                        type="button"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                        <FaGoogle className="w-4 h-4" />
                        Sign up with Google
                    </button>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                        Or
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm mb-2 text-gray-800">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="py-3 px-4 block w-full rounded-lg text-sm input input-bordered"
                                    value={formState.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <p className="text-xs text-red-600 mt-2">{errors.username}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm mb-2 text-gray-800">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="py-3 px-4 block w-full rounded-lg text-sm input input-bordered"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm mb-2 text-gray-800">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="py-3 px-4 block w-full input input-bordered rounded-lg text-sm"
                                    value={formState.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <p className="text-xs text-red-600 mt-2">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-800">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="py-3 px-4 block w-full input input-bordered rounded-lg text-sm"
                                    value={formState.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.confirmPassword && <p className="text-xs text-red-600 mt-2">{errors.confirmPassword}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
