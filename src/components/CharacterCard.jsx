function CharacterCard({ character, onEdit, onDelete }) {
    return (
      <div className="character-card">
        <h3>{character.name}</h3>
        <div className="character-info">
          <p><span>Class:</span> {character.class}</p>
          <p><span>Level:</span> {character.skill_level}</p>
          <p><span>Weapon:</span> {character.weapon}</p>
          <p><span>Alignment:</span> {character.alignment}</p>
        </div>
        <div className="character-actions">
          <button onClick={() => onEdit(character)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(character)} className="delete-btn">Delete</button>
        </div>
      </div>
    )
  }

  export default CharacterCard;