import { Game, Move } from "@/utils/types";


function getGames(): Game[] {
    const gamesJson = localStorage.getItem('games');
    if (gamesJson === null) {
      return [];
    }
  
    try {
      const games: Game[] = JSON.parse(gamesJson);
      return games;
    } catch (error) {
      console.error("Error parsing games from local storage:", error);
      return [];
    }
}

function getMoves(): Move[] {
    const movesJson = localStorage.getItem('moves');
    if (movesJson === null) {
      return [];
    }
  
    try {
      const moves: Move[] = JSON.parse(movesJson);
      return moves;
    } catch (error) {
      console.error("Error parsing games from local storage:", error);
      return [];
    }
}

function getGameById(gameId: number): Game | null {
    const games: Game[] = getGames();
    const foundGame = games.find(game => game.id === gameId);
    return foundGame || null;
}

function getGameByAddress(gameAddress: string): Game | null {
    const games: Game[] = getGames();
    const foundGame = games.find(game => game.address === gameAddress);
    return foundGame || null;
}

function getCurrentIndex(): number {
    const gamesJson = localStorage.getItem('games');
    if (gamesJson === null) {
      return 0;
    }
  
    try {
      const games: Game[] = JSON.parse(gamesJson);
      return (games.length);
    } catch (error) {
      console.error("Error parsing games from local storage:", error);
      return 0;
    }

}
  
function addGame(gameToAdd: Game): void {
    const existingGames: Game[] = JSON.parse(localStorage.getItem('games') || '[]');

    existingGames.push(gameToAdd);

    localStorage.setItem('games', JSON.stringify(existingGames));
}

function addMove(userMove: Move): void {
    const existingMoves: Move[] = JSON.parse(localStorage.getItem('moves') || '[]');

    existingMoves.push(userMove);

    localStorage.setItem('moves', JSON.stringify(existingMoves));
}

function getMove(address: string, gameId: number): Move| null {
    const moves: Move[] = getMoves();
    console.log("moves: ", moves )
    console.log("address: ", address )
    console.log(address.toLowerCase())
    const foundMove = moves.find(move => (move.address.toLowerCase() === address.toLowerCase() && move.gameId === gameId));
    return foundMove || null;
}

function deleteMove(address: string): void {
    let existingMoves: Move[] = JSON.parse(localStorage.getItem('moves') || '[]');

    existingMoves = existingMoves.filter(move => move.address !== address);

    localStorage.setItem('moves', JSON.stringify(existingMoves));
}



function deleteGame(gameIdToDelete: number): void {
    let existingGames: Game[] = JSON.parse(localStorage.getItem('games') || '[]');

    existingGames = existingGames.filter(game => game.id !== gameIdToDelete);

    localStorage.setItem('games', JSON.stringify(existingGames));
}
   
function updateGame(gameIdToUpdate: number, updatedGame: Game): void {
    let existingGames: Game[] = JSON.parse(localStorage.getItem('games') || '[]');

    
    const gameIndex = existingGames.findIndex(game => game.id === gameIdToUpdate);


        
    existingGames[gameIndex] = updatedGame;

    localStorage.setItem('games', JSON.stringify(existingGames));

    console.log("existig games:", existingGames)
}




export {
    addGame,
    deleteGame,
    getGames,
    getGameById,
    getCurrentIndex,
    updateGame, 
    addMove,
    getMove,
    deleteMove,
    getGameByAddress
}
