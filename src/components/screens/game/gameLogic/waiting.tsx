import React, { useEffect, useState } from 'react';
import Countdown from '@/components/countdown';
import Button from '@/components/regular/Button';
import { usePublicClient, useAccount, useWalletClient } from 'wagmi';
import { abiRPS } from '@/utils/contracts/RPS';
import { deleteGame, getGameById, deleteMove } from '@/utils/storage';
import { useGlobalContext } from '@/context/store';
import { Game, Players } from '@/utils/types';
import { useRouter } from 'next/router';

const WaitingForNextMove: React.FC = () => {
    const TIMEOUT = 300; 
    const publicClient = usePublicClient()
    const { gameAddress,selectedGameId, setTimedout, goTo, setLoading, setLastAction, lastAction } = useGlobalContext()
    const {address: userAddress} = useAccount()
    const {data: walletClient} = useWalletClient()
    const [game, setGame] = useState<Game>()
    const router = useRouter()
 
    async function setUp() {
        try
        {if(gameAddress !== ""){
            const last = await publicClient.readContract({
                address: gameAddress as `0x${string}`,
                abi: abiRPS,
                functionName: 'lastAction',
            })

            setLastAction(Number(last))
            const game: Game | null = getGameById(selectedGameId);
            
            setGame(game as Game)

            console.log("game", game)
        }}catch(e){}


    }
    

    async function getStake(){
        setLoading(true)
        try{
            console.log("one",(game?.players.player2 === userAddress) )
            console.log("2", game?.address )
            console.log("3",  userAddress)

            const { request } = await publicClient.simulateContract({
                address: game?.address as `0x${string}`,
                abi: abiRPS,
                functionName: (game?.players.player2 === userAddress) ?  'j1Timeout' : 'j2Timeout',
                account:userAddress as `0x${string}`
            })

            await walletClient?.writeContract(request)

            deleteGame(game?.id as number)
            deleteMove(userAddress as string, game?.id as number)
            setLoading(false)
            router.push("/")
            goTo(0)
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(()=>{
        setUp()
    },[])
    const calculateRemainingTime = () => {
        const currentTime = Math.floor(Date.now() / 1000); 
        const timeSinceAction = currentTime - lastAction; 
        const res = Math.max(TIMEOUT - timeSinceAction, 0);
        return res; 
    };
    
   


    return (
        <div className="flex flex-col w-full h-full items-center justify-center m-7 bg-white shadow-xl rounded-lg border border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
            <p className="text-gray-300 text-lg mb-4">Waiting for the next player's move...</p>
            <div className='flex flex-col items-center justify-center'>
                <Countdown players={game?.players as Players} calculateRemainingTime={calculateRemainingTime} unixTimestamp={lastAction}/>
                <Button onClick={()=>{getStake()}} disabled={(calculateRemainingTime() > 0)} text='Get Stake'></Button>
            </div>
        </div>
    );
};

export default WaitingForNextMove;
