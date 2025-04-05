import { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const navigate = useNavigate();
const jwtToken = Cookie.get('jwt_token');
if (jwtToken === undefined){
  navigate('./login');
}

function Leaderboard({ userId, token }) {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch('http://localhost:5000/api/quiz/leaderboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setLeaders(data);
    };
    fetchLeaderboard();
  }, [token]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard Ra Machi!</h2>
      <ul>
        {leaders.map((leader, index) => (
          <li key={leader.id} className={leader.id === userId ? 'current-user' : ''}>
            #{index + 1} - {leader.name} - Score: {leader.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;