import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  Compass, 
  Mountain, 
  Waves, 
  Globe, 
  Trophy, 
  RotateCcw, 
  Volume2, 
  ChevronRight,
  ShieldAlert,
  Flame,
  Ghost,
  Sword
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Level {
  id: number;
  name: string;
  location: string;
  sentence: string[];
  translation: string;
  icon: React.ReactNode;
  theme: string; // colors or class names
}

// --- Data ---

const LEVELS: Level[] = [
  {
    id: 1,
    name: "La Plaza de Sol",
    location: "Madrid",
    sentence: ["Hoy", "hace", "sol"],
    translation: "Այսօր արևոտ է:",
    icon: <Globe className="text-yellow-500" />,
    theme: "from-amber-400 to-orange-600"
  },
  {
    id: 2,
    name: "La Cueva Antigua",
    location: "Cantabria",
    sentence: ["Es", "muy", "oscuro"],
    translation: "Շատ մութ է:",
    icon: <Mountain className="text-stone-500" />,
    theme: "from-stone-600 to-stone-900"
  },
  {
    id: 3,
    name: "Playa Azul",
    location: "Costa Brava",
    sentence: ["El", "mar", "azul"],
    translation: "Կապույտ ծով:",
    icon: <Waves className="text-blue-500" />,
    theme: "from-blue-400 to-cyan-600"
  },
  {
    id: 4,
    name: "El Castillo",
    location: "Segovia",
    sentence: ["Es", "muy", "alto"],
    translation: "Այն շատ բարձր է:",
    icon: <ShieldAlert className="text-amber-600" />,
    theme: "from-amber-600 to-red-800"
  },
  {
    id: 5,
    name: "La Fiesta",
    location: "Sevilla",
    sentence: ["Baila", "con", "música"],
    translation: "Պարի՛ր երաժշտության տակ:",
    icon: <Flame className="text-red-500" />,
    theme: "from-red-500 to-orange-700"
  },
  {
    id: 6,
    name: "El Parque",
    location: "Barcelona",
    sentence: ["Camina", "por", "aquí"],
    translation: "Քայլի՛ր այստեղով:",
    icon: <MapIcon className="text-emerald-500" />,
    theme: "from-emerald-400 to-teal-600"
  },
  {
    id: 7,
    name: "El Museo",
    location: "Bilbao",
    sentence: ["Mira", "el", "arte"],
    translation: "Նայիր արվեստին:",
    icon: <MapIcon className="text-indigo-500" />,
    theme: "from-indigo-400 to-blue-700"
  },
  {
    id: 8,
    name: "La Montaña",
    location: "Pirineos",
    sentence: ["Hace", "mucho", "frío"],
    translation: "Շատ ցուրտ է:",
    icon: <Mountain className="text-white" />,
    theme: "from-sky-300 to-blue-500"
  },
  {
    id: 9,
    name: "El Mercado",
    location: "Valencia",
    sentence: ["Compra", "fruta", "fresca"],
    translation: "Գնիր թարմ միրգ:",
    icon: <Globe className="text-orange-500" />,
    theme: "from-orange-400 to-red-500"
  },
  {
    id: 10,
    name: "La Calle",
    location: "Toledo",
    sentence: ["La", "calle", "estrecha"],
    translation: "Նեղ փողոց:",
    icon: <MapIcon className="text-stone-400" />,
    theme: "from-stone-500 to-stone-700"
  },
  {
    id: 11,
    name: "El Río",
    location: "Zaragoza",
    sentence: ["El", "agua", "corre"],
    translation: "Ջուրը հոսում է:",
    icon: <Waves className="text-cyan-400" />,
    theme: "from-cyan-400 to-blue-600"
  },
  {
    id: 12,
    name: "La Torre",
    location: "Salamanca",
    sentence: ["Escucha", "la", "campana"],
    translation: "Լսիր զանգը:",
    icon: <ShieldAlert className="text-amber-500" />,
    theme: "from-yellow-500 to-amber-700"
  },
  {
    id: 13,
    name: "El Bosque",
    location: "Galicia",
    sentence: ["Árboles", "muy", "verdes"],
    translation: "Շատ կանաչ ծառեր:",
    icon: <MapIcon className="text-green-600" />,
    theme: "from-green-500 to-emerald-800"
  },
  {
    id: 14,
    name: "La Noche",
    location: "Ibiza",
    sentence: ["Baila", "toda", "noche"],
    translation: "Պարիր ողջ գիշեր:",
    icon: <Flame className="text-purple-500" />,
    theme: "from-purple-600 to-indigo-900"
  },
  {
    id: 15,
    name: "El Desayuno",
    location: "Málaga",
    sentence: ["Toma", "un", "café"],
    translation: "Խմիր սուրճ:",
    icon: <Globe className="text-brown-500" />,
    theme: "from-stone-400 to-stone-600"
  },
  {
    id: 16,
    name: "La Amistad",
    location: "Granada",
    sentence: ["Eres", "mi", "amigo"],
    translation: "Դու իմ ընկերն ես:",
    icon: <Globe className="text-pink-400" />,
    theme: "from-pink-400 to-rose-600"
  },
  {
    id: 17,
    name: "La Comida",
    location: "San Sebastián",
    sentence: ["La", "cena", "rica"],
    translation: "Համեղ ընթրիք:",
    icon: <Flame className="text-orange-600" />,
    theme: "from-orange-500 to-red-700"
  },
  {
    id: 18,
    name: "El Viaje",
    location: "Córdoba",
    sentence: ["Viaja", "en", "tren"],
    translation: "Ճանապարհորդիր գնացքով:",
    icon: <Compass className="text-blue-400" />,
    theme: "from-blue-500 to-indigo-700"
  },
  {
    id: 19,
    name: "La Flor",
    location: "Murcia",
    sentence: ["Una", "flor", "roja"],
    translation: "Մի կարմիր ծաղիկ:",
    icon: <MapIcon className="text-rose-500" />,
    theme: "from-rose-400 to-red-600"
  },
  {
    id: 20,
    name: "El Silencio",
    location: "Monasterio",
    sentence: ["Haz", "mucho", "silencio"],
    translation: "Շատ լուռ մնա:",
    icon: <Ghost className="text-blue-100" />,
    theme: "from-slate-600 to-slate-900"
  },
  {
    id: 21,
    name: "El Sol",
    location: "Alicante",
    sentence: ["El", "sol", "quema"],
    translation: "Արևը այրում է:",
    icon: <Globe className="text-yellow-400" />,
    theme: "from-yellow-400 to-orange-500"
  },
  {
    id: 22,
    name: "La Puerta",
    location: "Ávila",
    sentence: ["Abre", "la", "puerta"],
    translation: "Բացիր դուռը:",
    icon: <ShieldAlert className="text-stone-300" />,
    theme: "from-stone-400 to-stone-600"
  },
  {
    id: 23,
    name: "El Gato",
    location: "Madrid Center",
    sentence: ["Un", "gato", "negro"],
    translation: "Մի սև կատու:",
    icon: <Ghost className="text-stone-900" />,
    theme: "from-stone-700 to-black"
  },
  {
    id: 24,
    name: "El Libro",
    location: "Biblioteca",
    sentence: ["Lee", "el", "libro"],
    translation: "Կարդա գիրքը:",
    icon: <Globe className="text-blue-700" />,
    theme: "from-blue-600 to-blue-900"
  },
  {
    id: 25,
    name: "La Risa",
    location: "Teatro",
    sentence: ["Ríe", "muy", "fuerte"],
    translation: "Շատ ուժեղ ծիծաղիր:",
    icon: <Flame className="text-pink-500" />,
    theme: "from-pink-500 to-purple-600"
  },
  {
    id: 26,
    name: "El Viento",
    location: "Tarifa",
    sentence: ["Sopla", "el", "viento"],
    translation: "Քամին փչում է:",
    icon: <Waves className="text-sky-200" />,
    theme: "from-sky-200 to-sky-500"
  },
  {
    id: 27,
    name: "La Foto",
    location: "Mirador",
    sentence: ["Saca", "una", "foto"],
    translation: "Լուսանկարիր:",
    icon: <Compass className="text-stone-500" />,
    theme: "from-stone-300 to-stone-500"
  },
  {
    id: 28,
    name: "El Sueño",
    location: "Dormitorio",
    sentence: ["Tengo", "mucho", "sueño"],
    translation: "Շատ քունս տանում է:",
    icon: <Ghost className="text-indigo-300" />,
    theme: "from-indigo-400 to-indigo-900"
  },
  {
    id: 29,
    name: "El Perro",
    location: "Campo",
    sentence: ["El", "perro", "corre"],
    translation: "Շունը վազում է:",
    icon: <MapIcon className="text-stone-600" />,
    theme: "from-stone-400 to-stone-600"
  },
  {
    id: 30,
    name: "El Final",
    location: "Destino",
    sentence: ["Llegamos", "al", "final"],
    translation: "Մենք հասանք վերջին:",
    icon: <Trophy className="text-yellow-500" />,
    theme: "from-yellow-400 to-amber-600"
  }
];

