import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        if (!email) setEmailError("Please include a valid email address.");
        if (!password || password.length < 8) setPasswordError("8+ characters required.");
        
        if (email && password.length >= 8) {
            try {
                const response = await fetch("https://seguridargmail.onrender.com/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const token = data.token;

                    localStorage.removeItem("authToken");
                    sessionStorage.removeItem("authToken");
    
                    
                    if (rememberMe) {
                        localStorage.setItem("authToken", token);
                        console.log("Token stored in localStorage:", localStorage.getItem("authToken")); // Log del token en localStorage

                    } else {
                        sessionStorage.setItem("authToken", token);
                        console.log("Token stored in sessionstorage:", localStorage.getItem("authToken")); // Log del token en localStorage

                    }

                    const decodedToken = jwtDecode(token);
                    console.log("User info:", decodedToken);

                    navigate("/dashboard", { replace: true });
                } else {
                    setPasswordError("Invalid email or password.");
                }
            } catch (error) {
                console.error("Error during login:", error);
                setPasswordError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="mt-7 max-w-lg mx-auto bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account yet? 
                        <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/signup">
                            Sign up here
                        </a>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm mb-2 text-gray-800">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="py-3 px-4 block w-full rounded-lg text-sm input input-bordered"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                                required
                            />
                            {emailError && <p className="text-xs text-red-600 mt-2">{emailError}</p>}
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
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                                required
                            />
                            {passwordError && <p className="text-xs text-red-600 mt-2">{passwordError}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember-me" className="ml-3 text-sm text-gray-800">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
