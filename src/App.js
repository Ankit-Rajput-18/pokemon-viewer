import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SelectedList from './components/SelectedList';
import PokemonGrid from './components/PokemonGrid';
import GymList from './components/GymList';
import EnemyPage from './components/EnemyPage';
import BadgeGrid from './components/BadgeGrid';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('badges');
    if (stored) setBadges(JSON.parse(stored));
  }, []);

  const handleBadgeEarned = (badgeName) => {
    if (!badges.includes(badgeName)) {
      const updated = [...badges, badgeName];
      setBadges(updated);
      localStorage.setItem('badges', JSON.stringify(updated));
    }
  };

  return (
    <Router>
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-2xl font-bold mb-4 text-center">Pokémon Battle</h1>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SelectedList
                  selectedPokemons={selectedPokemons}
                  setSelectedPokemons={setSelectedPokemons}
                />
                <PokemonGrid
                  searchTerm={searchTerm}
                  selectedPokemons={selectedPokemons}
                  setSelectedPokemons={setSelectedPokemons}
                />
                {selectedPokemons.length === 4 && (
                  <div className="mt-6 text-center">
                    <a
                      href="/gyms"
                      className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Select Gym
                    </a>
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/gyms"
            element={<GymList selectedPokemons={selectedPokemons} />}
          />
          <Route
            path="/enemy/:badgeName"
            element={
              <EnemyPage
                selectedPokemons={selectedPokemons}
                onBadgeEarned={handleBadgeEarned}
              />
            }
          />
          <Route path="/progress" element={<BadgeGrid badges={badges} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;