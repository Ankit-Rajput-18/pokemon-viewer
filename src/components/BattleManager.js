import React, { useState, useEffect } from 'react';

const BattleManager = ({ currentUserPokemon, currentEnemyPokemon, onRoundEnd, round }) => {
  const [userHP, setUserHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [selectedMove, setSelectedMove] = useState(null);
  const [isFighting, setIsFighting] = useState(false);
  const [battleLog, setBattleLog] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [roundEnded, setRoundEnded] = useState(false); // ✅ NEW

  useEffect(() => {
    // Reset battle state when new round starts
    setUserHP(100);
    setEnemyHP(100);
    setSelectedMove(null);
    setBattleLog([]);
    setGameOver(false);
    setRoundEnded(false); // ✅ NEW
  }, [currentUserPokemon, currentEnemyPokemon]);

  useEffect(() => {
    if ((userHP <= 0 || enemyHP <= 0) && !roundEnded) {
      setGameOver(true);
      setRoundEnded(true); // ✅ Prevent multiple triggers

      const winner = userHP > enemyHP ? 'user' : 'enemy';
      setBattleLog((prev) => [
        ...prev,
        userHP <= 0
          ? `💀 ${currentUserPokemon.name} fainted!`
          : `🏆 ${currentEnemyPokemon.name} fainted!`,
        `🎯 Winner: ${winner === 'user' ? 'Your Team' : 'Enemy Team'}`
      ]);

      setTimeout(() => {
        onRoundEnd(winner);
      }, 1200);
    }
  }, [userHP, enemyHP, roundEnded, currentUserPokemon, currentEnemyPokemon, onRoundEnd]);

  const handleAttackTurn = () => {
    if (!selectedMove || isFighting || gameOver) return;
    setIsFighting(true);

    const userMove = selectedMove;
    const enemyMoveObj =
      currentEnemyPokemon.moves[Math.floor(Math.random() * currentEnemyPokemon.moves.length)];
    const enemyMove = enemyMoveObj?.move?.name || 'Tackle';

    const userDamage = Math.floor(Math.random() * 20) + 10;
    const enemyDamage = Math.floor(Math.random() * 20) + 10;

    setBattleLog((prev) => [
      ...prev,
      `🧢 ${currentUserPokemon.name} used ${userMove}!`,
      `👾 ${currentEnemyPokemon.name} used ${enemyMove}!`,
    ]);

    setTimeout(() => {
      setEnemyHP((prev) => Math.max(prev - userDamage, 0));
      setTimeout(() => {
        setUserHP((prev) => Math.max(prev - enemyDamage, 0));
        setIsFighting(false);
      }, 800);
    }, 800);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2 text-center">Round {round + 1}</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <img src={currentUserPokemon.sprites.front_default} alt="User" />
          <p className="font-bold capitalize">{currentUserPokemon.name}</p>
          <p>HP: {userHP}</p>
        </div>
        <div className="text-center">
          <img src={currentEnemyPokemon.sprites.front_default} alt="Enemy" />
          <p className="font-bold capitalize">{currentEnemyPokemon.name}</p>
          <p>HP: {enemyHP}</p>
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {currentUserPokemon.moves.slice(0, 4).map((moveObj, i) => (
          <button
            key={i}
            onClick={() => setSelectedMove(moveObj.move.name)}
            className={`px-3 py-1 rounded ${
              selectedMove === moveObj.move.name ? 'bg-blue-700 text-white' : 'bg-gray-300'
            }`}
          >
            {moveObj.move.name}
          </button>
        ))}
      </div>

      <button
        onClick={handleAttackTurn}
        disabled={!selectedMove || isFighting || gameOver}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        Attack!
      </button>

      <div className="mt-4 bg-white p-3 rounded text-sm font-mono max-h-40 overflow-y-auto border border-gray-300">
        {battleLog.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default BattleManager;