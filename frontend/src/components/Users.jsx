
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button"; // Assuming this is your custom Button component

// --- Custom Hook for Debouncing (No changes needed here) ---
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

// --- Skeleton Component for Loading State (No changes needed here) ---
const UserSkeleton = () => {
    return (
        <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
                <div className="rounded-full bg-slate-200 h-12 w-12 animate-pulse"></div>
                <div className="ml-3 space-y-2">
                    <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>
            </div>
            <div className="h-10 w-28 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
    );
};

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const debouncedFilter = useDebounce(searchTerm, 300);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`);
                setUsers(response.data.user);
            } catch (err) {
                setError("Something went wrong. Please try again.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [debouncedFilter]);

    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg mt-6 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">Transfer Money</h2>
            <p className="text-sm text-slate-500 mb-5">Search for a friend to send money to.</p>

            <div className="relative my-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search by first or last name..."
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-slate-50 border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
                />
            </div>

            <div className="mt-6 space-y-1">
                {loading ? (
                    Array(4).fill(0).map((_, index) => <UserSkeleton key={index} />)
                ) : error ? (
                    <div className="text-center py-10">
                        <p className="text-slate-500">{error}</p>
                    </div>
                ) : users.length > 0 ? (
                    users.map(user => <User key={user._id} user={user} />)
                ) : (
                    <div className="text-center py-10">
                        <p className="text-slate-500">No users found for "{debouncedFilter}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 transition-colors duration-200 group">
            {/* THIS IS THE UPDATED PART */}
            <div className="flex items-center flex-1 min-w-0">
                <div className="rounded-full h-12 w-12 bg-indigo-100 flex items-center justify-center mr-4 text-indigo-600 font-bold text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {user.firstName[0].toUpperCase()}
                </div>
                {/* Added truncate for long names */}
                <div className="font-semibold text-slate-800 text-md truncate">
                    {user.firstName} {user.lastName}
                </div>
            </div>

            <div className="ml-4"> {/* Added margin-left for spacing */}
                <Button
                    onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                    label={"Send Money"}
                    className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 !px-5 !py-2.5"
                />
            </div>
        </div>
    );
}