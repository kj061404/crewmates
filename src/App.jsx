import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CharacterCard from './components/CharacterCard'
import CharacterForm from './components/CharacterForm'
import './App.css'

function Home() {
  return (
    <div className="home-container">
      <h1>🎲 Welcome to the RPG Character Creator 🗡️</h1>
      <p>Create and manage your D&D characters with style!</p>
      <div className="home-buttons">
        <Link to="/create" className="home-btn create-link">Create Character</Link>
        <Link to="/gallery" className="home-btn gallery-link">View Gallery</Link>
      </div>
    </div>
  )
}

function CreatePage({ onCreateCharacter }) {
  return (
    <div className="create-page">
      <h2>Create a New Character</h2>
      <CharacterForm onSubmit={onCreateCharacter} />
    </div>
  )
}

function GalleryPage({ characters, onEditCharacter, onDeleteCharacter }) {
  return (
    <div className="gallery-page">
      <h2>Character Gallery</h2>
      <div className="character-grid">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            onEdit={onEditCharacter}
            onDelete={onDeleteCharacter}
          />
        ))}
      </div>
    </div>
  )
}

function Navigation() {
  return (
    <nav className="main-nav">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/create" className="nav-link">Create Character</Link>
      <Link to="/gallery" className="nav-link">Character Gallery</Link>
    </nav>
  )
}

function App() {
  const [characters, setCharacters] = useState([])

  const handleCreateCharacter = (newCharacter) => {
    // This is where you'll implement your Supabase logic
    setCharacters([...characters, { ...newCharacter, id: Date.now() }])
  }

  const handleEditCharacter = (character) => {
    // This is where you'll implement your Supabase logic
    console.log('Edit character:', character)
  }

  const handleDeleteCharacter = (character) => {
    // This is where you'll implement your Supabase logic
    setCharacters(characters.filter(c => c.id !== character.id))
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/create" 
              element={<CreatePage onCreateCharacter={handleCreateCharacter} />} 
            />
            <Route 
              path="/gallery" 
              element={
                <GalleryPage 
                  characters={characters}
                  onEditCharacter={handleEditCharacter}
                  onDeleteCharacter={handleDeleteCharacter}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
