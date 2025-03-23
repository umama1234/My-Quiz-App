"use client";
import React, { useState, useEffect } from "react";
import data from "../../public/data.json";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Card() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [showRestart, setShowRestart] = useState(false);

  const questions = data.questions;
  const currentQuestion = questions[questionIndex];

  // Timer decreases every second
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handle answer selection
  const handleOptionClick = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Go to next question
  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setTimer(30);
    } else {
      setShowRestart(true);
    }
  };

  // Restart Quiz
  const handleRestart = () => {
    setQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setTimer(30);
    setShowRestart(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl rounded-2xl text-white">
      {/* Header: Title, Timer, Question Counter, Score */}
      <div className="flex justify-between items-center mb-6 text-lg font-semibold">
        <h2 className="text-2xl font-bold">Guess the Country</h2>
        <span className="bg-white text-black px-3 py-1 rounded-lg">Time: {timer}s</span>
        <span className="bg-white text-black px-3 py-1 rounded-lg">Q: {questionIndex + 1}/{questions.length}</span>
        <span className="bg-white text-black px-3 py-1 rounded-lg">Score: {score}</span>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold mb-4 text-center">{currentQuestion.question}</h3>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          let borderColor = "border-gray-300";
          let icon = null;

          if (selectedOption) {
            if (option === selectedOption && option === currentQuestion.answer) {
              borderColor = "border-green-500";
              icon = <FaCheckCircle className="text-green-500 absolute top-[-10px] right-[-10px] text-xl" />;
            } else if (option === selectedOption) {
              borderColor = "border-red-500";
              icon = <FaTimesCircle className="text-red-500 absolute top-[-10px] right-[-10px] text-xl" />;
            } else if (option === currentQuestion.answer) {
              borderColor = "border-green-500";
            }
          }

          return (
            <div key={index} className="relative">
              {icon}
              <button
                className={`w-full py-3 px-4 border-4 rounded-lg text-lg font-medium flex justify-center items-center ${borderColor} transition-all duration-300 ${
                  selectedOption ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={!!selectedOption}
              >
                {option}
              </button>
            </div>
          );
        })}
      </div>

      {/* Next / Restart Button */}
      {showRestart ? (
        <button
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700"
          onClick={handleRestart}
        >
          Restart Quiz
        </button>
      ) : (
        selectedOption && questionIndex < questions.length - 1 && (
          <button
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            onClick={handleNext}
          >
            Next →
          </button>
        )
      )}
    </div>
  );
}

export default Card;
