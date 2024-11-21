import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import './App.css'

// Import local images
import awsLogo from './assets/aws-logo.png'
import wsLogo from './assets/ws-logo.png'

const Header = ({ username }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Left Side - Logos and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logos */}
          <div className="flex items-center space-x-4">
            <img 
              src={wsLogo} 
              alt="WorldSkills Logo" 
              className="h-10 w-20 object-contain" 
            />
            <img 
              src={awsLogo} 
              alt="AWS Logo" 
              className="h-10 w-20 object-contain" 
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/challenges" className="hover:underline">Challenges</Link>
            <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          </nav>
        </div>

        {/* Right Side - User Info and Login/Logout */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div>
        © WorldSkills Australia 2025
      </div>
    </footer>
  )
}

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to WorldSkills</h1>
      <p className="text-lg mb-4">
        WorldSkills is a global platform dedicated to showcasing and developing 
        skills across various domains. Our mission is to inspire young people 
        to excel in their chosen fields and promote the importance of skills 
        in personal and professional growth.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p>
            To empower individuals through skills development and 
            provide a platform for global recognition and opportunity.
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
          <p>
            We organize competitions, provide training, and create 
            networking opportunities for skilled professionals worldwide.
          </p>
        </div>
      </div>
    </div>
  )
}

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Dashboard content coming soon...</p>
    </div>
  )
}

const ChallengesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Challenges</h1>
      <p>Challenges content coming soon...</p>
    </div>
  )
}

const Leaderboard = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'John Doe', score: 150 },
    { id: 2, name: 'Jane Smith', score: 200 },
    { id: 3, name: 'Mike Johnson', score: 120 },
    { id: 4, name: 'Sarah Williams', score: 180 }
  ]);

  const [newPlayerName, setNewPlayerName] = useState('');

  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 64) {
      const newPlayer = {
        id: Date.now(),
        name: newPlayerName.trim(),
        score: 0
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const updatePlayerScore = (playerId, points) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, score: Math.max(0, player.score + points) }
        : player
    ));
  };

  const removePlayer = (playerId) => {
    setPlayers(players.filter(player => player.id !== playerId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      {/* Player Addition Section */}
      <div className="mb-6 flex">
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

      {/* Sorted Player List with Score Controls */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-right">Score</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr 
                key={player.id} 
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{player.name}</td>
                <td className="py-3 px-4 text-right">{player.score}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => updatePlayerScore(player.id, 1)}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                    >
                      +1
                    </button>
                    <button 
                      onClick={() => updatePlayerScore(player.id, -1)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      -1
                    </button>
                    <button 
                      onClick={() => removePlayer(player.id)}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header username="<showuser>" />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App