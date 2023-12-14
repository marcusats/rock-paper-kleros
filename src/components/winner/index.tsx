import React from 'react';
import { fireworks, sad } from '@/utils/figures';
import { useGlobalContext } from '@/context/store';


interface WinnerProps{
    desc: boolean;
} 

const Winner: React.FC<WinnerProps> = ( {desc}) => {
    const {goTo} = useGlobalContext()
    return (
        <div className=" flex w-full h-full items-center justify-center flex-grow m-7 ">
            <div className=" absolute text-md  blur-xs  flex h-[150px] w-[150px] justify-center items-center font-mono whitespace-pre  flex-col  pb-6   ">  
                {desc ? fireworks  : sad }      
            </div>
            <div  onClick={()=>{goTo(0)}}  className=" cursor-pointer flex w-full h-full items-center justify-center flex-grow m-7 bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-10 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit text-center">
                <p className="text-gray-300 text-3xl  ">You {desc ? "Won!" : "Lose!"}</p> 
            </div>
            
        </div>
    );
};

export default Winner;