// --- Utilities ---

const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

// --- Components ---

export default function SacredSentenceMission() {
  const [view, setView] = useState<'intro' | 'map' | 'adventure' | 'finish'>('intro');
  const [maxUnlockedIdx, setMaxUnlockedIdx] = useState(0);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [score, setScore] = useState(0);

  const currentLevel = LEVELS[currentLevelIdx];

  useEffect(() => {
    if (view === 'adventure') {
      setShuffledWords(shuffle(currentLevel.sentence));
      setSelectedWords([]);
      setFeedback('none');
    }
  }, [view, currentLevelIdx]);

  const handleWordClick = (word: string, index: number, isSelected: boolean) => {
    if (feedback !== 'none') return;
    
    if (isSelected) {
      // Remove from selected, add back to shuffled
      setSelectedWords(prev => prev.filter((_, i) => i !== index));
      setShuffledWords(prev => [...prev, word]);
    } else {
      // Add to selected, remove from shuffled
      setSelectedWords(prev => [...prev, word]);
      setShuffledWords(prev => prev.filter((_, i) => i !== index));
    }
  };

  const checkSentence = () => {
    const isCorrect = selectedWords.join(' ') === currentLevel.sentence.join(' ');
    
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 500);
      speak(selectedWords.join(' '));
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      
      setTimeout(() => {
        if (currentLevelIdx === maxUnlockedIdx) {
          setMaxUnlockedIdx(prev => Math.min(prev + 1, LEVELS.length - 1));
        }

        if (currentLevelIdx < LEVELS.length - 1) {
          setCurrentLevelIdx(prev => prev + 1);
        } else {
          setView('finish');
        }
      }, 2000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('none');
        // Reset local level state
        setShuffledWords(shuffle(currentLevel.sentence));
        setSelectedWords([]);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-amber-500/30 overflow-x-hidden flex flex-col">
      
      <AnimatePresence mode="wait">
        
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12 bg-radial-[at_50%_50%] from-amber-500/10 to-transparent"
          >
            <div className="space-y-6">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 bg-gradient-to-br from-amber-500 to-red-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)] border-2 border-white/20"
              >
                <Compass size={64} className="text-white" />
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-500">
                MISIÓN <br /><span className="text-amber-500">SENTENCIA</span>
              </h1>
              <p className="text-stone-500 font-bold uppercase tracking-[0.3em] text-xs max-w-md mx-auto leading-relaxed">
                Իսպանիայի գաղտնիքները թաքնված են խառնված բառերի մեջ։ Վերականգնե՛ք նախադասությունները և բացահայտե՛ք ճշմարտությունը։
              </p>
            </div>

            <button 
              onClick={() => setView('map')}
              className="group relative px-12 py-5 overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 text-black group-hover:text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                Empezar Aventura <ChevronRight size={18} />
              </span>
            </button>
          </motion.div>
        )}

        {view === 'map' && (
          <motion.div 
            key="map"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full space-y-12"
          >
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-amber-500 font-black uppercase tracking-widest text-[10px]">Mapa de Expedición</p>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Locaciones Secretas</h2>
              </div>
              <div className="bg-stone-900 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-3">
                <Trophy size={20} className="text-amber-500" />
                <span className="text-2xl font-black italic">{score}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEVELS.map((level, i) => {
                const isLocked = i > maxUnlockedIdx;
                const isCompleted = i < maxUnlockedIdx;
                const isActive = i === currentLevelIdx;

                return (
                  <motion.button
                    disabled={isLocked}
                    key={level.id}
                    whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
                    onClick={() => {
                        setCurrentLevelIdx(i);
                        setView('adventure');
                    }}
                    className={`relative p-8 rounded-[40px] text-left border-2 transition-all ${
                        isActive ? 'bg-stone-900 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]' : 
                        isCompleted ? 'bg-stone-900/50 border-emerald-500/30 grayscale-[0.8]' : 
                        'bg-stone-950 border-white/5 opacity-50 grayscale cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-stone-800 ${isActive ? 'ring-2 ring-amber-500' : ''}`}>
                        {level.icon}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                        Paso {level.id}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black italic uppercase tracking-tight leading-none mb-1">
                        {level.name}
                      </h3>
                      <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">{level.location}</p>
                    </div>
                    
                    {isCompleted && (
                       <div className="mt-6 flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 w-fit px-3 py-1 rounded-full">
                          <Sword size={12} /> Completado
                       </div>
                    )}
                    {isActive && (
                       <div className="mt-6 flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest bg-amber-500/10 w-fit px-3 py-1 rounded-full">
                          En curso
                       </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {view === 'adventure' && (
          <motion.div 
            key="adventure"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex-1 flex flex-col p-6 bg-gradient-to-br ${currentLevel.theme} flex flex-col items-center justify-center relative`}
          >
            {/* Overlay to darken background slightly for readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div className="absolute top-6 left-6 z-20">
               <button 
                onClick={() => setView('map')}
                className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 rounded-full border border-white/10 backdrop-blur-md text-xs font-black uppercase tracking-widest transition-all"
               >
                 <MapIcon size={16} /> Mapa
               </button>
            </div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-16">
              
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-black/30 rounded-full border border-white/10 backdrop-blur-md">
                   {currentLevel.icon}
                   <h3 className="text-xl font-black italic uppercase tracking-tighter">{currentLevel.name}, {currentLevel.location}</h3>
                </div>
                <p className="text-white/70 font-bold uppercase tracking-widest text-xs">{currentLevel.translation}</p>
              </div>

              {/* Selected Words Area */}
              <div className="w-full min-h-[140px] bg-black/40 border-4 border-dashed border-white/10 rounded-[40px] p-8 flex flex-wrap justify-center gap-3 items-center">
                <AnimatePresence>
                  {selectedWords.map((word, i) => (
                    <motion.button
                      key={`${word}-${i}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => handleWordClick(word, i, true)}
                      className={`px-8 py-5 rounded-2xl bg-white text-black font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                        feedback === 'correct' ? 'ring-4 ring-emerald-500' : feedback === 'wrong' ? 'ring-4 ring-red-500' : ''
                      }`}
                    >
                      {word}
                    </motion.button>
                  ))}
                </AnimatePresence>
                {selectedWords.length === 0 && (
                  <p className="text-white/20 font-black uppercase tracking-widest text-sm">Վերականգնե՛ք նախադասությունը այստեղ</p>
                )}
              </div>

              {/* Shuffle Area */}
              <div className="flex flex-wrap justify-center gap-3">
                {shuffledWords.map((word, i) => (
                  <motion.button
                    key={`${word}-${i}`}
                    layout
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWordClick(word, i, false)}
                    className="px-8 py-5 rounded-2xl bg-black/50 border border-white/10 text-white font-black text-xl shadow-xl transition-all hover:bg-black/70 backdrop-blur-md"
                  >
                    {word}
                  </motion.button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                 <button 
                  onClick={() => {
                    setShuffledWords(shuffle(currentLevel.sentence));
                    setSelectedWords([]);
                    setFeedback('none');
                  }}
                  className="p-5 bg-white/10 rounded-3xl hover:bg-white/20 transition-all text-white/50 hover:text-white"
                 >
                   <RotateCcw size={24} />
                 </button>
                 <button 
                  disabled={selectedWords.length === 0 || feedback !== 'none'}
                  onClick={checkSentence}
                  className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-3xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all shadow-2xl"
                 >
                   Confirmar Sentencia
                 </button>
              </div>
            </div>

            {/* Ghostly Effect if it's a cave or something */}
            {currentLevel.id === 2 && (
              <motion.div 
                animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute pointer-events-none"
              >
                <Ghost size={200} className="text-white/10" />
              </motion.div>
            )}
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12"
          >
            <div className="space-y-6">
              <div className="w-48 h-48 bg-gradient-to-br from-amber-400 to-red-600 rounded-[3rem] mx-auto flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.5)] border-4 border-white/20">
                <Trophy size={100} className="text-white animate-bounce" />
              </div>
              <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
                MISIÓN<br />COMPLETA
              </h1>
              <p className="text-stone-500 font-bold uppercase tracking-widest text-sm">Դուք բացահայտեցիք Իսպանիայի բոլոր սուրբ նախադասությունները:</p>
            </div>

            <div className="bg-stone-900 border border-white/5 p-12 rounded-[50px] space-y-2 shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600">Puntaje Final</p>
              <h3 className="text-8xl font-black italic text-amber-500">{score}</h3>
            </div>

            <button 
              onClick={() => { setView('intro'); setCurrentLevelIdx(0); setMaxUnlockedIdx(0); setScore(0); }}
              className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-2xl"
            >
              Reiniciar Aventura
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="p-8 border-t border-white/5 flex justify-center opacity-20">
         <p className="text-[10px] font-black uppercase tracking-[1em]">Secret Missions Lab v9.4</p>
      </footer>
    </div>
  );
}
