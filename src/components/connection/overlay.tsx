import React from 'react';
import { useAccount } from 'wagmi';
import { useGlobalContext } from '@/context/store';

const Overlay: React.FC = () => {
    const { connected } =  useGlobalContext()

  if (connected) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/70 backdrop-blur-sm flex justify-center items-center z-50">
    </div>
  );
};

export default Overlay;