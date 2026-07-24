import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Play, Pause, Square, Headphones, FileText, Settings, Radio } from 'lucide-react';

export default function VoiceLearning() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const [textToRead, setTextToRead] = useState('Welcome to RuralVerse AI. This is our voice learning system, designed to help you practice pronunciation and listening skills.');
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  useEffect(() => {
    // Setup STT
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Setup TTS Voices
    const populateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      synth.cancel();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
      } else {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        if (selectedVoice) {
          utterance.voice = voices.find(v => v.name === selectedVoice);
        }
        utterance.rate = rate;
        utterance.volume = volume;
        utterance.onend = () => setIsPlaying(false);
        synth.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    synth.cancel();
    setIsPlaying(false);
  };

  const lessons = [
    { id: 1, title: 'English Pronunciation Basics', duration: '5:30', subject: 'English', color: 'bg-purple-500/20 text-purple-400' },
    { id: 2, title: 'Science Terms Glossary', duration: '8:45', subject: 'Science', color: 'bg-green-500/20 text-green-400' },
    { id: 3, title: 'Historical Speeches', duration: '12:00', subject: 'History', color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 4, title: 'Math Word Problems Aloud', duration: '10:15', subject: 'Mathematics', color: 'bg-blue-500/20 text-blue-400' },
    { id: 5, title: 'Geography: World Capitals', duration: '6:20', subject: 'Geography', color: 'bg-emerald-500/20 text-emerald-400' },
    { id: 6, title: 'Coding Terminology', duration: '7:50', subject: 'Computer Science', color: 'bg-pink-500/20 text-pink-400' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 pt-24 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-accent-coral/20 text-accent-coral">
          <Headphones size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-heading">Voice Learning System</h1>
          <p className="text-white/60">Practice speaking and listening with AI assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* STT Card */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Mic size={20} className="text-accent-emerald" />
            <h2 className="text-xl font-bold">Speech to Text</h2>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <button 
              onClick={toggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isListening 
                  ? 'bg-red-500 animate-pulse shadow-red-500/50' 
                  : 'bg-gradient-to-br from-accent-emerald to-emerald-700 hover:scale-105 shadow-emerald-500/30'
              }`}
            >
              {isListening ? <MicOff size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
            </button>
            
            <div className="h-12 mt-4 flex items-center justify-center">
              {isListening && (
                <div className="voice-visualizer flex items-center gap-1 h-8">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-accent-emerald rounded-full animate-bounce"
                      style={{ 
                        height: `${Math.max(20, Math.random() * 100)}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.5s'
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            
            <p className={`mt-2 font-medium ${isListening ? 'text-accent-emerald' : 'text-white/50'}`}>
              {isListening ? 'Listening...' : 'Click the microphone to start speaking'}
            </p>
          </div>

          <div className="bg-dark/50 border border-white/10 rounded-xl p-4 min-h-[120px]">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
              <FileText size={14} /> Transcript
            </h3>
            <p className="text-white/90">
              {transcript || <span className="text-white/30 italic">Your spoken words will appear here...</span>}
            </p>
          </div>
        </div>

        {/* TTS Card */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Volume2 size={20} className="text-accent-blue" />
            <h2 className="text-xl font-bold">Text to Speech</h2>
          </div>
          
          <textarea
            value={textToRead}
            onChange={(e) => setTextToRead(e.target.value)}
            className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 min-h-[120px] outline-none focus:border-accent-blue resize-none mb-4"
            placeholder="Enter text for the AI to read aloud..."
          />
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs text-white/60 mb-1 block">Voice</label>
              <select 
                value={selectedVoice || ''}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-dark/80 border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-accent-blue"
              >
                {voices.map(voice => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="text-xs text-white/60 mb-1 flex justify-between">
                  <span>Speed</span> <span>{rate}x</span>
                </label>
                <input 
                  type="range" min="0.5" max="2" step="0.1" 
                  value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-accent-blue"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-white/60 mb-1 flex justify-between">
                  <span>Volume</span> <span>{Math.round(volume * 100)}%</span>
                </label>
                <input 
                  type="range" min="0" max="1" step="0.1" 
                  value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-accent-blue"
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-auto">
            <button 
              onClick={handlePlayPause}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pause' : 'Read Aloud'}
            </button>
            <button 
              onClick={handleStop}
              disabled={!isPlaying}
              className="p-3 bg-dark/50 hover:bg-white/10 border border-white/10 rounded-xl disabled:opacity-50 transition-colors"
            >
              <Square size={18} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Audio Lessons */}
      <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
        <Radio className="text-accent-purple" />
        Audio Lessons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map(lesson => (
          <div key={lesson.id} className="glass-card p-4 hover:border-white/20 transition-all flex items-center gap-4 group cursor-pointer">
            <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent-blue group-hover:border-accent-blue transition-colors">
              <Play size={20} className="ml-1 text-white" />
            </button>
            <div className="flex-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lesson.color} inline-block mb-1`}>
                {lesson.subject}
              </span>
              <h3 className="font-bold text-white/90 group-hover:text-white transition-colors">{lesson.title}</h3>
              <p className="text-xs text-white/50">{lesson.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
