import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import './index.css';
import Header from "../Header/Header";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const Quiz = () => {
  const [grade, setGrade] = useState("");
  const [course, setCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [topicsData, setTopicsData] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [require, setRequire] = useState('');
  const [completion, setCompletion] = useState("");

  const [width, height] = useWindowSize();

  const handleGetTopics = async (e) => {
    e.preventDefault();
    if (!grade || !course) return;
    setLoading(true);
    const token = Cookies.get('jwt_token');
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/generate-topics",
        { grade, course },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopicsData(res.data.topics);
      setStep(2);
    } catch (error) {
      console.error("Error generating topics:", error);
    }
    setLoading(false);
  };

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    setSubmitted(false);
    setScore(null);
    setAnswers({});
    const token = Cookies.get('jwt_token');
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/generate-topics",
        { topic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuiz(res.data.questions);
      const k = res.data.questions.map((eachItem) => ({
        answer: eachItem.answer
      }));
      setCorrectAnswers([...k]);
      setStep(3);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
    setLoading(false);
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmitQuiz = async (event) => {
    event.preventDefault();

    const token = Cookies.get("jwt_token");

    if (!token) {
      console.error("No JWT token found");
      return;
    }

    const answerArray = Object.values(answers);
    const correctAnswerArray = correctAnswers.map(q => q.answer);

    if (answerArray.length !== quiz.length) {
      setRequire('Please attempt all the questions*');
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/submit",
        { answers: answerArray, correctAnswers: correctAnswerArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.score !== undefined) {
        setScore(res.data.score);
        setCompletion(res.data.completion || "Well done! You're making great progress.");
        setSubmitted(true);
      } else {
        console.error("No score received in response");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error.response || error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-3xl mx-auto quiz-container">
        <div className="container-two-quiz">
          <h1 className="text-2xl quiz-heading-main font-bold mb-4 text-center">🎯 The Quiz Platform</h1>
          <p>Practice makes you perfect!!.</p>
          <div className="third-contianer-quiz">
            {step === 1 && (
              <form onSubmit={handleGetTopics} className="flex flex-col gap-4">
                <label className="font-medium">Enter Grade:</label>
                <input
                  type="text"
                  className="p-2 border rounded input-element-primary-one"
                  placeholder="e.g., 6, 10, 12"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />

                <label className="font-medium">Enter Course/Subject:</label>
                <input
                  type="text"
                  className="p-2 border rounded input-element-primary-one"
                  placeholder="e.g., Math, Science, History"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {loading ? "Generating Topics..." : "Get Topics"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleGenerateQuiz} className="contianer-select-topic">
                <label className="topic-text">Select a Topic:</label>
                <select
                  className="p-5 select-topic border rounded"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="" className="option-element-quiz">
                    -- Choose a Topic --
                  </option>
                  {topicsData.map((t, i) => (
                    <option key={i} value={t} className="option-element-quiz">
                      {t}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="button-element bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  {loading ? "Generating Quiz..." : "Generate Quiz"}
                </button>
              </form>
            )}

            {step === 3 && quiz.length > 0 && !submitted && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">{topic} Quiz</h2>
                <form className="space-y-4 form-element">
                  {quiz.map((q, index) => (
                    <div key={index}>
                      <p className="font-medium question-quiz">
                        {index + 1}. {q.question}
                      </p>
                      {q.options.map((opt, i) => (
                        <div key={i} className="quiz-element-container">
                          <input
                            id={`${index}-${i}`}
                            type="radio"
                            className="radio-button-quiz"
                            name={`question-${index}`}
                            value={opt}
                            checked={answers[index] === opt}
                            onChange={() => handleAnswerChange(index, opt)}
                          />
                          <label htmlFor={`${index}-${i}`} className="label-element-quiz">
                            {opt}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 submit-button-element"
                  >
                    Submit Quiz
                  </button>
                  <p className="require">{require}</p>
                </form>
              </div>
            )}

            {submitted && (
              <>
                <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />
                <div className="mt-6 text-center submit-button-container">
                  <h2 className="text-2xl font-bold text-green-700">✅ Your Score: {score}</h2>
                  <p className="mt-2 text-lg font-medium text-purple-800 italic">
                    🎉 Great job completing the quiz! Keep up the awesome work!
                  </p>
                  <p className="mt-2 text-md italic text-gray-700">
                    🧠 {completion}
                  </p>
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 submit-button-element"
                    onClick={() => {
                      setQuiz([]);
                      setScore(null);
                      setCompletion("");
                      setTopic("");
                      setCourse("");
                      setGrade("");
                      setSubmitted(false);
                      setStep(1);
                    }}
                  >
                    Take Another Quiz
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
