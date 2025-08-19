import React from 'react';
import { useNavigate } from 'react-router-dom';

const allBadges = [
  'Thunder Badge',
  'Cascade Badge',
  'Boulder Badge',
  'Rainbow Badge',
  'Soul Badge',
  'Marsh Badge',
  'Volcano Badge',
  'Earth Badge',
];

const BadgeGrid = ({ badges }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🏅 Your Badge Progress</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allBadges.map((badge) => (
          <button
            key={badge}
            onClick={() => navigate(`/enemy/${encodeURIComponent(badge)}`)}
            className={`p-4 rounded text-center shadow ${
              badges.includes(badge)
                ? 'bg-yellow-300 text-white animate-glow'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            {badge}
          </button>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-gray-600">
        {badges.length} / {allBadges.length} badges earned
      </p>
    </div>
  );
};

export default BadgeGrid;