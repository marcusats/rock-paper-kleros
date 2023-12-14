import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Players } from '@/utils/types';

interface CountdownProps {
    unixTimestamp: number; 
    calculateRemainingTime: () => number;
    players: Players;
}

const Countdown: React.FC<CountdownProps> = ({ unixTimestamp, calculateRemainingTime , players}) => {

   
    const {address: userAddress} = useAccount()
    const [timeLeft, setTimeLeft] = useState<number>(calculateRemainingTime());

    useEffect(() => {
       
        const interval = setInterval(() => {
            const newTimeLeft = calculateRemainingTime();
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [unixTimestamp]); 

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    return (
        <div className='m-3'>
            {timeLeft > 0 ? (
                <p className='text-gray-400 text-lg'>Time remaining until {players?.player1 === userAddress ? "player 2" : "player 1"} times out: {formatTime(timeLeft)}</p>
            ) : (
                <p className='text-gray-400 text-md'>{players?.player1 === userAddress ? "Player 2" : "Player 1"} has timed out.</p>
            )}
        </div>
    );
};

export default Countdown;
