
// export const Balance = ({ value }) => {
//     return <div className="flex">
//         <div className="font-bold text-lg">
//             Your balance
//         </div>
//         <div className="font-semibold ml-4 text-lg">
//             Rs {value}
//         </div>
//     </div>
// }
// export const Balance = ({ value }) => {
//     // Format the value to have two decimal places for currency
    

//     return (
//         <div className="flex items-center bg-white p-4 rounded-lg shadow-sm mb-4">
//             <div className="font-bold text-xl text-gray-800 mr-4">
//                 Your Balance
//             </div>
//             <div className="font-extrabold text-2xl text-green-600">
//                 ₹ {value}
//             </div>
//         </div>
//     );
// };
import { Wallet } from 'lucide-react'; // An icon for better visual appeal

export const Balance = ({ value }) => {
    // Format the value as Indian Rupees (INR) with two decimal places.
    // Example: 10000 -> "₹10,000.00"
    const formattedValue = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(value);

    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg text-white transition-transform transform hover:scale-105">
            <div>
                <div className="font-semibold text-lg text-gray-300 mb-1">
                    Your Balance
                </div>
                <div className="font-bold text-4xl tracking-wider">
                    {formattedValue}
                </div>
            </div>
            <div className="bg-gray-700 p-3 rounded-full">
                <Wallet size={28} className="text-green-400" />
            </div>
        </div>
    );
};