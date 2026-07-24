import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, MessageSquare, BookOpen, Globe, Code, History as HistoryIcon, Calculator, TestTube, Languages } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { languages } from '../data/languages';
import { getAIResponse, simulateTypingDelay } from '../services/aiService';

const subjects = [
  { id: 'math', name: 'Mathematics', icon: Calculator, color: 'text-blue-400' },
  { id: 'science', name: 'Science', icon: TestTube, color: 'text-green-400' },
  { id: 'english', name: 'English', icon: BookOpen, color: 'text-purple-400' },
  { id: 'history', name: 'History', icon: HistoryIcon, color: 'text-yellow-400' },
  { id: 'geography', name: 'Geography', icon: Globe, color: 'text-emerald-400' },
  { id: 'cs', name: 'Computer Science', icon: Code, color: 'text-pink-400' }
];

export default function AITutor() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages ? languages[0]?.code : 'en');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial welcome message
    const welcomeText = `Hello${user ? ' ' + user.name : ''}! I am your AI Tutor for ${selectedSubject.name}. How can I help you today?`;
    setMessages([{ id: 1, text: welcomeText, sender: 'ai' }]);
  }, [selectedSubject, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newUserMsg = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    await simulateTypingDelay();
    try {
      const response = await getAIResponse(newUserMsg.text, selectedSubject.id, selectedLanguage);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'ai' }]);
    } catch (error) {
       setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting right now.", sender: 'ai' }]);
    }
    setIsTyping(false);
  };

  const renderMessageContent = (text) => {
    // Simple markdown rendering for bold and bullets
    const parts = text.split('\n').map((line, i) => {
      let formattedLine = line;
      // Bold
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Bullets
      if (formattedLine.trim().startsWith('- ')) {
        formattedLine = `<li>${formattedLine.substring(2)}</li>`;
        return <ul key={i} className="list-disc pl-5 mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
    return parts;
  };

  return (
    <div className="chat-container h-[calc(100vh-80px)] flex flex-col md:flex-row gap-4 p-4 md:p-6 mt-16">
      {/* Left Panel */}
      <div className="glass-card-static w-full md:w-[280px] p-4 flex flex-col h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="text-accent-blue" />
          Subjects
        </h2>
        <div className="flex flex-col gap-2">
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`p-3 rounded-xl flex items-center gap-3 transition-all ${
                selectedSubject.id === subject.id 
                  ? 'bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(67,97,238,0.3)]' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <subject.icon className={subject.color} size={20} />
              <span className="font-medium">{subject.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className="glass-card-static flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/5 ${selectedSubject.color}`}>
              <selectedSubject.icon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{selectedSubject.name} Tutor</h3>
              <p className="text-xs text-white/50">AI is ready to help</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Languages size={18} className="text-white/70" />
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-dark/50 border border-white/10 rounded-lg p-1 text-sm outline-none focus:border-accent-blue"
            >
              {languages?.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              )) || <option value="en">English</option>}
            </select>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`chat-message-avatar w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                msg.sender === 'user' ? 'bg-accent-purple/20 border border-accent-purple/30' : 'bg-accent-blue/20 border border-accent-blue/30'
              }`}>
                {msg.sender === 'user' ? (user?.initials || 'U') : '🤖'}
              </div>
              <div className={`chat-message-bubble p-4 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-accent-purple/20 border border-accent-purple/20 rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 rounded-tl-none'
              }`}>
                {renderMessageContent(msg.text)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message flex gap-3 max-w-[80%]">
              <div className="chat-message-avatar w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 bg-accent-blue/20 border border-accent-blue/30">
                🤖
              </div>
              <div className="chat-message-bubble p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input-container p-4 border-t border-white/10 bg-black/20">
          <form onSubmit={handleSendMessage} className="flex gap-2 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your question here..."
              className="flex-1 bg-dark/50 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-accent-blue resize-none h-[52px]"
              rows="1"
            />
            <button 
              type="button"
              className="p-3 text-white/70 hover:text-white bg-dark/50 hover:bg-white/5 border border-white/10 rounded-xl transition-colors"
              title="Voice input"
            >
              <Mic size={20} />
            </button>
            <button 
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-accent-blue hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-accent-blue text-white rounded-xl transition-colors shadow-[0_0_15px_rgba(67,97,238,0.3)]"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
