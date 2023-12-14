import React, { useEffect } from 'react';

import Chat from '@/components/chat';
import { useGlobalContext } from '@/context/store';
import { useRouter } from 'next/router';

const Playing: React.FC = () => {
    const {goTo, setGameAddress } = useGlobalContext()

    const router = useRouter();
    const { address } = router.query;

    useEffect(()=>{
        goTo(1)
    },[])

    useEffect(()=>{
        if(address){
            setGameAddress(address as string)
        }
    },[address])

    return (
        <div >
            <Chat />
        </div>
    );
};

export default Playing;