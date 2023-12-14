import React from "react";

type ChoiceProps = {
  choice: { item: string; name: string; };
  onClick?: () => void;
  isSelected: boolean;  
};

const Choice: React.FC<ChoiceProps> = ({ choice, onClick , isSelected  }) => {

  const containerClass = `text-[8px] cursor-pointer flex h-[150px] w-[150px] justify-center items-center font-mono whitespace-pre  relative flex-col  bg-white shadow-xl rounded-lg  bg-gradient-to-b from-zinc-300 pb-6  backdrop-blur-2xl  dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-00 p-4 lg:dark:bg-zinc-800/30 ${isSelected ? "dark:border-neutral-400" : "dark:border-neutral-800"}`
  return (
    <div onClick={onClick} className={containerClass}>  
      {choice.item}      
      <p className="text-xs absolute bottom-2">{choice.name}</p>
    </div>
  );
};

export default Choice;
