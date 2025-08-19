import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BattleManager from './BattleManager';

const EnemyPage = ({ selectedPokemons, onBadgeEarned }) => {
  const { badgeName } = useParams();
  const navigate = useNavigate();

  const [enemyTeam, setEnemyTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [battleOver, setBattleOver] = useState(false);

  // Fetch enemy team
  useEffect(() => {
    async function fetchEnemyTeam() {
      const randomIds = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 151) + 1
      );
      const fetches = randomIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
      );
      const results = await Promise.all(fetches);
      const formatted = results.map((p) => ({
        name: p.name,
        sprites: { front_default: p.sprites.front_default },
        moves: p.moves.length ? p.moves : [{ move: { name: 'Tackle' } }],
      }));
      setEnemyTeam(formatted);
      setLoading(false);
    }

    fetchEnemyTeam();
  }, []);

  // Format user team
  const formattedUserTeam = selectedPokemons.map((p) => ({
    name: p.name,
    sprites: { front_default: p.sprites.front_default },
    moves: p.moves.length ? p.moves : [{ move: { name: 'Tackle' } }],
  }));

  // Handle round result
  const handleRoundEnd = (winner) => {
    if (winner === 'user') setUserScore((prev) => prev + 1);
    else setEnemyScore((prev) => prev + 1);

    setTimeout(() => {
      setRound((prev) => prev + 1);
    }, 300); // slight delay to avoid race condition
  };

  // Check for battle completion
  useEffect(() => {
    if (round === 3) {
      setBattleOver(true);
      if (userScore >= 2) {
        onBadgeEarned(badgeName);
      }
    }
  }, [round, userScore, badgeName, onBadgeEarned]);

  // Replay logic
  const handleReplay = () => {
    setRound(0);
    setUserScore(0);
    setEnemyScore(0);
    setBattleOver(false);
    setLoading(true);
    setEnemyTeam([]);

    async function fetchEnemyTeam() {
      const randomIds = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 151) + 1
      );
      const fetches = randomIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
      );
      const results = await Promise.all(fetches);
      const formatted = results.map((p) => ({
        name: p.name,
        sprites: { front_default: p.sprites.front_default },
        moves: p.moves.length ? p.moves : [{ move: { name: 'Tackle' } }],
      }));
      setEnemyTeam(formatted);
      setLoading(false);
    }

    fetchEnemyTeam();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">⚔️ {badgeName} Challenge</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading enemy team...</p>
      ) : (
        <>
          {round < 3 && formattedUserTeam[round] && enemyTeam[round] ? (
            <BattleManager
              currentUserPokemon={formattedUserTeam[round]}
              currentEnemyPokemon={enemyTeam[round]}
              onRoundEnd={handleRoundEnd}
              round={round}
            />
          ) : (
            battleOver && (
              <div className="text-center mt-6">
                <p className="text-lg font-semibold mb-4">
                  Battle Over! {userScore >= 2 ? '🏆 You won the badge!' : '😢 You lost this time.'}
                </p>
                <button
                  onClick={handleReplay}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
                >
                  Play Again
                </button>
                <button
                  onClick={() => navigate('/progress')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  View Progress
                </button>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default EnemyPage;