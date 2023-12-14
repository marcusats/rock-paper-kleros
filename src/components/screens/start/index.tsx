import React, { useEffect, useState } from "react";
import NewGame from "./newGame";
import GameHistory from "./gameHistory";
import { Game } from "@/utils/types";

export default function Start() {
    const [firstTime, setFirstTime] = useState<boolean>(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const existingGames = localStorage.getItem('games');
            if (existingGames === null) { 
                setFirstTime(true);
            } else {
                const gamesArray: Game[] = JSON.parse(existingGames);
                setFirstTime(gamesArray?.length === 0);
            }
        }
    }, []);

    return (
        <div className="w-full h-full mt-3 p-5 flex flex-col items-center">
            <h1 className="text-3xl text-center mb-4">Welcome to RPS!</h1>
            <div className="flex-grow custom-scrollbar overflow-scroll relative w-[95%] m-7 justify-center items-center bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                {firstTime ? <NewGame /> : <GameHistory />}
            </div>
        </div>
    );
}
