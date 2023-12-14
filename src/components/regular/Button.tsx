import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; 
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", disabled = false }) => {
  return (
    <button 
      disabled={disabled}
      type={type} 
      onClick={onClick}
      className={`text-lg bg-gradient-to-b from-zinc-400 to-transparent dark:from-zinc-800 dark:to-transparent hover:dark:from-zinc-700 border border-gray-300 dark:border-neutral-800 shadow-xl rounded-lg px-4 py-2 font-medium dark:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-200 focus:ring-zinc-500 
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
    >
      {text}
    </button>
  );
};

export default Button;
