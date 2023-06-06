import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [finalScore, setFinalScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const sessionToken = localStorage.getItem("sessionToken");
        console.log(sessionToken);

        if (!sessionToken) {
          // Redirect to login if session token is not found
          navigate("/");
          return;
        }

        const instance = axios.create({
          withCredentials: true,
        });

        const response = await instance.get(
          "http://localhost:5000/api/quiz/questions"
        );
        const questionData = response.data;

        setQuestion(questionData.Question);
        setAnswers(questionData.Answers);
      } catch (error) {
        console.error("Error fetching question:", error);
        navigate("/");
      }
    };

    fetchQuestion();
  }, [navigate]);

  const handleAnswerSelection = async (answer) => {
    
    try {
      const sessionToken = localStorage.getItem("sessionToken");

      if (!sessionToken) {
        // Redirect to login if session token is not found
        navigate("/");
        return;
      }

      const instance = axios.create({
        withCredentials: true,
      });

      const response = await instance.post(
        "http://localhost:5000/api/quiz/answer",
        {
          answer,
        }
      );

      // 
      

      const questionData = response.data;
      setQuestion(questionData.Question);
        setAnswers(questionData.Answers);

      if (!questionData) {
        // Update the question and answers
        const resp = await instance.get(
            "http://localhost:5000/api/quiz/final", 
            {
              
            }
          );
          const finalScore = resp.data
          setFinalScore(finalScore)
      } 
    } catch (error) {
      console.error("Error submitting answer:", error);
      navigate("/");
    }
  };

  return (
    <div>
      {!question ||<h2>Question: {question}</h2>}
      {answers !== undefined && answers !== null && (
      <ol>
        {answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswerSelection(answer)}>
              {answer}
            </button>
          </li>
        ))}
      </ol>
      )}
      
      {finalScore && <h3>Final Score: {finalScore}</h3>}
    </div>
  );
}

export default Quiz;
