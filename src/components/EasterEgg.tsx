import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useEasterEggs } from "@/contexts/EasterEggContext";

interface EasterEggProps {
  id: string;
  className?: string;
}

const EasterEgg = ({ id, className = "" }: EasterEggProps) => {
  const { found, findEgg } = useEasterEggs();
  const [showBurst, setShowBurst] = useState(false);
  const isFound = found.has(id);

  const handleClick = () => {
    if (isFound) return;
    findEgg(id);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 1200);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence>
        {!isFound && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            onClick={handleClick}
            className="relative cursor-pointer group"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            title="You found a secret!"
          >
            <Sparkles
              size={14}
              className="text-primary/20 group-hover:text-primary/60 transition-colors duration-300 animate-pulse"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBurst && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-4 h-4 rounded-full bg-primary/40 blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {isFound && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-primary/40"
        >
          <Sparkles size={14} />
        </motion.span>
      )}
    </div>
  );
};

export default EasterEgg;
