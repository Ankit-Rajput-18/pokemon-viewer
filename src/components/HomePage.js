import React from 'react';

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

const HomePage = ({ badges }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🏅 Your Badge Progress</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allBadges.map((badge) => (
          <div
            key={badge}
            className={`p-4 rounded text-center shadow ${
              badges.includes(badge)
                ? 'bg-yellow-300 text-white animate-glow'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {badge}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-gray-600">
        {badges.length} / {allBadges.length} badges earned
      </p>
    </div>
  );
};

export default HomePage;