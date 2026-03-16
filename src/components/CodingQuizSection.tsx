import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Code2, Timer, Trophy, ChevronRight, RotateCcw, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEasterEggs } from "@/contexts/EasterEggContext";

const questions = [
  {
    question: "What does `typeof null` return in JavaScript?",
    options: ["'null'", "'object'", "'undefined'", "'number'"],
    answer: 1,
    hint: "It's one of JS's most famous quirks!",
  },
  {
    question: "Which data structure uses LIFO?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    answer: 1,
    hint: "Think of a stack of plates",
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    answer: 2,
    hint: "You keep cutting in half...",
  },
  {
    question: "In Python, what does `[::-1]` do to a list?",
    options: ["Sorts it", "Reverses it", "Removes last item", "Copies it"],
    answer: 1,
    hint: "It flips things around",
  },
  {
    question: "What does CSS `z-index` control?",
    options: ["Font size", "Stacking order", "Zoom level", "Animation speed"],
    answer: 1,
    hint: "It's all about layers",
  },
];

interface LeaderboardEntry {
  id: string;
  player_name: string;
  quiz_score: number;
  quiz_time_seconds: number | null;
  total_score: number;
}

const CodingQuizSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { findEgg, found } = useEasterEggs();

  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Leaderboard fetch
  const fetchLeaderboard = useCallback(async () => {
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("total_score", { ascending: false })
      .limit(5);
    if (data) setLeaderboard(data as LeaderboardEntry[]);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const startGame = () => {
    setGameState("playing");
    setCurrentQ(0);
    setScore(0);
    setTimer(0);
    setSelected(null);
    setShowHint(false);
    setSubmitted(false);
    setPlayerName("");
  };

  const handleAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === questions[currentQ].answer;
    if (correct) setScore((s) => s + 1);

    // Easter egg: get all 5 correct
    if (correct && score + 1 === questions.length && currentQ === questions.length - 1) {
      findEgg("quiz-perfect");
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowHint(false);
      } else {
        setGameState("finished");
      }
    }, 1000);
  };

  const submitScore = async () => {
    if (!playerName.trim()) return;
    await supabase.from("leaderboard").insert({
      player_name: playerName.trim(),
      quiz_score: score,
      quiz_time_seconds: timer,
      eggs_found: found.size,
    });
    setSubmitted(true);
    fetchLeaderboard();
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <section id="quiz" className="section-padding" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Mini Game</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            Think you can <span className="gradient-text-rose">code</span>?
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-10">
            5 quick questions. no googling. angel's watching.
          </p>

          {/* Game Area */}
          <div className="glass-card overflow-hidden">
            {gameState === "idle" && (
              <div className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-2xl bg-secondary mx-auto flex items-center justify-center border border-border/30 mb-6"
                >
                  <Code2 size={28} className="text-primary" />
                </motion.div>
                <h3 className="font-serif text-xl font-bold mb-2">Quick CS Quiz</h3>
                <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
                  5 questions about programming, data structures, and web dev.
                  Try to beat Angel's time! Your score goes on the leaderboard.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-shadow inline-flex items-center gap-2"
                >
                  Start Quiz <ChevronRight size={16} />
                </motion.button>
              </div>
            )}

            {gameState === "playing" && (
              <div className="p-8">
                {/* Progress bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs text-muted-foreground">
                      {currentQ + 1} / {questions.length}
                    </span>
                    <div className="w-32 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer size={14} />
                    <span className="mono text-xs">{formatTime(timer)}</span>
                  </div>
                </div>

                {/* Question */}
                <motion.div
                  key={currentQ}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-serif text-lg font-bold mb-6">{questions[currentQ].question}</h3>
                  <div className="grid gap-3">
                    {questions[currentQ].options.map((opt, i) => {
                      const isCorrect = i === questions[currentQ].answer;
                      const isSelected = selected === i;
                      let borderClass = "border-border/30 hover:border-primary/30";
                      if (selected !== null) {
                        if (isCorrect) borderClass = "border-green-500/50 bg-green-500/5";
                        else if (isSelected) borderClass = "border-red-500/50 bg-red-500/5";
                      }

                      return (
                        <motion.button
                          key={i}
                          whileHover={selected === null ? { scale: 1.01 } : {}}
                          whileTap={selected === null ? { scale: 0.99 } : {}}
                          onClick={() => handleAnswer(i)}
                          disabled={selected !== null}
                          className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all duration-300 text-sm ${borderClass} ${
                            selected === null ? "cursor-pointer bg-secondary/30" : "cursor-default"
                          }`}
                        >
                          <span className="mono text-xs text-muted-foreground mr-3">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Hint */}
                  <div className="mt-4 text-center">
                    {!showHint ? (
                      <button
                        onClick={() => setShowHint(true)}
                        className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                      >
                        need a hint?
                      </button>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-primary/60 italic"
                      >
                        {questions[currentQ].hint}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {gameState === "finished" && (
              <div className="p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-2xl bg-secondary mx-auto flex items-center justify-center border border-border/30 mb-6"
                >
                  <Trophy size={28} className="text-primary" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {score === questions.length ? "Perfect Score!" : score >= 3 ? "Nice job!" : "Keep practicing!"}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  You scored <span className="text-primary font-bold">{score}/{questions.length}</span> in{" "}
                  <span className="text-foreground font-medium">{formatTime(timer)}</span>
                </p>
                <p className="text-muted-foreground/40 text-xs italic mb-8">
                  {score === questions.length
                    ? "okay you might actually be smarter than me"
                    : score >= 3
                    ? "not bad, but angel still holds the crown"
                    : "it's okay, even angel struggled with DSA once... once."}
                </p>

                {/* Submit to leaderboard */}
                {!submitted ? (
                  <div className="flex items-center gap-2 max-w-sm mx-auto mb-8">
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Your name for the leaderboard"
                      maxLength={20}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={submitScore}
                      className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-1.5"
                    >
                      <Send size={14} /> Submit
                    </motion.button>
                  </div>
                ) : (
                  <p className="text-primary text-sm mb-8">Score submitted! Check the leaderboard below.</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full bg-secondary/60 border border-border/30 text-sm text-secondary-foreground hover:border-primary/20 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw size={14} /> Try Again
                </motion.button>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-6 glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} className="text-primary" />
                <h3 className="font-serif text-lg font-bold">Leaderboard</h3>
              </div>
              <div className="space-y-2">
                {leaderboard.map((entry, i) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/20"
                  >
                    <span className={`mono text-xs font-bold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                      #{i + 1}
                    </span>
                    <span className="flex-1 text-sm text-foreground">{entry.player_name}</span>
                    <span className="mono text-xs text-muted-foreground">
                      {entry.quiz_score}/5
                    </span>
                    {entry.quiz_time_seconds && (
                      <span className="mono text-xs text-muted-foreground/50">
                        {formatTime(entry.quiz_time_seconds)}
                      </span>
                    )}
                    <span className="mono text-xs text-primary font-bold">{entry.total_score} pts</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingQuizSection;
