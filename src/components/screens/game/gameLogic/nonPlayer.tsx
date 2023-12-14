import React from 'react';
import { lock } from '@/utils/figures';

const NonPlayer: React.FC = () => {
    return (
        <div className=" flex w-full h-full items-center justify-center flex-grow m-7 bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-10 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit text-center">
            <div  className="absolute text-[12px] blur-sm cursor-pointer flex h-[150px] w-[150px] justify-center items-center font-mono whitespace-pre  flex-col  pb-6   ">  
                {lock}      
            </div>
            <div>
            <p className="text-gray-300 text-lg  ">You are not a player from this game...</p>
            </div>
            
        </div>
    );
};

export default NonPlayer;
