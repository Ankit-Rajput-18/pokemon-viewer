import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectedList = ({ selectedPokemons, setSelectedPokemons }) => {
  const navigate = useNavigate();

  const handleRemove = (id) => {
    const updatedList = selectedPokemons.filter(p => p.id !== id);
    setSelectedPokemons(updatedList);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Your Team</h2>
      {selectedPokemons.length === 0 ? (
        <p className="text-gray-500">No Pokémon selected yet.</p>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {selectedPokemons.map((pokemon) => (
            <div key={pokemon.id} className="bg-white p-2 rounded shadow text-center w-24 relative">
              <button
                onClick={() => handleRemove(pokemon.id)}
                className="absolute top-1 right-1 text-xs text-red-500 hover:text-red-700"
              >
                ✕
              </button>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto w-16 h-16" />
              <p className="capitalize text-sm">{pokemon.name}</p>
            </div>
          ))}
        </div>
      )}
      {selectedPokemons.length === 4 && (
        <button
          onClick={() => navigate('/gyms')}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Select Gym
        </button>
      )}
    </div>
  );
};

export default SelectedList;