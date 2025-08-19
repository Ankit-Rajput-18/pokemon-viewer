import React from 'react';
import BattleManager from '../components/BattleManager';

const BattleArena = () => {
  const userTeam = [
    { name: 'pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { name: 'bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { name: 'charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  ];

  const enemyTeam = [
    { name: 'squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { name: 'meowth', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
    { name: 'ekans', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300 flex items-center justify-center">
      <BattleManager userTeam={userTeam} enemyTeam={enemyTeam} />
    </div>
  );
};

export default BattleArena;