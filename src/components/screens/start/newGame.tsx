import React from "react";
import Button from "@/components/regular/Button";
import { addGame } from "@/utils/storage";
import { useGlobalContext } from "@/context/store";

export default function NewGame() {
    const {goTo} = useGlobalContext();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <Button onClick={()=>{goTo(2)}} text="New Game" />
    </div>
  );
}
