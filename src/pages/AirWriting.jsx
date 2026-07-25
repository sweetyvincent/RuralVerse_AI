import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { PenTool, Eraser, Pause, Play } from 'lucide-react';

const COLORS = [
  { name: 'Blue', value: '#4361ee' },
  { name: 'Purple', value: '#7209b7' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Coral', value: '#f72585' },
  { name: 'Amber', value: '#f59e0b' },
];

export default function AirWriting() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0].value);
  const [isDrawingPaused, setIsDrawingPaused] = useState(false);
  
  const handLandmarkerRef = useRef(null);
  const requestRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const pathsRef = useRef([]); 
  const currentPathRef = useRef(null);
  const lastPointRef = useRef(null);
  const isWritingRef = useRef(false);

  useEffect(() => {
    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        handLandmarkerRef.current = handLandmarker;
        setIsModelLoaded(true);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener("loadeddata", predictWebcam);
          }
        }
      } catch(err) {
        console.error("Camera access denied or model failed to load", err);
      }
    }
    init();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (handLandmarkerRef.current) handLandmarkerRef.current.close();
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    isWritingRef.current = !isDrawingPaused;
  }, [isDrawingPaused]);

  const predictWebcam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !handLandmarkerRef.current) return;

    if (canvas.width !== video.videoWidth) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    let startTimeMs = performance.now();
    if (lastVideoTimeRef.current !== video.currentTime) {
      lastVideoTimeRef.current = video.currentTime;
      const results = handLandmarkerRef.current.detectForVideo(video, startTimeMs);
      
      processHandResults(results, canvas.width, canvas.height);
    }
    
    drawPaths(canvas);
    requestRef.current = requestAnimationFrame(predictWebcam);
  };

  const getDistance = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

  const processHandResults = (results, width, height) => {
    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];
      
      const indexTip = landmarks[8];
      
      // Mirror the x coordinate
      const x = (1 - indexTip.x) * width;
      const y = indexTip.y * height;
      
      const indexIsExtended = getDistance(landmarks[8], landmarks[0]) > getDistance(landmarks[6], landmarks[0]);
      const middleIsExtended = getDistance(landmarks[12], landmarks[0]) > getDistance(landmarks[10], landmarks[0]);
      
      const isPointing = indexIsExtended && !middleIsExtended;
      const isPaused = isDrawingPaused;

      if (isPointing && !isPaused) {
        if (!currentPathRef.current) {
          currentPathRef.current = { color: activeColor, points: [] };
          pathsRef.current.push(currentPathRef.current);
        }
        currentPathRef.current.points.push({ x, y });
        lastPointRef.current = { x, y };
      } else {
        currentPathRef.current = null;
        lastPointRef.current = { x, y };
      }
    } else {
      currentPathRef.current = null;
      lastPointRef.current = null;
    }
  };

  const drawPaths = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    
    pathsRef.current.forEach(path => {
      if (path.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = path.color;
      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        const xc = (path.points[i].x + path.points[i - 1].x) / 2;
        const yc = (path.points[i].y + path.points[i - 1].y) / 2;
        ctx.quadraticCurveTo(path.points[i - 1].x, path.points[i - 1].y, xc, yc);
      }
      ctx.lineTo(path.points[path.points.length - 1].x, path.points[path.points.length - 1].y);
      ctx.stroke();
    });

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.arc(lastPointRef.current.x, lastPointRef.current.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = currentPathRef.current ? activeColor : 'rgba(255,255,255,0.5)';
      ctx.fill();
      if (!currentPathRef.current) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }
    }
  };

  const clearCanvas = () => {
    pathsRef.current = [];
    currentPathRef.current = null;
  };

  useEffect(() => {
    if (currentPathRef.current) {
      currentPathRef.current = { color: activeColor, points: [lastPointRef.current].filter(Boolean) };
      pathsRef.current.push(currentPathRef.current);
    }
  }, [activeColor]);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-black overflow-hidden flex justify-center items-center">
      {!isModelLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/80 text-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium">Loading AI Hand Tracking Model...</p>
          <p className="text-sm text-gray-400 mt-2">Please allow camera access.</p>
        </div>
      )}
      
      <video 
        ref={videoRef}
        autoPlay 
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full object-cover z-10 pointer-events-none"
      />

      <div className="absolute top-6 left-6 z-20 glass-card p-4 rounded-xl border border-white/10 flex items-center gap-3 bg-black/50 backdrop-blur-md text-white">
        <PenTool size={24} className="text-blue-500" />
        <span className="font-bold text-lg">Air Writing Camera</span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-6 bg-black/60 backdrop-blur-lg">
        <div className="flex gap-2 items-center pr-6 border-r border-white/10">
          {COLORS.map(c => (
            <button
              key={c.name}
              onClick={() => setActiveColor(c.value)}
              className={`w-8 h-8 rounded-full transition-transform ${activeColor === c.value ? 'scale-125 border-2 border-white' : 'hover:scale-110'}`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setIsDrawingPaused(!isDrawingPaused)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${isDrawingPaused ? 'bg-amber-500/20 text-amber-500' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isDrawingPaused ? <Play size={18} /> : <Pause size={18} />}
            {isDrawingPaused ? 'Resume' : 'Pause'}
          </button>
          
          <button 
            onClick={clearCanvas}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-coral-500/10 text-coral-500 hover:bg-coral-500/20 transition-colors font-medium"
          >
            <Eraser size={18} />
            Clear Board
          </button>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20 glass-card p-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md text-white text-sm max-w-[250px]">
        <h4 className="font-bold mb-2 text-emerald-400">How to use:</h4>
        <ul className="space-y-2 text-gray-300">
          <li>☝️ <b>Point index finger</b> to draw.</li>
          <li>✋ <b>Open palm</b> to hover.</li>
          <li>🎨 Change colors below.</li>
        </ul>
      </div>
    </div>
  );
}
