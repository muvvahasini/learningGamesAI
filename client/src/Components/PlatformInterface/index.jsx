import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./index.css"; // <-- Add this import for the CSS

const PlatformInterface = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const jwtToken = Cookies.get("jwt_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse([]);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/platform/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch quiz from server");
      }

      if (data.platform && Array.isArray(data.platform)) {
        setResponse(data.platform);
      } else {
        setError("Unexpected response format from AI");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error fetching quiz from server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="platform-container">
        <div className="platform-card">
          <h2>Create Your Own Quiz</h2>
          <textarea
            className="platform-textarea"
            rows="4"
            placeholder="Ask for a quiz (e.g., 'create quiz for kids')..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>

          <button
            className="platform-button"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Generating..." : "Create Quiz"}
          </button>

          {error && <div className="platform-error">❌ {error}</div>}

          {response.length > 0 && (
            <div className="platform-response">
              <h3>📝 Generated Quiz Questions</h3>
              <ul>
                {response.map((q, index) => (
                  <li key={index}>
                    <p>
                      <strong>Q{index + 1}:</strong> {q.question}
                    </p>
                    <ul className="options-list">
                      {q.options.map((option, optIndex) => (
                        <li
                          key={optIndex}
                          className={
                            option === q.answer ? "correct-answer" : ""
                          }
                        >
                          {option} {option === q.answer && "✔"}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlatformInterface;
