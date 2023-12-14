import React, {useEffect, useState} from "react";
import { Game, Players, Move } from "@/utils/types";
import { figures } from "@/utils/figures";
import Choice from "@/components/choice";
import WaitingForNextMove from "./waiting";
import Button from "@/components/regular/Button";
import { updateGame, deleteGame, addMove } from "@/utils/storage";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/context/store";
import { useWalletClient, usePublicClient } from "wagmi";
import {ethers, id} from "ethers"
import { generateRandomNumber, getHash } from "@/utils/contracts/Helpers";
import { abiRPS, compRPS } from "@/utils/contracts/RPS";


// TODO: Test all workflows

interface LogicProps{
    game: Game | null;
    userAddress: string;
}
const Logic: React.FC<LogicProps> = ({game, userAddress}) => {
    const [isCreation, setIsCreation] =  useState<boolean>(true)
    const [selectedChoice, setSelectedChoice] = useState<number| null>(null);
    const router = useRouter();
    const {address} = router.query;
    const {data: walletClient } = useWalletClient()
    const publicClient = usePublicClient()
    const {goTo, setDecision,setLoading} = useGlobalContext()


    useEffect(()=>{
        setIsCreation(("create" === address as string)) 
    },[address])

    async function chooseMove(e:any) {
       e.preventDefault()
        if(isCreation){
            setLoading(true)
            try{
                const salt = generateRandomNumber().toString().substring(0, 10);
            
                const hash = await getHash(publicClient,selectedChoice as number + 1, Number(salt))


                const deployment= await walletClient?.deployContract({
                    abi: abiRPS,
                    account: userAddress as `0x${string}` ,
                    args: [hash, game?.players.player2],
                    bytecode: compRPS as `0x${string}`,
                    value: ethers.parseEther(game?.stake as string)
                })
                

                const transaction = await publicClient.waitForTransactionReceipt({ 
                    hash: deployment as `0x${string}`,
                })

            
                const newGame: Game = { 
                    id: game?.id as number, 
                    name: game?.name as string, 
                    players: game?.players as Players,
                    address: transaction.contractAddress as string,
                    stake: game?.stake as string,
                    ready: false,
                } 

                updateGame(game?.id as number, newGame)

                const move: Move = {address:userAddress as string, move: (selectedChoice as number + 1), salt: Number(salt),gameId: game?.id as number}

                addMove(move)
                
                setLoading(false)
                router.push(`/game/${transaction?.contractAddress}`)
            }catch(e){
                console.log(e)
                setLoading(false)
            }
        }else{
            setLoading(true)

            try{
                const salt = generateRandomNumber().toString().substring(0, 10);

                const { request } = await publicClient.simulateContract({
                    address: game?.address as `0x${string}`,
                    abi: abiRPS,
                    functionName: 'play',
                    args: [(selectedChoice as number + 1)],
                    account:userAddress as `0x${string}`,
                    value: ethers.parseEther(game?.stake as string)
                })

                const transaction = await walletClient?.writeContract(request)

      
                const move: Move = {address:userAddress as string, move: (selectedChoice as number + 1),salt:  Number(salt),gameId: game?.id as number  }

                addMove(move)
                const newGame: Game = { 
                    id: game?.id as number, 
                    name: game?.name as string, 
                    players: game?.players as Players,
                    address: game?.address as string,
                    stake: game?.stake as string,
                    ready: true,
                } 

                updateGame(game?.id as number, newGame)
                setLoading(false)
                router.push("/")
                goTo(0)
            }catch(e){
                console.log(e)
                setLoading(false)
            }
        }
    }

    async function handleClick(index: number){
        setSelectedChoice(current => current === index ? null : index);
    }

    return (
        <>
        { (isCreation || (game?.players.player2 === userAddress && game?.ready === false) ) ? 
            <form  onSubmit={(e)=>{chooseMove(e)}} className="w-full h-full flex-row items-center justify-center"> 
                <div className="flex justify-between  m-6 mb-8 mt-[100px] bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                {figures.map((figure, index) => (
                    <Choice onClick={()=>{handleClick(index)}} key={index} choice={figure} isSelected={index === selectedChoice} />
                ))}
                </div>
                <div className="text-center text-gray-500">
                    <p>Choose one of the options above.</p>
                </div> 
                <div className=" relative flex mt-8 items-center justify-center">
                    <Button type="submit" text={"Move!"}></Button>
                </div>
            </form>
            :
            <WaitingForNextMove/>
        }
        </>
    );
};

export default Logic;
