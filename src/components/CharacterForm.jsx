import { useState, useEffect } from 'react'

function CharacterForm({ onSubmit, initialCharacter }) {
    const [character, setCharacter] = useState({
      name: '',
      class: '',
      skill_level: 1,
      weapon: '',
      alignment: ''
    })

    useEffect(() => {
      if (initialCharacter) {
        setCharacter(initialCharacter)
      }
    }, [initialCharacter])
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(character)
      if (!initialCharacter) {
        setCharacter({
          name: '',
          class: '',
          skill_level: 1,
          weapon: '',
          alignment: ''
        })
      }
    }
  
    const classes = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Ranger', 'Paladin']
    const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']
    const weapons = ['Longsword', 'Staff', 'Bow', 'Dagger', 'Warhammer', 'Battle Axe', 'Crossbow', 'Mace']
  
    return (
      <form onSubmit={handleSubmit} className="character-form">
        <div className="form-group">
          <label htmlFor="name">Character Name:</label>
          <input
            type="text"
            id="name"
            value={character.name}
            onChange={(e) => setCharacter({...character, name: e.target.value})}
            required
            className="form-input"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            value={character.class}
            onChange={(e) => setCharacter({...character, class: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select a class</option>
            {classes.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="skill_level">Skill Level (1-20):</label>
          <input
            type="number"
            id="skill_level"
            min="1"
            max="20"
            value={character.skill_level}
            onChange={(e) => {
              const value = e.target.value === '' ? 1 : parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= 20) {
                setCharacter({...character, skill_level: value});
              }
            }}
            required
            className="form-input"
          />
        </div>
  
        <div className="form-group">
          <label htmlFor="weapon">Weapon:</label>
          <select
            id="weapon"
            value={character.weapon}
            onChange={(e) => setCharacter({...character, weapon: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select a weapon</option>
            {weapons.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="alignment">Alignment:</label>
          <select
            id="alignment"
            value={character.alignment}
            onChange={(e) => setCharacter({...character, alignment: e.target.value})}
            required
            className="form-select"
          >
            <option value="">Select alignment</option>
            {alignments.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
  
        <button type="submit" className="submit-btn">
          {initialCharacter ? 'Update Character' : 'Create Character'}
        </button>
      </form>
    )
}

export default CharacterForm;

