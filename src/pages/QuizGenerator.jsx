import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle2, XCircle, RotateCcw, Home, ChevronRight, Award } from 'lucide-react';

const mockQuizData = [
  { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], answer: 1, explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions." },
  { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2, explanation: "Paris is the capital and most populous city of France." },
  { question: "Solve for x: 2x + 5 = 15", options: ["x = 10", "x = 5", "x = 20", "x = 0"], answer: 1, explanation: "Subtract 5 from both sides to get 2x = 10, then divide by 2 to get x = 5." },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: 2, explanation: "Mars is often called the Red Planet because of the iron oxide (rust) on its surface." },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: 1, explanation: "William Shakespeare is the author of 'Romeo and Juliet'." }
];

export default function QuizGenerator() {
  const [quizState, setQuizState] = useState('setup'); // setup, active, results
  const [subject, setSubject] = useState('Science');
  const [topic, setTopic] = useState('Biology Basics');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(3);
  
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer;
    if (quizState === 'active' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (quizState === 'active' && timeLeft === 0) {
      handleNext();
    }
    return () => clearTimeout(timer);
  }, [quizState, timeLeft]);

  const handleGenerateQuiz = () => {
    setQuestions(mockQuizData.slice(0, numQuestions)); // In real app, fetch from AI/Data
    setCurrentQIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setTimeLeft(30);
    setQuizState('active');
  };

  const handleNext = () => {
    const newAnswers = [...answers, { 
      qIndex: currentQIndex, 
      selected: selectedOption, 
      correct: selectedOption === questions[currentQIndex].answer 
    }];
    setAnswers(newAnswers);
    
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setQuizState('results');
    }
  };

  const renderSetup = () => (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-purple/20 text-accent-purple mb-4">
          <Brain size={32} />
        </div>
        <h1 className="text-3xl font-bold font-heading mb-2">AI Quiz Generator</h1>
        <p className="text-white/60">Test your knowledge with custom AI-generated quizzes</p>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
            <select 
              value={subject} onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-dark/50 border border-white/10 rounded-xl p-3 outline-none focus:border-accent-purple"
            >
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>History</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Topic</label>
            <input 
              type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-dark/50 border border-white/10 rounded-xl p-3 outline-none focus:border-accent-purple"
              placeholder="e.g., Cellular Biology"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Difficulty</label>
            <div className="grid grid-cols-3 gap-3">
              {['Easy', 'Medium', 'Hard'].map(level => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`py-2 rounded-lg border transition-all ${
                    difficulty === level 
                      ? 'bg-accent-purple/20 border-accent-purple text-white' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Number of Questions</label>
            <div className="grid grid-cols-3 gap-3">
              {[3, 5, 10].map(num => (
                <button
                  key={num}
                  onClick={() => setNumQuestions(num)}
                  className={`py-2 rounded-lg border transition-all ${
                    numQuestions === num 
                      ? 'bg-accent-purple/20 border-accent-purple text-white' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerateQuiz}
            className="w-full btn-primary py-4 text-lg font-bold shadow-[0_0_20px_rgba(114,9,183,0.3)] bg-gradient-to-r from-accent-purple to-purple-700 hover:from-purple-600 hover:to-purple-800"
          >
            Generate Quiz
          </button>
        </div>
      </div>
    </div>
  );

  const renderActive = () => {
    const q = questions[currentQIndex];
    const letters = ['A', 'B', 'C', 'D'];
    
    return (
      <div className="max-w-3xl mx-auto mt-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{subject}: {topic}</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
              Question {currentQIndex + 1} of {questions.length}
            </div>
            <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-accent-blue'}`}>
              <Clock size={20} />
              00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark/50 rounded-full h-1.5 mb-8">
          <div 
            className="bg-accent-purple h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQIndex) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-8 leading-relaxed">{q.question}</h3>
          
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${
                  selectedOption === idx 
                    ? 'border-accent-purple bg-accent-purple/10 shadow-[0_0_15px_rgba(114,9,183,0.2)]' 
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-4 transition-colors ${
                  selectedOption === idx ? 'bg-accent-purple text-white' : 'bg-dark text-white/70'
                }`}>
                  {letters[idx]}
                </div>
                <span className="text-lg">{opt}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn-primary px-8 py-3 flex items-center gap-2 disabled:opacity-50"
            >
              {currentQIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const correctCount = answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);
    let colorClass = 'text-green-400';
    let ringClass = 'stroke-green-400';
    if (score < 50) { colorClass = 'text-red-400'; ringClass = 'stroke-red-400'; }
    else if (score < 80) { colorClass = 'text-yellow-400'; ringClass = 'stroke-yellow-400'; }

    return (
      <div className="max-w-4xl mx-auto mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading mb-2">Quiz Completed!</h2>
          <p className="text-white/60">Here is how you performed on {topic}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Score Circle */}
          <div className="glass-card p-6 flex flex-col items-center justify-center md:col-span-1">
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  className={ringClass} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - score/100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${colorClass}`}>{score}%</span>
              </div>
            </div>
            <p className="text-lg font-medium">Your Score</p>
          </div>

          {/* Stats */}
          <div className="glass-card p-6 md:col-span-2 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark/50 p-4 rounded-xl border border-white/5 text-center">
                <CheckCircle2 size={32} className="text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{correctCount}</p>
                <p className="text-sm text-white/50">Correct</p>
              </div>
              <div className="bg-dark/50 p-4 rounded-xl border border-white/5 text-center">
                <XCircle size={32} className="text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold">{questions.length - correctCount}</p>
                <p className="text-sm text-white/50">Incorrect</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setQuizState('setup')} className="flex-1 btn-primary py-3 bg-white/10 hover:bg-white/20 text-white flex justify-center items-center gap-2">
                <RotateCcw size={18} /> Take Another
              </button>
              <button className="flex-1 btn-primary py-3 flex justify-center items-center gap-2">
                <Home size={18} /> Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Award className="text-accent-blue" /> Review Answers
        </h3>
        <div className="space-y-4 mb-12">
          {questions.map((q, idx) => {
            const userAns = answers[idx];
            const isCorrect = userAns?.correct;
            
            return (
              <div key={idx} className={`glass-card p-6 border-l-4 ${isCorrect ? 'border-l-green-400' : 'border-l-red-400'}`}>
                <h4 className="font-bold text-lg mb-4">{idx + 1}. {q.question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-dark/50 p-3 rounded-lg">
                    <span className="text-xs text-white/50 block mb-1">Your Answer</span>
                    <div className={`font-medium flex items-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {userAns?.selected !== null ? q.options[userAns.selected] : 'Time Expired'}
                      {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    </div>
                  </div>
                  {!isCorrect && (
                    <div className="bg-dark/50 p-3 rounded-lg border border-green-500/30">
                      <span className="text-xs text-white/50 block mb-1">Correct Answer</span>
                      <div className="font-medium text-green-400 flex items-center gap-2">
                        {q.options[q.answer]}
                        <CheckCircle2 size={16} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-accent-blue/10 p-4 rounded-xl border border-accent-blue/20">
                  <span className="text-xs font-bold text-accent-blue uppercase tracking-wider block mb-1">Explanation</span>
                  <p className="text-sm text-white/90">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 pt-24 min-h-screen">
      {quizState === 'setup' && renderSetup()}
      {quizState === 'active' && renderActive()}
      {quizState === 'results' && renderResults()}
    </div>
  );
}
