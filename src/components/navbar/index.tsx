import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function Navbar() {
    
    return(
        <div className=" absolute z-10 p-2 w-full h-[110px] pb-8 pl-6 pr-6 items-center justify-between font-mono text-sm lg:flex bg-gradient-to-b from-slate-700 to-transparent">
        <p className=" left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Click here to see the code
        </p>
        <ConnectButton />
      </div>
    )
}