import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggs } from "@/contexts/EasterEggContext";
import { Sparkles, Gift } from "lucide-react";

const EggTracker = () => {
  const { found, totalEggs, allFound } = useEasterEggs();
  const count = found.size;

  if (count === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="glass-card px-4 py-3 flex items-center gap-3 glow-pink">
        <motion.div
          animate={allFound ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ repeat: allFound ? Infinity : 0, duration: 1.5, repeatDelay: 2 }}
        >
          {allFound ? (
            <Gift size={18} className="text-primary" />
          ) : (
            <Sparkles size={18} className="text-primary" />
          )}
        </motion.div>
        <div>
          <p className="mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {allFound ? "All secrets found!" : "Secrets found"}
          </p>
          <p className="text-foreground font-bold text-sm">
            {count} / {totalEggs}
          </p>
        </div>
        <AnimatePresence>
          {allFound && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-primary/60 text-xs italic"
            >
              you're good!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EggTracker;
