import React from 'react';
import { useGlobalContext } from '@/context/store';
import ClipLoader from "react-spinners/ClipLoader";

const Loading: React.FC = () => {
    const { loading } = useGlobalContext()

    if (!loading) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-sky-900/30 via-sky-900/40 to-transparent backdrop-blur-sm flex justify-center items-center rounded-lg z-50">
            <ClipLoader
                color="#ffffff"
                size={50}
            />
        </div>
    );
};

export default Loading;
