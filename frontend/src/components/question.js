import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const sessionToken = localStorage.getItem("sessionToken");
console.log(sessionToken)
        if (!sessionToken) {
          // Redirect to login if session token is not found
          navigate("/");
          return;
        }

        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        });

        const response = await axiosInstance.get("http://localhost:5000/api/quiz/questions");
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

  return (
    <div>
      <h2>Question: {question}</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;
