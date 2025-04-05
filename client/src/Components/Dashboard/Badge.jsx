function Badge({ score }) {
    const badges = [
      { threshold: 5, name: "Quiz King" },
      { threshold: 10, name: "Genix Star" }
    ];
  
    return (
      <div className="badge-container">
        {badges.map((badge, index) => (
          score >= badge.threshold && (
            <p key={index}>Badge Unlocked: {badge.name}!</p>
          )
        ))}
      </div>
    );
  }
  
  export default Badge;