import React from 'react';

const PokemonCard = ({ pokemon, label }) => {
  if (!pokemon || !pokemon.image) {
    return (
      <div className="text-center w-32">
        <h3 className="font-semibold mb-1">{label}</h3>
        <div className="w-20 h-20 mx-auto mb-1 bg-gray-200 rounded animate-pulse" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="text-center w-32">
      <h3 className="font-semibold mb-1">{label}</h3>
      <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mx-auto mb-1" />
      <p className="capitalize text-sm">{pokemon.name}</p>
    </div>
  );
};

export default PokemonCard;