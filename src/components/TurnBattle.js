import React, { useState, useEffect } from 'react';

const TurnBattle = ({ 
  user, 
  enemy, 
  currentRound, 
  userPoints, 
  enemyPoints, 
  setUserPoints, 
  setEnemyPoints, 
  onBattleEnd 
}) => {
  const [userHP, setUserHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [log, setLog] = useState([]);
  const [isFighting, setIsFighting] = useState(false);
  const [battleOver, setBattleOver] = useState(false);

  const attackTurn = () => {
    if (isFighting || battleOver) return;
    setIsFighting(true);

    const userDamage = Math.floor(Math.random() * 20) + 10;
    const enemyDamage = Math.floor(Math.random() * 20) + 10;

    setTimeout(() => {
      setEnemyHP(prev => Math.max(prev - userDamage, 0));
      setLog(prev => [...prev, `🧢 ${user.name} dealt ${userDamage} damage!`]);

      setTimeout(() => {
        setUserHP(prev => Math.max(prev - enemyDamage, 0));
        setLog(prev => [...prev, `👾 ${enemy.name} dealt ${enemyDamage} damage!`]);
        setIsFighting(false);
      }, 800);
    }, 800);
  };

  useEffect(() => {
    if (userHP <= 0 || enemyHP <= 0) {
      setBattleOver(true);
      const winner = userHP > enemyHP ? 'user' : 'enemy';
      setLog(prev => [...prev, `🏆 ${winner === 'user' ? 'You win this round!' : 'Enemy wins this round!'}`]);

      // Delay for suspense before updating points and ending battle
      setTimeout(() => {
        if (winner === 'user') {
          setUserPoints(prev => prev + 1);
        } else {
          setEnemyPoints(prev => prev + 1);
        }
        onBattleEnd(winner);
      }, 1200);
    }
  }, [userHP, enemyHP, onBattleEnd, setUserPoints, setEnemyPoints]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2 text-center">⚔️ Turn-Based Battle</h2>
      <p className="text-center text-sm mb-4">🎯 Round {currentRound}</p>

      <div className="flex justify-between mb-4 text-center">
        <div>
          <img src={user.image} alt={user.name} className="w-20 h-20 mx-auto mb-1" />
          <p className="capitalize font-semibold">{user.name}</p>
          <div className="w-24 h-2 bg-red-200 rounded">
            <div
              className="h-2 bg-green-500 rounded transition-all duration-500"
              style={{ width: `${userHP}%` }}
            />
          </div>
          <p className="text-sm mt-1">{userHP} HP</p>
          <p className="text-xs mt-1">Your Team Points: {userPoints}</p>
        </div>

        <div>
          <img src={enemy.image} alt={enemy.name} className="w-20 h-20 mx-auto mb-1" />
          <p className="capitalize font-semibold">{enemy.name}</p>
          <div className="w-24 h-2 bg-red-200 rounded">
            <div
              className="h-2 bg-green-500 rounded transition-all duration-500"
              style={{ width: `${enemyHP}%` }}
            />
          </div>
          <p className="text-sm mt-1">{enemyHP} HP</p>
          <p className="text-xs mt-1">Enemy Team Points: {enemyPoints}</p>
        </div>
      </div>

      <button
        onClick={attackTurn}
        disabled={isFighting || battleOver}
        className={`w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition ${
          isFighting || battleOver ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Attack!
      </button>

      <div className="mt-4 space-y-1 text-sm font-mono max-h-40 overflow-y-auto">
        {log.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

export default TurnBattle;