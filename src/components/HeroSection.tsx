import { motion } from "framer-motion";
import avatar from "@/assets/avatar.png";
import AIChatPrompt from "@/components/AIChatPrompt";
import EasterEgg from "@/components/EasterEgg";
import { User, FolderOpen, Sparkles, Trophy, Mail, Code2, Heart, Gamepad2 } from "lucide-react";

const roles = [
  "Software Developer",
  "Google STEP Intern",
  "Problem Solver (hopefully)",
  "Shy Dancer",
];

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center section-padding relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(335 65% 62% / 0.08), transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(270 45% 65% / 0.06), transparent 70%)", animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(circle, hsl(20 70% 75% / 0.04), transparent 70%)", animationDelay: "4s" }} />

      {/* Floating sparkles */}
      <div className="absolute top-[20%] right-[15%] text-primary/20 animate-sparkle"><EasterEgg id="hero-sparkle" className="opacity-60" /></div>
      <div className="absolute bottom-[30%] left-[10%] text-lavender/20 animate-sparkle" style={{ animationDelay: "1s" }}><Sparkles size={14} /></div>
      <div className="absolute top-[60%] right-[25%] text-peach/20 animate-sparkle" style={{ animationDelay: "2s" }}><Heart size={12} /></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10 w-full max-w-3xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/60 border border-border/30 text-sm text-muted-foreground mb-10 backdrop-blur-sm"
        >
          <Code2 size={12} className="text-primary" />
          <span className="mono text-xs tracking-wider">Software Developer & CS Undergrad</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-base tracking-wide mb-3"
        >
          Welcome to my digital garden
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] mb-4 tracking-tight"
        >
          What's <span className="gradient-text-rose">Angel</span> doing
          <br />
          these days?
        </motion.h1>

        {/* Funny subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground/60 text-sm italic mb-10"
        >
          (spoiler: mostly debugging & pretending to have a social life)
        </motion.p>

        {/* Avatar with ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7, type: "spring", stiffness: 80 }}
          className="animate-float relative inline-block"
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-150 pointer-events-none" />
          <div className="relative">
            <div className="absolute -inset-2 rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-4 rounded-full border border-lavender/5 animate-[spin_30s_linear_infinite_reverse]" />
            <img
              src={avatar}
              alt="Angel Gupta avatar"
              className="w-36 h-36 md:w-48 md:h-48 mx-auto drop-shadow-2xl relative"
            />
          </div>
        </motion.div>

        {/* Role ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {roles.map((role) => (
            <span key={role} className="px-3 py-1 rounded-full bg-secondary/30 border border-border/20 mono text-[10px] text-muted-foreground tracking-wider">
              {role}
            </span>
          ))}
        </motion.div>

        {/* Quick nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2.5 mt-12"
        >
          {[
            { label: "About Me", icon: <User size={14} />, href: "#about" },
            { label: "Projects", icon: <FolderOpen size={14} />, href: "#projects" },
            { label: "Skills", icon: <Sparkles size={14} />, href: "#skills" },
            { label: "Achievements", icon: <Trophy size={14} />, href: "#achievements" },
            { label: "Quiz", icon: <Gamepad2 size={14} />, href: "#quiz" },
            { label: "Contact", icon: <Mail size={14} />, href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 border border-border/30 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/20 hover:text-foreground transition-all duration-300 backdrop-blur-sm"
            >
              <span className="text-primary">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </motion.div>

        {/* AI Chat */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-10 w-full"
        >
          <AIChatPrompt />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
