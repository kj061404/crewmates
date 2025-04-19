import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import supabase from './supabaseClient.js'
import CharacterCard from './components/CharacterCard'
import CharacterForm from './components/CharacterForm'
import CharacterPage from './components/CharacterPage'
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
  const navigate = useNavigate();
  
  const handleSubmit = (character) => {
    onCreateCharacter(character);
    navigate('/gallery');
  };

  return (
    <div className="create-page">
      <h2>Create a New Character</h2>
      <CharacterForm onSubmit={handleSubmit} />
    </div>
  );
}

function EditPage({ characters, onEditCharacter }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const character = characters.find(c => c.id === parseInt(id));

  const handleSubmit = (updatedCharacter) => {
    onEditCharacter({ ...updatedCharacter, id: parseInt(id) });
    navigate('/gallery');
  };

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="create-page">
      <h2>Edit Character</h2>
      <CharacterForm onSubmit={handleSubmit} initialCharacter={character} />
    </div>
  );
}

function GalleryPage({ characters, onEditCharacter, onDeleteCharacter }) {
  const navigate = useNavigate();
  
  return (
    <div className="gallery-page">
      <h2>Character Gallery</h2>
      <div className="character-grid">
        {characters.map(character => (
          <div key={character.id}>
            <CharacterCard
              character={character}
              onEdit={() => navigate(`/edit/${character.id}`)}
              onDelete={onDeleteCharacter}
              onClick={() => navigate(`/character/${character.id}`)}
            />
          </div>
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

  useEffect(() => {
    // Fetch characters when component mounts
    getCharacters()
  }, [])

  const getCharacters = async () => {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching characters:', error)
    } else {
      setCharacters(data || [])
    }
  }

  const handleCreateCharacter = async (newCharacter) => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .insert([newCharacter])
        .select()

      if (error) {
        console.error('Error creating character:', error.message)
        if (error.code === '401') {
          console.error('Authentication error. Please check your Supabase credentials.')
        }
      } else if (data) {
        setCharacters([...characters, data[0]])
      }
    } catch (err) {
      console.error('Unexpected error creating character:', err)
    }
  }

  const handleEditCharacter = async (character) => {
    const { data, error } = await supabase
      .from('characters')
      .update({
        name: character.name,
        class: character.class,
        skill_level: character.skill_level,
        weapon: character.weapon,
        alignment: character.alignment
      })
      .eq('id', character.id)
      .select()

    if (error) {
      console.error('Error updating character:', error)
    } else if (data) {
      setCharacters(characters.map(c => c.id === character.id ? data[0] : c))
    }
  }

  const handleDeleteCharacter = async (character) => {
    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', character.id)

    if (error) {
      console.error('Error deleting character:', error)
    } else {
      setCharacters(characters.filter(c => c.id !== character.id))
    }
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
              path="/edit/:id" 
              element={<EditPage characters={characters} onEditCharacter={handleEditCharacter} />} 
            />
            <Route 
              path="/character/:id" 
              element={<CharacterPage characters={characters} />} 
            />
            <Route 
              path="/gallery" 
              element={
                <GalleryPage 
                  characters={characters}
                  onEditCharacter={(character) => window.location.href = `/edit/${character.id}`}
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
