import React from 'react';

const PokemonSelector = ({ team = [], currentIndex, onSelect }) => {
  if (!Array.isArray(team)) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-center">🔄 Choose Your Next Pokémon</h3>
      <div className="flex gap-4 justify-center flex-wrap">
        {team.map((pokemon, index) => (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className={`cursor-pointer p-2 rounded shadow text-center w-24 border-2 transition-transform hover:scale-105 ${
              index === currentIndex ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <img src={pokemon.image} alt={pokemon.name} className="mx-auto w-16 h-16" />
            <p className="capitalize text-sm mt-1">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonSelector;