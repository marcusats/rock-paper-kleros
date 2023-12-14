import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/store';
import Button from '../regular/Button';
import { useWalletClient, usePublicClient, useAccount} from 'wagmi';
import { abiRPS } from '@/utils/contracts/RPS';
import { deleteGame, getGameById, getMove } from '@/utils/storage';
import { Game } from '@/utils/types';
import WaitingForNextMove from '../screens/game/gameLogic/waiting';
import { useRouter } from 'next/router';






const Ready: React.FC = ( ) => {
    const {goTo, selectedGameId, timedout, gameAddress, setLoading, setLastAction } = useGlobalContext()
    const {data: walletClient} = useWalletClient()
    const publicClient = usePublicClient()
    const [game, setGame] = useState<Game | null>(null)
    const { address: userAddress } = useAccount()
    const [ hasPlayer2Played , setHasPlayer2Played] = useState<boolean>()
    const router = useRouter()

    
    async function playCheck() {
        setLoading(true)
        const move = await publicClient.readContract({
            address: gameAddress as `0x${string}`,
            abi: abiRPS,
            functionName: 'c2',
        })
        setHasPlayer2Played((move as number) > 0)
        if(gameAddress !== ""){
            const last = await publicClient.readContract({
                address: gameAddress as `0x${string}`,
                abi: abiRPS,
                functionName: 'lastAction',
            })

            setLastAction(Number(last))

        }
        setLoading(false)
    }

    useEffect(()=>{
        const game = getGameById(selectedGameId);
        setGame(game)
        if(gameAddress) playCheck();
    },[])





    
    async function solve() {

        setLoading(true)
        
        const move = getMove(userAddress as string, game?.id as number)
        console.log(gameAddress)
        try{
            const { request } = await publicClient.simulateContract({
                address: gameAddress as `0x${string}`,
                abi: abiRPS,
                functionName: 'solve',
                args: [move?.move, move?.salt as number],
                account: userAddress as `0x${string}`
            })

            await walletClient?.writeContract(request)

        
            goTo(0)
            router.push("/")

            setLoading(false)

        }catch(e){
            console.log(e)
            setLoading(false)
        }
        
    }


    return (
        <>
        { game?.players.player2 === userAddress ?
            <WaitingForNextMove/>
            
            :
            <div className=" flex w-full h-full items-center justify-center flex-grow m-7 ">
                <div className=" cursor-pointer flex w-full h-full items-center justify-center flex-grow m-7 bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-10 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit text-center">
                    <div>
                        <p className="text-gray-300 text-3xl mb-8"> {hasPlayer2Played && timedout ? " You timed Out! " : "Reveal Winner!" }</p> 
                        <Button disabled={timedout} onClick={()=>{solve()}} text='Solve'/>
                    </div>  
                </div>
            </div>

        }
     </>
        
    );
};

export default Ready;
