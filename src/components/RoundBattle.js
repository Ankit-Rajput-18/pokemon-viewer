import React, { useState, useEffect } from 'react';

const RoundBattle = ({ onRoundEnd }) => {
  const [userHP, setUserHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [isFighting, setIsFighting] = useState(false);
  const [turnLog, setTurnLog] = useState([]);
  const [battleOver, setBattleOver] = useState(false);

  const handleAttackTurn = () => {
    if (isFighting || battleOver) return;
    setIsFighting(true);

    const userDamage = Math.floor(Math.random() * 20) + 10;
    const enemyDamage = Math.floor(Math.random() * 20) + 10;

    setTimeout(() => {
      setEnemyHP(prev => {
        const newHP = Math.max(prev - userDamage, 0);
        setTurnLog(prevLog => [...prevLog, `🧢 You dealt ${userDamage} damage!`]);
        return newHP;
      });

      setTimeout(() => {
        setUserHP(prev => {
          const newHP = Math.max(prev - enemyDamage, 0);
          setTurnLog(prevLog => [...prevLog, `👾 Enemy dealt ${enemyDamage} damage!`]);
          return newHP;
        });
        setIsFighting(false);
      }, 800);
    }, 800);
  };

  useEffect(() => {
    if (userHP <= 0 || enemyHP <= 0) {
      setBattleOver(true);
      const winner = userHP > enemyHP ? 'user' : 'enemy';
      setTurnLog(prev => [...prev, `🏆 ${winner === 'user' ? 'You win!' : 'Enemy wins!'}`]);
      onRoundEnd(winner);
    }
  }, [userHP, enemyHP, onRoundEnd]);

  const resetBattle = () => {
    setUserHP(100);
    setEnemyHP(100);
    setTurnLog([]);
    setBattleOver(false);
    setIsFighting(false);
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">⚔️ Pokémon Battle</h2>

      <div className="mb-4">
        <div className="flex justify-between">
          <span>🧢 You</span>
          <span>{userHP} HP</span>
        </div>
        <div className="w-full h-2 bg-red-200 rounded">
          <div
            className="h-2 bg-green-500 rounded transition-all duration-500"
            style={{ width: `${userHP}%` }}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between">
          <span>👾 Enemy</span>
          <span>{enemyHP} HP</span>
        </div>
        <div className="w-full h-2 bg-red-200 rounded">
          <div
            className="h-2 bg-green-500 rounded transition-all duration-500"
            style={{ width: `${enemyHP}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleAttackTurn}
        disabled={isFighting || battleOver}
        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition ${
          isFighting || battleOver ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Attack!
      </button>

      {battleOver && (
        <button
          onClick={resetBattle}
          className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold transition"
        >
          🔄 Restart Battle
        </button>
      )}

      <div className="mt-4 space-y-1 text-sm font-mono">
        {turnLog.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default RoundBattle;