import React, { useState } from 'react';
import Button from '@/components/regular/Button';
import { useAccount, useWalletClient } from 'wagmi'
import { Deploy } from '@/utils/contracts/Deploy';
import { addGame, getCurrentIndex } from '@/utils/storage';
import { Game } from '@/utils/types';
import { useGlobalContext } from '@/context/store';


const CreateScreen: React.FC = () => {
    const [gameName, setGameName] = useState('');
    const [playerAddress, setPlayerAddress] = useState('');
    const [stakeValue, setStakeValue] = useState('');
    const { goTo } = useGlobalContext();
    const {address: userAddress} = useAccount()


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       
        console.log('Game Name:', gameName);
        console.log('Second Player Address:', playerAddress);
        console.log('Stake Value:', stakeValue);
       
        const game: Game ={
            id: getCurrentIndex(),
            address: "",
            name: gameName,
            players: {player1: userAddress?.toString(), player2: playerAddress},
            stake: stakeValue
        }
        addGame(game);
        goTo(0)
    };

    return (
        <div className="w-full h-full mt-3 p-5 flex flex-col items-center justify-center">
            <h1 className=" absolute text-3xl text-center mb-9 top-12">Create your game!</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="game-name">
                            Game's Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="game-name"
                            type="text"
                            placeholder="Name"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="player-address">
                            Second Player Address
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="player-address"
                            type="text"
                            placeholder="0x00000000000000000"
                            value={playerAddress}
                            onChange={(e) => setPlayerAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-10">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="stake-value">
                            Stake Value
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="stake-value"
                            type="text"
                            placeholder="ETH"
                            value={stakeValue}
                            onChange={(e) => setStakeValue(e.target.value)}
                        />
                    </div>
                </div>
                <Button type="submit" text="Create Game" />
            </form>
        </div>
    );
};

export default CreateScreen;

