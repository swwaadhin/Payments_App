
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold error messages
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(""); // Clear previous errors
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: email,
                password: password
            });
            
            // Store the token
            localStorage.setItem("token", response.data.token);
            
            // Navigate to dashboard
            navigate("/dashboard");
        } catch (err) {
            // Set a user-friendly error message
            const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
            setError(errorMessage);
            console.error("Signin Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 space-y-6">
                {/* Heading Section */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back!
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your credentials to access your account
                    </p>
                </div>

                {/* Form Section */}
                <form className="space-y-6" onSubmit={handleSignin}>
                    {/* Email Input */}
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="you@example.com" 
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                         <input 
                            id="password"
                            type="password"
                            placeholder="••••••••" 
                            required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Display Error Message */}
                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button 
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Bottom Link to Sign Up */}
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};