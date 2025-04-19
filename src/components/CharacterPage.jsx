import { useParams } from 'react-router-dom';

function CharacterPage({ characters }) {
  const { id } = useParams();
  const character = characters.find(c => c.id === parseInt(id));

  if (!character) {
    return <div className="character-page">Character not found</div>;
  }

  const getPowerLevel = (level) => {
    if (level >= 18) return "Legendary Hero - Tales of their deeds will be sung for generations! 🌟";
    if (level >= 15) return "Master of the Arts - A force to be reckoned with! ⚔️";
    if (level >= 12) return "Veteran Adventurer - Well-known across the realm! 🏰";
    if (level >= 8) return "Seasoned Fighter - Making a name for themselves! 🛡️";
    if (level >= 5) return "Promising Adventurer - The journey has just begun! 🗡️";
    return "Novice Explorer - Every hero starts somewhere! 🌱";
  };

  const getClassIcon = (characterClass) => {
    const icons = {
      'Warrior': '⚔️',
      'Mage': '🔮',
      'Rogue': '🗡️',
      'Cleric': '✨',
      'Ranger': '🏹',
      'Paladin': '🛡️'
    };
    return icons[characterClass] || '❓';
  };

  const getAlignmentDescription = (alignment) => {
    const descriptions = {
      'Lawful Good': 'A noble soul, fighting for justice and honor',
      'Neutral Good': 'A helper of those in need, guided by compassion',
      'Chaotic Good': 'A free spirit, fighting for what\'s right',
      'Lawful Neutral': 'A follower of order and tradition',
      'True Neutral': 'A seeker of balance in all things',
      'Chaotic Neutral': 'A free spirit, guided by their own compass',
      'Lawful Evil': 'A manipulator of rules for personal gain',
      'Neutral Evil': 'A seeker of power, regardless of the cost',
      'Chaotic Evil': 'A harbinger of chaos and destruction'
    };
    return descriptions[alignment] || 'A mysterious figure';
  };

  return (
    <div className="character-page">
      <div className="character-header">
        <h1>{character.name} {getClassIcon(character.class)}</h1>
        <div className="character-subtitle">Level {character.skill_level} {character.class}</div>
      </div>

      <div className="character-power-level">
        <h2>Power Level</h2>
        <p>{getPowerLevel(character.skill_level)}</p>
      </div>

      <div className="character-details">
        <div className="detail-section">
          <h2>Combat Style</h2>
          <p>Wields a mighty <span className="highlight">{character.weapon}</span></p>
        </div>

        <div className="detail-section">
          <h2>Moral Compass</h2>
          <p>{character.alignment}</p>
          <p className="alignment-description">{getAlignmentDescription(character.alignment)}</p>
        </div>
      </div>
    </div>
  );
}

export default CharacterPage; 