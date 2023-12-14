import React, { useEffect, useState } from "react";
import Button from "@/components/regular/Button";
import { Game } from "@/utils/types";
import { getGames } from "@/utils/storage";
import { useGlobalContext } from "@/context/store";
import { useRouter } from 'next/router';

export default function GameHistory() {
  const [games, setGames] = useState<Game[]>([])
  const { setSelectedGameId, goTo} = useGlobalContext();
  const router = useRouter();

  useEffect(()=>{
    setGames(getGames());
  },[])

  function selectGame(id: number, address:string){
    setSelectedGameId(id);
    if (address == ""){
      router.push(`/game/create`)
    }else{

      router.push(`/game/${address}`)
    }

  }



  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="flex absolute top-6 right-8">
        <Button onClick={()=>{goTo(2)}} text="+"/>
      </div>
      <div className=" grid grid-cols-3 gap-7 ">
        {games.map((game) => (
          <div onClick={()=>{selectGame(game.id, game.address)}} key={game.id} className="cursor-pointer w-[220px] h-[220px] bg-white dark:bg-zinc-800/30 shadow-xl rounded-lg border border-gray-300 backdrop-blur-2xl flex items-center justify-center">
            Game {game.name}
          </div>
        ))}
      </div>
    </div>
  );
}
