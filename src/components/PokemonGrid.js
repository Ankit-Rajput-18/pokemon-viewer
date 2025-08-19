import React, { useEffect, useState } from 'react';
import PokemonModal from './PokemonModal';

const PokemonGrid = ({ searchTerm, selectedPokemons, setSelectedPokemons }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json();
      const fetchDetails = data.results.map(p => fetch(p.url).then(res => res.json()));
      const detailedData = await Promise.all(fetchDetails);
      setPokemonList(detailedData);
    }
    fetchPokemon();
  }, []);

  const filteredList = pokemonList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (pokemon) => {
    if (selectedPokemons.find(p => p.id === pokemon.id)) return;
    if (selectedPokemons.length >= 4) {
      alert("You can only select 4 Pokémon");
      return;
    }
    setSelectedPokemons([...selectedPokemons, pokemon]);
  };

  const handleCardClick = (pokemon) => {
    setSelectedPokemonDetails(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemonDetails(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredList.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => handleCardClick(pokemon)}
            className="cursor-pointer bg-white p-4 rounded shadow text-center hover:scale-105 transition-transform"
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto mb-2 w-20 h-20" />
            <p className="capitalize font-semibold">{pokemon.name}</p>
          </div>
        ))}
      </div>
      {selectedPokemonDetails && (
        <PokemonModal
          pokemon={selectedPokemonDetails}
          onClose={handleCloseModal}
          onSelect={handleSelect}
          isSelected={selectedPokemons.some(p => p.id === selectedPokemonDetails.id)}
        />
      )}
    </>
  );
};

export default PokemonGrid;