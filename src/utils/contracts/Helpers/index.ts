import { ethers } from 'ethers';
import { abiRPS } from '../RPS';
import { hasherAddress, hasherAbi } from '../Hasher';

async function checkPlayer(publicClient: any, gameAddress: string, userAddress: `0x${string}` | undefined ) {
    if (!userAddress) return false;
    try{
        const player1 = await publicClient.readContract({
            address: gameAddress,
            abi: abiRPS,
            functionName: 'j1',
        })
        
        console.log("Player:",player1)
        const player2 = await publicClient.readContract({
            address: gameAddress,
            abi: abiRPS,
            functionName: 'j2',
        })
        console.log(player2)
        return player1.toLowerCase() === userAddress.toLowerCase() || player2.toLowerCase() === userAddress.toLowerCase();
    }catch(e){}
    
}

async function getStake(publicClient: any, gameAddress:string){
    const stake = await publicClient.readContract({
        address: gameAddress,
        abi: abiRPS,
        functionName: 'stake',
    })

    return stake;
}   

async function getPlayers(publicClient: any, gameAddress:string) {

    const player1 = await publicClient.readContract({
        address: gameAddress,
        abi: abiRPS,
        functionName: 'j1',
    })

    const player2 = await publicClient.readContract({
        address: gameAddress,
        abi: abiRPS,
        functionName: 'j2',
    })
    return {
        player1,
        player2
    };
    
}



async function solve(signer: ethers.Signer, contractAddress: string, move: any, salt: ethers.BigNumberish): Promise<ethers.ContractTransaction> {
    const contract = new ethers.Contract(contractAddress, abiRPS, signer);
    const tx = await contract.solve(move, salt);
    await tx.wait();
    return tx;
}

async function j1Timeout(signer: ethers.Signer, contractAddress: string): Promise<ethers.ContractTransaction> {
    const contract = new ethers.Contract(contractAddress, abiRPS, signer);
    const tx = await contract.j1Timeout();
    await tx.wait();
    return tx;
}

async function j2Timeout(signer: ethers.Signer, contractAddress: string): Promise<ethers.ContractTransaction> {
    const contract = new ethers.Contract(contractAddress, abiRPS, signer);
    const tx = await contract.j2Timeout();
    await tx.wait();
    return tx;
}

async function lastAction(signer: ethers.Signer, gameAddress: string){
    const contract = new ethers.Contract(gameAddress, abiRPS, signer);
    const last = await contract.lastAction()
    return last;

}

async function getHash(publicClient: any ,move: number, salt: number) {
    
    try {

        const hash = await publicClient.readContract({
            address: hasherAddress,
            abi: hasherAbi,
            functionName: 'hash',
            args: [move, salt],
        })

        return hash;
    } catch (error) {
        console.error("Error while fetching hash from contract:", error);
        throw error;
    }
}


function generateRandomNumber(){

    
    const randomBytes = ethers.randomBytes(32); 
    const randomBigNumber = ethers.toBigInt(randomBytes).toString();
    return randomBigNumber;
}





export {
    getPlayers,
    solve,
    j1Timeout,
    j2Timeout,
    lastAction,
    checkPlayer,
    getHash,
    generateRandomNumber,
    getStake,
}

