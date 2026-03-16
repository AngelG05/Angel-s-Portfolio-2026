import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Puzzle, Globe2, Gem, Medal, Rocket, Flower2, Zap, Heart, Trophy } from "lucide-react";
import EasterEgg from "@/components/EasterEgg";

const achievements = [
  { text: "Solved 800+ questions across Leetcode, GFG, and CodeChef", icon: <Puzzle size={18} />, date: "Nov 2025", highlight: false },
  { text: "Top 700 globally for Ericsson Edge Academia Program", icon: <Globe2 size={18} />, date: "Oct 2025", highlight: false },
  { text: "Google Generation Scholarship - top 55 globally", icon: <Gem size={18} />, date: "Sept 2025", highlight: true },
  { text: "CVSPK-TIS 1% Scholarship - Department Rank 3 (twice!)", icon: <Medal size={18} />, date: "May 2025", highlight: false },
  { text: "AlgoUniversity Technology Fellowship - top 5% of 20,000+", icon: <Rocket size={18} />, date: "Dec 2024", highlight: false },
  { text: "Millennium Fellowship Scholar - among 52,000+ globally", icon: <Flower2 size={18} />, date: "Aug 2024", highlight: true },
  { text: "6th place from 200+ teams in Hacked 2.0 hackathon", icon: <Zap size={18} />, date: "Mar 2024", highlight: false },
  { text: "SheCodes Foundation Scholar - top 5,000 Indian women", icon: <Heart size={18} />, date: "Nov 2023", highlight: false },
  { text: "Top 3 finalists at IIM Bangalore for startup ideation", icon: <Trophy size={18} />, date: "Aug 2023", highlight: true },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" className="section-padding" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Achievements</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            Awards & <span className="gradient-text-rose">recognition</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-12">
            my mom's fridge is running out of space for certificates <EasterEgg id="achievements-fridge" />
          </p>

          {/* Counter strip */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { number: "9+", label: "Major Awards", icon: <Trophy size={22} /> },
              { number: "55", label: "Selected Globally", icon: <Gem size={22} /> },
              { number: "800+", label: "Problems Solved", icon: <Puzzle size={22} /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card p-5 text-center"
              >
                <span className="text-primary mb-2 flex justify-center">{stat.icon}</span>
                <p className="font-serif text-2xl md:text-3xl font-bold gradient-text-rose">{stat.number}</p>
                <p className="mono text-[9px] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2.5">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                className={`glass-card-hover p-5 flex items-center gap-4 group ${
                  item.highlight ? "border-primary/15" : ""
                }`}
              >
                <span className="text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <p className={`text-sm flex-1 leading-relaxed ${item.highlight ? "text-foreground font-medium" : "text-secondary-foreground"}`}>
                  {item.text}
                </p>
                <span className="mono text-[10px] text-muted-foreground shrink-0 hidden sm:block tracking-wider">{item.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
