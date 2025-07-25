import React, { useEffect, useState } from 'react';
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios'; // Assuming axios for API calls

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    // State to trigger a refresh of the balance
    const [refreshTrigger, setRefreshTrigger] = useState(0); 

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Fetch the user's balance from your backend
                const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") // Send auth token
                    }
                });
                // --- CHANGE MADE HERE ---
                // Format the balance to two decimal places before setting it in state
                const fetchedBalance = parseFloat(response.data.balance);
                setBalance(fetchedBalance.toFixed(2)); 
                // --- END CHANGE ---
            } catch (error) {
                console.error("Error fetching balance:", error);
                // Handle error (e.g., show an error message)
            }
        };

        fetchBalance();
    }, [refreshTrigger]); // This effect will re-run whenever refreshTrigger changes

    // Function to be passed to child components to trigger a balance refresh
    const triggerBalanceRefresh = () => {
        setRefreshTrigger(prev => prev + 1); // Increment to trigger useEffect
    };

    return (
        <div>
            <Appbar />
            <div className="m-8">
                {/* Pass the fetched and formatted balance to the Balance component */}
                <Balance value={balance} /> 
                {/* Pass the triggerBalanceRefresh function to the Users component,
                    which might then pass it to a SendMoney component if applicable */}
                <Users onTransferSuccess={triggerBalanceRefresh} /> 
            </div>
        </div>
    );
}
