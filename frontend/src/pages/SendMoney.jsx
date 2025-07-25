
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = ({ onTransferSuccess }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const recipientId = searchParams.get("id");
    const recipientName = searchParams.get("name") || "User";

    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedAmount, setSubmittedAmount] = useState(0); // To show in success screen

    const handleTransfer = async () => {
        setStatus("submitting");
        setErrorMessage("");

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setErrorMessage("Please enter a valid positive amount.");
            setStatus("error");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/v1/account/transfer", 
                { to: recipientId, amount: numAmount },
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            );

            setSubmittedAmount(numAmount); // Save amount for success screen
            setStatus("success");
            if (onTransferSuccess) {
                onTransferSuccess();
            }
        } catch (err) {
            const apiError = err.response?.data?.message || "An unknown error occurred.";
            setErrorMessage(`Transfer failed: ${apiError}`);
            setStatus("error");
        }
    };

    const resetForm = () => {
        setAmount("");
        setStatus("idle");
        setErrorMessage("");
    };

    // --- Main render ---
    return (
        <div className="flex justify-center items-center h-screen bg-slate-100/50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transition-all">
                {status === 'success' ? (
                    <SuccessView 
                        amount={submittedAmount} 
                        name={recipientName} 
                        onReset={resetForm} 
                        onFinish={() => navigate('/dashboard')} 
                    />
                ) : (
                    <TransferForm
                        name={recipientName}
                        amount={amount}
                        setAmount={setAmount}
                        status={status}
                        errorMessage={errorMessage}
                        onTransfer={handleTransfer}
                    />
                )}
            </div>
        </div>
    );
};

// --- Sub-component for the Transfer Form ---
const TransferForm = ({ name, amount, setAmount, status, errorMessage, onTransfer }) => (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-slate-800">Send Money</h2>
        
        <div className="flex flex-col items-center pt-4 space-y-2">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center">
                <span className="text-3xl text-white">{name[0].toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700">{name}</h3>
        </div>

        <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-slate-600">
                Amount (in ₹)
            </label>
            <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                type="number"
                className="flex h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="amount"
                placeholder="Enter amount"
            />
        </div>

        {errorMessage && (
            <p className="text-red-600 text-center text-sm">{errorMessage}</p>
        )}

        <button
            onClick={onTransfer}
            disabled={status === 'submitting'}
            className="w-full h-12 px-4 py-2 rounded-lg text-white font-semibold text-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
        >
            {status === 'submitting' ? 'Sending...' : 'Send Payment'}
        </button>
    </div>
);

// --- Sub-component for the Success Screen ---
const SuccessView = ({ amount, name, onReset, onFinish }) => (
    <div className="text-center py-6 flex flex-col items-center space-y-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Transfer Successful!</h2>
        <p className="text-lg text-slate-600">
            You sent <span className="font-semibold">₹{amount.toLocaleString('en-IN')}</span> to <span className="font-semibold">{name}</span>.
        </p>
        <div className="w-full pt-4 space-y-3">
             <button onClick={onFinish} className="w-full h-12 px-4 py-2 rounded-lg text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors">
                Go to Dashboard
            </button>
            <button onClick={onReset} className="w-full h-12 px-4 py-2 rounded-lg text-slate-600 font-semibold bg-slate-200 hover:bg-slate-300 transition-colors">
                Make Another Transfer
            </button>
        </div>
    </div>
);
