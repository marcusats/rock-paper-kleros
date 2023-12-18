import { createContext, useContext, Dispatch, SetStateAction, useState, ReactElement, useEffect } from "react";
import { useSteps } from "@/utils/hooks/useSteps";
import Start from "@/components/screens/start";
import GameScreen from "@/components/screens/game";
import CreateScreen from "@/components/screens/create";
import Winner from "@/components/winner";
import { useAccount, usePublicClient } from "wagmi";
import { getGameByAddress,updateGame } from "@/utils/storage";
import { abiRPS } from "@/utils/contracts/RPS";
import { Game, Players } from "@/utils/types";


interface ContextProps {
  selectedGameId: number;
  setSelectedGameId: Dispatch<SetStateAction<number>>;
  gameAddress: string;
  setGameAddress: Dispatch<SetStateAction<string>>;
  decision: boolean;
  setDecision: Dispatch<SetStateAction<boolean>>;
  timedout: boolean;
  setTimedout: Dispatch<SetStateAction<boolean>>;
  connected: boolean;
  setConnected: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  lastAction: number;
  setLastAction: Dispatch<SetStateAction<number>>;
  next: () => void;
  step: ReactElement;
  goTo: (index: number) => void; 
  currentStepIndex: number;
  
}

const GlobalContext = createContext<ContextProps>({
  selectedGameId: 0,
  setSelectedGameId: () => 0,
  gameAddress: "",
  setGameAddress: () => "",
  decision: false,
  setDecision: ()=>false,
  timedout: false,
  setTimedout: ()=>false,
  lastAction: 0,
  setLastAction: () => 0,
  connected: false,
  setConnected: ()=>false,
  loading: false,
  setLoading: ()=>false,
  next: () => {},
  step: <div />, 
  goTo: () => {}, 
  currentStepIndex: 0
});

//@ts-expect-error
export const GlobalContextProvider= ({ children }) => {
  const [selectedGameId, setSelectedGameId] = useState<number>(0);
  const [gameAddress, setGameAddress] = useState<string>("");
  const [decision, setDecision] = useState<boolean>(false)
  const [timedout, setTimedout] = useState<boolean>(false)
  const [lastAction, setLastAction] = useState<number>(0)
  const [connected, setConnected] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {isConnected} = useAccount()
  const publicClient = usePublicClient()
  const TIMEOUT = 300;

  async function set() {
    if(gameAddress !== "" && gameAddress !== "create" ){
      try{ 
        const last = await publicClient.readContract({
          address: gameAddress as `0x${string}`,
          abi: abiRPS,
          functionName: 'lastAction',
        })
        setLastAction(last as number)
      }catch(e){}
    }
  }
  async function setC2() {
    if(gameAddress !== "" && gameAddress !== "create" ){
      try{
        const move = await publicClient.readContract({
          address: gameAddress as `0x${string}`,
          abi: abiRPS,
          functionName: 'c2',
        })
        const game = getGameByAddress(gameAddress)
      
        const newGame: Game = { 
          id: game?.id as number, 
          name: game?.name as string, 
          players: game?.players as Players,
          address: game?.address as string,
          stake: game?.stake as string,
          ready: move as number > 0,
        } 

        updateGame(game?.id as number, newGame)
      }catch(e){}        
    }
  }

  useEffect(()=>{
    set()
  },[])

  useEffect(()=>{
    setC2()
  },[gameAddress])

  useEffect(()=>{
    setConnected(isConnected)
  },[isConnected])

  useEffect(()=>{
    const currentTime = Math.floor(Date.now() / 1000); 
    const timeSinceAction = currentTime - lastAction; 
    const res = Math.max(TIMEOUT - timeSinceAction, 0);
    setTimedout(res<=0)
  },[lastAction])
  
  const { step, next, steps, currentStepIndex, goTo } = useSteps([
    <Start key="start" />, 
    <GameScreen key="gameScreen" />, 
    <CreateScreen key="createScreen"/>, 
    <Winner key="winner" desc={decision}/>
  ]);


  return (
    <GlobalContext.Provider 
        value={{ 
            selectedGameId, 
            setSelectedGameId, 
            next,
            step, 
            goTo, 
            currentStepIndex, 
            gameAddress,
            setGameAddress, 
            setDecision, 
            decision, 
            timedout, 
            setTimedout, 
            setConnected, 
            connected, 
            loading, 
            setLoading, 
            setLastAction, 
            lastAction 
        }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
