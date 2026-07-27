import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, MessageSquare, BookOpen, Globe, Code, History as HistoryIcon, Calculator, TestTube, Languages, Sparkles, Key, Settings, X, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { languages } from '../data/languages';
import { getAIResponse, simulateTypingDelay, getGeminiApiKey, setGeminiApiKey } from '../services/aiService';

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

  // Gemini API Key state & modal
  const [geminiKey, setGeminiKey] = useState(getGeminiApiKey());
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState(getGeminiApiKey());
  const [saveSuccess, setSaveSuccess] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const isGeminiActive = Boolean(geminiKey);
    const welcomeText = `Hello${user ? ' ' + user.name : ''}! I am your AI Tutor for **${selectedSubject.name}**. 🎓\n\n${isGeminiActive ? '✨ **Google Gemini AI 1.5 Flash Enabled**: Ask me any question in detail!' : '⚡ **Smart Offline Engine Active**: Ask me about formulas, concepts, practice problems, or code!'}\n\nType your question below to begin learning!`;
    setMessages([{ id: 1, text: welcomeText, sender: 'ai' }]);
  }, [selectedSubject, user, geminiKey]);

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

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setGeminiApiKey(keyInput);
    setGeminiKey(keyInput.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowKeyModal(false);
    }, 1200);
  };

  const renderMessageContent = (text) => {
    const parts = text.split('\n').map((line, i) => {
      let formattedLine = line;
      formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedLine = formattedLine.replace(/`(.*?)`/g, '<code style="background:rgba(99,102,241,0.15);padding:2px 6px;border-radius:4px;font-size:0.85em">$1</code>');
      if (formattedLine.trim().startsWith('- ')) {
        formattedLine = `<li>${formattedLine.substring(2)}</li>`;
        return <ul key={i} className="list-disc pl-5 mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      if (formattedLine.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
    return parts;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: '#030308',
      color: 'white',
      position: 'relative',
    }}>
      {/* Left Panel — Subject Selector */}
      <div style={{
        width: '260px',
        minWidth: '260px',
        background: 'rgba(255,255,255,0.03)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
        <h2 style={{
          fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontFamily: "'Outfit', sans-serif",
        }}>
          <MessageSquare size={20} style={{ color: '#818cf8' }} />
          Subjects
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: selectedSubject.id === subject.id ? '1px solid rgba(99,102,241,0.5)' : '1px solid transparent',
                background: selectedSubject.id === subject.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: selectedSubject.id === subject.id ? '#a5b4fc' : '#94a3b8',
                fontWeight: selectedSubject.id === subject.id ? '600' : '500',
                fontSize: '0.9rem',
                boxShadow: selectedSubject.id === subject.id ? '0 0 20px rgba(99,102,241,0.2)' : 'none',
              }}
            >
              <subject.icon size={20} />
              {subject.name}
            </button>
          ))}
        </div>

        {/* Gemini API Status Box in Sidebar */}
        <div style={{
          marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <button
            onClick={() => setShowKeyModal(true)}
            style={{
              width: '100%', padding: '0.75rem', borderRadius: '0.75rem',
              background: geminiKey ? 'rgba(168,85,247,0.12)' : 'rgba(255,255,255,0.04)',
              border: geminiKey ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.1)',
              color: geminiKey ? '#c084fc' : '#94a3b8',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <Sparkles size={16} style={{ color: geminiKey ? '#c084fc' : '#94a3b8' }} />
            <span>{geminiKey ? 'Gemini 1.5 Flash' : 'Setup Gemini API'}</span>
            <Settings size={14} style={{ marginLeft: 'auto', opacity: 0.6 }} />
          </button>
        </div>
      </div>

      {/* Right Panel — Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '0.75rem',
              background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#818cf8',
            }}>
              <selectedSubject.icon size={22} />
            </div>
            <div>
              <h3 style={{ fontWeight: '700', fontSize: '1.1rem', fontFamily: "'Outfit', sans-serif" }}>
                {selectedSubject.name} Tutor
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#64748b' }}>🟢 AI Ready</span>
                {geminiKey ? (
                  <span style={{
                    color: '#c084fc', background: 'rgba(168,85,247,0.15)',
                    padding: '1px 8px', borderRadius: '1rem', border: '1px solid rgba(168,85,247,0.3)',
                    fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '3px',
                  }}>
                    <Sparkles size={12} /> Gemini Active
                  </span>
                ) : (
                  <span style={{
                    color: '#818cf8', background: 'rgba(99,102,241,0.15)',
                    padding: '1px 8px', borderRadius: '1rem', border: '1px solid rgba(99,102,241,0.3)',
                    fontWeight: '600',
                  }}>
                    Offline Mode
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setShowKeyModal(true)}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '0.4rem 0.8rem', borderRadius: '0.6rem', color: '#e2e8f0',
                fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}
            >
              <Key size={14} style={{ color: geminiKey ? '#c084fc' : '#94a3b8' }} />
              {geminiKey ? 'Gemini Key Saved' : 'Add Gemini Key'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Languages size={16} style={{ color: '#64748b' }} />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  outline: 'none',
                }}
              >
                {languages?.map(lang => (
                  <option key={lang.code} value={lang.code} style={{ background: '#0f0f2e' }}>{lang.name}</option>
                )) || <option value="en" style={{ background: '#0f0f2e' }}>English</option>}
              </select>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: '80%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
              animation: 'fadeSlideIn 0.3s ease',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                  : 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white', fontWeight: '600',
                boxShadow: msg.sender === 'user'
                  ? '0 4px 15px rgba(16,185,129,0.3)'
                  : '0 4px 15px rgba(99,102,241,0.3)',
              }}>
                {msg.sender === 'user' ? (user?.initials || 'U') : '🤖'}
              </div>
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '1rem',
                fontSize: '0.9rem',
                lineHeight: '1.65',
                ...(msg.sender === 'user' ? {
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  color: 'white',
                  borderBottomRightRadius: '4px',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.25)',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#e2e8f0',
                  borderBottomLeftRadius: '4px',
                }),
              }}>
                {renderMessageContent(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{
              display: 'flex', gap: '0.75rem', maxWidth: '80%', alignSelf: 'flex-start',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0, color: 'white',
              }}>
                🤖
              </div>
              <div style={{
                padding: '1rem 1.25rem', borderRadius: '1rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderBottomLeftRadius: '4px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', animation: 'typingBounce 1.4s infinite', animationDelay: '0ms' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', animation: 'typingBounce 1.4s infinite', animationDelay: '0.2s' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8', animation: 'typingBounce 1.4s infinite', animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(3,3,8,0.9)',
          backdropFilter: 'blur(24px)',
          flexShrink: 0,
        }}>
          <form onSubmit={handleSendMessage} style={{
            display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
          }}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Ask anything about ${selectedSubject.name}... ${geminiKey ? '(Gemini AI Ready)' : ''}`}
              rows="1"
              style={{
                flex: 1,
                padding: '0.9rem 1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '1rem',
                color: 'white',
                fontSize: '0.95rem',
                resize: 'none',
                outline: 'none',
                fontFamily: "'Inter', sans-serif",
                minHeight: '50px',
                maxHeight: '120px',
              }}
            />
            <button
              type="button"
              title="Voice input"
              style={{
                width: '50px', height: '50px', borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Mic size={20} />
            </button>
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              style={{
                width: '50px', height: '50px', borderRadius: '50%',
                background: (!inputText.trim() || isTyping) ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white', cursor: (!inputText.trim() || isTyping) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none',
                boxShadow: (!inputText.trim() || isTyping) ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Gemini Settings Modal */}
      {showKeyModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}>
          <div style={{
            background: '#0a0a20', border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: '1.2rem', padding: '1.75rem', width: '100%', maxWidth: '480px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)', color: 'white',
            position: 'relative',
          }}>
            <button
              onClick={() => setShowKeyModal(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
                border: 'none', color: '#94a3b8', cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '0.75rem',
                background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc',
              }}>
                <Sparkles size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: "'Outfit', sans-serif" }}>
                  Google Gemini Integration
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Enable real-time AI responses using Gemini 1.5 Flash
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveApiKey} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  style={{
                    width: '100%', padding: '0.8rem 1rem', borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white', fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
                  Get your free API key at <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ color: '#c084fc', textDecoration: 'underline' }}>aistudio.google.com</a>. If no key is set, the offline response engine will be used.
                </p>
              </div>

              {saveSuccess && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981',
                  background: 'rgba(16,185,129,0.15)', padding: '0.6rem 1rem', borderRadius: '0.5rem',
                  fontSize: '0.85rem', fontWeight: '500',
                }}>
                  <CheckCircle2 size={16} /> API Key Saved Successfully!
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1, padding: '0.8rem', borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    color: 'white', border: 'none', fontWeight: '600', fontSize: '0.9rem',
                    cursor: 'pointer', boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
                  }}
                >
                  Save API Key
                </button>
                {geminiKey && (
                  <button
                    type="button"
                    onClick={() => { setKeyInput(''); setGeminiApiKey(''); setGeminiKey(''); }}
                    style={{
                      padding: '0.8rem 1rem', borderRadius: '0.75rem',
                      background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)',
                      color: '#ec4899', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                    }}
                  >
                    Remove Key
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
