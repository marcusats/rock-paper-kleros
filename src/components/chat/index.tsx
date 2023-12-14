import React, {useEffect, useState} from "react"
import { useGlobalContext } from "@/context/store";
import Overlay from "../connection/overlay";
import Loading from "../loading/loading";

export default function Chat(){
    const {step} = useGlobalContext()

    return(
        <div className="fixed inset-0 flex justify-center items-center">
            <Overlay/>
            <div className=" items-center justify-evenly  mt-9 relative flex-col  w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85% h-[75%] bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">      
                <div className=" flex w-full h-full items-center justify-evenly">
                    <Loading/> 
                    {step}
                </div>
            </div>
        </div>
    )
}
