import React from 'react';

const BadgePopup = () => (
  <div className="fixed bottom-4 right-4 bg-yellow-300 px-4 py-3 rounded-lg shadow-lg animate-bounce z-50">
    <div className="text-center">
      <p className="text-lg font-bold text-white">🏅 Thunder Badge Earned!</p>
      <p className="text-sm text-white mt-1">You won the battle!</p>
    </div>
  </div>
);

export default BadgePopup;