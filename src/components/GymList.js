import React from 'react';
import { useNavigate } from 'react-router-dom';

const gyms = [
  { name: 'Pewter Gym', trainer: 'Brock', badge: 'Boulder Badge' },
  { name: 'Cerulean Gym', trainer: 'Misty', badge: 'Cascade Badge' },
  { name: 'Vermilion Gym', trainer: 'Lt. Surge', badge: 'Thunder Badge' },
  { name: 'Celadon Gym', trainer: 'Erika', badge: 'Rainbow Badge' },
];

const GymList = ({ selectedPokemons }) => {
  const navigate = useNavigate();

  if (selectedPokemons.length !== 4) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Please select 4 Pokémon before choosing a Gym.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🏟️ Select a Gym</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gyms.map((gym) => (
          <div
            key={gym.badge}
            className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 cursor-pointer"
            onClick={() => navigate(`/enemy/${encodeURIComponent(gym.badge)}`)}
          >
            <h2 className="text-xl font-bold">{gym.name}</h2>
            <p>Trainer: {gym.trainer}</p>
            <p>Badge: {gym.badge}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymList;