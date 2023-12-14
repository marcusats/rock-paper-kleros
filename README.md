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

This application is designed with security in mind to prevent loss of ETH. [Explain any specific security measures or considerations in your implementation.]

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

This project is part of a job application and is intended to demonstrate skills in building decentralized applications using modern web technologies.

Marcusats
