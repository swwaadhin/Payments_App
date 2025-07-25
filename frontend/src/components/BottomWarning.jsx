
  import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-4 px-2 text-center text-sm">
      <span className="text-gray-600 dark:text-gray-400">{label}</span>
      <Link
        className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 transition-colors duration-300 ml-2"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}