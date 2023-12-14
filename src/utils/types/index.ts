


export type Game = {
    id: number;
    address: string;
    name: string;
    players: Players;
    stake: string;
    ready: boolean;
};

export type Move = {
    address: string;
    gameId: number;
    move: number;
    salt: number;
}   

export type Players = {
    player1: string | undefined;
    player2: string | undefined;
}


