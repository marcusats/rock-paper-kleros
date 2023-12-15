import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/store';
import { checkPlayer, getPlayers, getStake } from '@/utils/contracts/Helpers';
import { useAccount,useWalletClient, usePublicClient } from 'wagmi'
import NonPlayer from './gameLogic/nonPlayer';
import { Players } from '@/utils/types';
import { getGameById, getGameByAddress, getCurrentIndex, addGame } from '@/utils/storage';
import { Game } from '@/utils/types';
import Logic from './gameLogic/logic';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Ready from '@/components/ready';



const GameScreen: React.FC = () => {

    const { address: userAddress, isConnected } = useAccount()
    const router = useRouter();
    const { address: gameAddress } = router.query;
    const { selectedGameId, setSelectedGameId, setLoading} = useGlobalContext()
    const [isPlayer, setIsPlayer] = useState<boolean>(false)
    const [game, setGame] = useState<Game | null>(null)
    const publicClient = usePublicClient()
    const [isGameReady, setIsGameReady] = useState<boolean>(false)


    async function localVerifyPlayer() {
        console.log(userAddress)
        if(isConnected){
            
            const game : Game | null = getGameById(selectedGameId)
            setGame(game)
            if (game?.players.player1 === userAddress || game?.players.player2 === userAddress ){
                setIsPlayer(true)
            }else{
                setIsPlayer(false)
            }
        }         
    }
    async function chainVerifyPlayer() {
        if(isConnected && gameAddress){
            setLoading(true)
            const player = await checkPlayer(publicClient, gameAddress as string, userAddress);
            setIsPlayer(player as boolean);
            const players: Players= await getPlayers(publicClient, gameAddress as string)

            const stake = await getStake(publicClient, gameAddress as string)

            const game : Game | null = getGameByAddress(gameAddress as string)
            if (!game){
                const index  = getCurrentIndex()
                const newGame : Game = {
                    id: index,
                    address: gameAddress as string,
                    name: "Invite",
                    players: players,
                    stake: ethers.formatEther(stake),
                    ready: false
                }
                addGame(newGame)
                setSelectedGameId(index);
                setGame(newGame)
                
            }else{
                setGame(game)
            }

            setLoading(false)
        }       
    }

    useEffect(()=>{
        console.log(game)
        setIsGameReady(game?.ready as boolean)
    },[game])

  
    useEffect(()=> {
        console.log("game address:",gameAddress)
        if (gameAddress !== "" ){
            (gameAddress === "create" ) ? localVerifyPlayer() : chainVerifyPlayer()
        }

    },[gameAddress, userAddress])



    if(!game) return

    return (
        
        <div className="w-full h-full mt-3 p-5 flex flex-col items-center">
            {
                isGameReady ?
                    <Ready/>
                :
                <>
                { isPlayer ?
                    <> 
                        <div className="fixed flex top-[50%] lef-[50%] place-items-center before:absolute before:h-[500px] before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[380px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"/>
                        <h1 className="text-3xl text-center mb-4">Let's Play!</h1>
                        <div className="flex-grow flex flex-col items-center justify-start w-full">  
                            <Logic  game={game} userAddress={userAddress as string}/>
                        </div>
                    </>
                    :
                    <NonPlayer/>
                } 
                </>

            }   
        </div>
        
    );
};

export default GameScreen;