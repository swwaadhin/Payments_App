

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState(""); // This will be the email
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold error messages
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent the form from causing a page reload
        setError(""); // Clear previous errors
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred. Please try again.";
            setError(errorMessage);
            console.error("Signup Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 space-y-6">
                {/* Heading Section */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create an Account
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your information to get started
                    </p>
                </div>

                {/* Form Section */}
                <form className="space-y-4" onSubmit={handleSignup}>
                    {/* First Name Input */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            id="firstName" type="text" placeholder="John" required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    {/* Last Name Input */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            id="lastName" type="text" placeholder="Doe" required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            id="email" type="email" placeholder="you@example.com" required
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password" type="password" placeholder="••••••••" required
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
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                {/* Bottom Link to Sign In */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};