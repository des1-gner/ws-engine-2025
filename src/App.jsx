import React, { useState } from 'react';

// Individual Player Component
const Player = ({ name, initialScore = 0, onScoreChange }) => {
  const [score, setScore] = useState(initialScore);

  const handleScoreChange = (points) => {
    const newScore = score + points;
    setScore(newScore);
    onScoreChange(name, newScore);
  };

  return (
    <div className="player-card bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="score-controls flex items-center justify-between">
        <span className="text-2xl font-semibold">Score: {score}</span>
        <div className="score-buttons flex gap-2">
          <button 
            onClick={() => handleScoreChange(1)} 
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            +1
          </button>
          <button 
            onClick={() => handleScoreChange(2)} 
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            +2
          </button>
          <button 
            onClick={() => handleScoreChange(3)} 
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          >
            +3
          </button>
          <button 
            onClick={() => handleScoreChange(-1)} 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            -1
          </button>
        </div>
      </div>
    </div>
  );
};

// Scoreboard Component
const Scoreboard = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [teamScores, setTeamScores] = useState({});

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 64) {
      const newPlayer = {
        id: Date.now(),
        name: newPlayerName.trim()
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const handlePlayerScoreChange = (playerName, newScore) => {
    setTeamScores(prev => ({
      ...prev,
      [playerName]: newScore
    }));
  };

  const removePlayer = (playerToRemove) => {
    setPlayers(players.filter(player => player.name !== playerToRemove));
    
    // Remove the score for the deleted player
    const updatedScores = {...teamScores};
    delete updatedScores[playerToRemove];
    setTeamScores(updatedScores);
  };

  const resetAllScores = () => {
    setTeamScores({});
  };

  return (
    <div className="scoreboard max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Scoreboard</h1>
      
      {/* Player Addition Section */}
      <div className="player-input flex mb-6">
        <input 
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="flex-grow p-2 border rounded-l-lg"
          disabled={players.length >= 64}
        />
        <button 
          onClick={addPlayer} 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          disabled={players.length >= 64}
        >
          {players.length >= 64 ? 'Max Players' : 'Add Player'}
        </button>
      </div>

      {/* Player List */}
      <div className="players-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map(player => (
          <div key={player.id} className="player-wrapper relative">
            <Player 
              name={player.name} 
              onScoreChange={handlePlayerScoreChange}
            />
            <button 
              onClick={() => removePlayer(player.name)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Team Scores Summary */}
      {players.length > 0 && (
        <div className="team-scores mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Team Scores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.entries(teamScores).map(([name, score]) => (
              <div 
                key={name} 
                className="score-summary bg-white p-2 rounded shadow"
              >
                <span className="font-semibold">{name}:</span> {score}
              </div>
            ))}
          </div>
          <button 
            onClick={resetAllScores}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset All Scores
          </button>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;