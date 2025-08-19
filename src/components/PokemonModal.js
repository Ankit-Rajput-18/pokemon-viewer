import React from 'react';

const PokemonModal = ({ pokemon, onClose, onSelect, isSelected }) => {
  if (!pokemon) return null;

  const types = pokemon.types.map(t => t.type.name);
  const abilities = pokemon.abilities.map(a => a.ability.name);
  const moves = pokemon.moves.slice(0, 4).map(m => m.move.name); // limit to 4

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto mb-4 w-24 h-24"
        />

        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        <p><strong>Type:</strong> {types.join(', ')}</p>
        <p><strong>Abilities:</strong> {abilities.join(', ')}</p>
        <p><strong>Moves:</strong> {moves.join(', ')}</p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>

          {!isSelected && (
            <button
              onClick={() => {
                onSelect(pokemon);
                onClose();
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;