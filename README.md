# Rock-Paper-Scissors-Lizard-Spock DApp

This project is a decentralized application (DApp) for playing an extended version of Rock-Paper-Scissors, which includes two additional weapons: Lizard and Spock. The game is built on the Ethereum blockchain and can be played using MetaMask on the specified Ethereum testnet.

## Technologies Used

- **Frontend**: Next.js with TypeScript
- **Styling**: TailwindCSS
- **Blockchain Interactions**: Wagmi, Ethers.js, Viem
- **Ethereum Testnet**: Goerli
- **Smart Contract**: [RPS.Sol](github.com/clesaege/RPS/blob/master/RPS.sol)

## Features

- **Create a Game**: Users can create a game by staking ETH and choosing an opponent.
- **Join a Game**: Opponents can join the game by staking the same amount of ETH.
- **Gameplay**: The first player makes a move by submitting a hashed version of their choice along with a salt. The second player then chooses their move.
- **Reveal and Settlement**: The first player reveals their move, and the contract resolves the game, distributing the ETH to the winner or splitting in case of a tie.
- **Timeouts**: Implemented to handle situations where a party stops responding.

## Security Considerations

In developing this DApp, particular attention has been given to security aspects to prevent loss of ETH and to safeguard against potential attacks. Key considerations include:


- **Replay Attacks**: Ensure that each game instance is unique and can't be reused in replay attacks. This is done by maintaining a game state tied to specific players and stakes, making each game session distinct.

- **Transaction Rejection Handling**: The application detects and handles transaction rejections from the user's wallet (e.g., MetaMask). This prevents the DApp from entering an inconsistent state if a user decides to cancel a transaction.

- **Timeout Manipulation**: The contract enforces strict rules for timeouts to prevent players from stalling or manipulating the game's progression. This ensures fairness and timely resolution of games.


## Installation and Setup

```bash
git clone https://github.com/marcusats/rock-paper-kleros.git
cd rock-paper-kleros
npm install
npm run dev
```

## Using the DApp

1. **Connect Wallet**: Use MetaMask to connect your wallet.
2. **Create or Join a Game**: Follow the on-screen instructions to participate in a game.
3. **Play**: Choose your move wisely!

---

## Mixed strategy Nash equilibria 

| Player 1 \ Player 2 | Rock (P2) | Paper (P2) | Scissors (P2) | Lizard (P2) | Spock (P2) |
|---------------------|-----------|------------|---------------|-------------|------------|
| Rock (P1)           | (0, 0)    | (0, 1)     | (1, 0)        | (1, 0)      | (0, 1)     |
| Paper (P1)          | (1, 0)    | (0, 0)     | (0, 1)        | (0, 1)      | (1, 0)     |
| Scissors (P1)       | (0, 1)    | (1, 0)     | (0, 0)        | (1, 0)      | (0, 1)     |
| Lizard (P1)         | (0, 1)    | (1, 0)     | (0, 1)        | (0, 0)      | (1, 0)     |
| Spock (P1)          | (1, 0)    | (0, 1)     | (1, 0)        | (0, 1)      | (0, 0)     |

#### Rock:

- Vs Rock (Tie): 0
- Vs Paper (Lose): -1
- Vs Scissors (Win): +1
- Vs Lizard (Win): +1
- Vs Spock (Lose): -1

**Expected payoff for Rock =**  1/5 * (0 - 1 + 1 + 1 - 1) = 0 

#### Paper:

- Vs Rock (Win): +1
- Vs Paper (Tie): 0
- Vs Scissors (Lose): -1
- Vs Lizard (Lose): -1
- Vs Spock (Win): +1

**Expected payoff for Paper =**  1/5 * (1 + 0 - 1 - 1 + 1) = 0 

#### Scissors:

- Vs Rock (Lose): -1
- Vs Paper (Win): +1
- Vs Scissors (Tie): 0
- Vs Lizard (Win): +1
- Vs Spock (Lose): -1

**Expected payoff for Scissors =**  1/5 * (-1 + 1 + 0 + 1 - 1) = 0 

#### Lizard:

- Vs Rock (Lose): -1
- Vs Paper (Win): +1
- Vs Scissors (Lose): -1
- Vs Lizard (Tie): 0
- Vs Spock (Win): +1

**Expected payoff for Lizard =**  1/5 * (-1 + 1 - 1 + 0 + 1) = 0 

#### Spock:

- Vs Rock (Win): +1
- Vs Paper (Lose): -1
- Vs Scissors (Win): +1
- Vs Lizard (Lose): -1
- Vs Spock (Tie): 0

**Expected payoff for Spock =**  1/5 * (1 - 1 + 1 - 1 + 0) = 0 

This calculation confirms that the game is in equilibrium where each strategy has a probability of 20%. 

---

This project is part of a job application and is intended to demonstrate skills in building decentralized applications using modern web technologies.

Marcusats
