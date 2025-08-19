import React, { useState } from 'react';
import BattleManager from './BattleManager';

const pokemons = {
  player: ['Pikachu', 'Charizard', 'Bulbasaur'],
  opponent: ['Onix', 'Gengar', 'Machamp'],
};

const BattleArena = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [enemyPoints, setEnemyPoints] = useState(0);
  const [roundWinner, setRoundWinner] = useState(null);
  const [battleComplete, setBattleComplete] = useState(false);

  const handleRoundEnd = (winner) => {
    setRoundWinner(winner);
    setBattleComplete(true);

    if (winner === 'user') {
      setUserPoints((prev) => prev + 1);
    } else {
      setEnemyPoints((prev) => prev + 1);
    }
  };

  const nextRound = () => {
    if (currentRound < 2) {
      setCurrentRound((prev) => prev + 1);
      setBattleComplete(false);
      setRoundWinner(null);
    }
  };

  const userPokemon = {
    name: pokemons.player[currentRound],
    sprites: { front_default: `/images/${pokemons.player[currentRound]}.png` },
    moves: [
      { move: { name: 'Thunderbolt' } },
      { move: { name: 'Quick Attack' } },
      { move: { name: 'Iron Tail' } },
      { move: { name: 'Electro Ball' } },
    ],
  };

  const enemyPokemon = {
    name: pokemons.opponent[currentRound],
    sprites: { front_default: `/images/${pokemons.opponent[currentRound]}.png` },
    moves: [
      { move: { name: 'Rock Throw' } },
      { move: { name: 'Shadow Ball' } },
      { move: { name: 'Cross Chop' } },
      { move: { name: 'Earthquake' } },
    ],
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">🏆 Pokémon Badge Challenge</h2>
      <p className="mb-2">Round {currentRound + 1} of 3</p>
      <p>Your Team Points: {userPoints} | Enemy Team Points: {enemyPoints}</p>

      {!battleComplete ? (
        <BattleManager
          currentUserPokemon={userPokemon}
          currentEnemyPokemon={enemyPokemon}
          onRoundEnd={handleRoundEnd}
          round={currentRound}
        />
      ) : (
        <>
          <h3 className="mt-4 text-lg font-semibold">
            🏁 Round {currentRound + 1} Winner: {roundWinner === 'user' ? 'Your Team' : 'Enemy Team'}
          </h3>
          {currentRound < 2 ? (
            <button
              onClick={nextRound}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next Round
            </button>
          ) : (
            <h4 className="mt-4 text-xl font-bold text-green-600">
              🎉 All rounds complete! Final Score: You {userPoints} - {enemyPoints} Enemy
            </h4>
          )}
        </>
      )}
    </div>
  );
};

export default BattleArena;