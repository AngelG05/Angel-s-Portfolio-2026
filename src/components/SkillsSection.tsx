import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Globe, Palette, BookMarked } from "lucide-react";
import EasterEgg from "@/components/EasterEgg";

const skillCategories = [
  {
    title: "Languages",
    icon: <Terminal size={18} />,
    quip: "I speak more languages than most polyglots",
    skills: ["C++", "Python", "C", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Web & Tools",
    icon: <Globe size={18} />,
    quip: "My browser has 47 tabs open rn",
    skills: ["React", "MySQL", "NoSQL", "Bootstrap", "Git", "GitHub", "LaTeX"],
  },
  {
    title: "Design",
    icon: <Palette size={18} />,
    quip: "Making things pretty since forever",
    skills: ["Figma", "Canva"],
  },
  {
    title: "Core CS",
    icon: <BookMarked size={18} />,
    quip: "The stuff interviews love to ask about",
    skills: ["DSA", "Operating Systems", "Computer Networks", "DBMS"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Skills</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            My <span className="gradient-text-rose">toolkit</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-12">
            things i actually know vs things on my resume (they overlap, promise) <EasterEgg id="skills-resume" />
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="glass-card-hover relative overflow-hidden group"
              >
                <div className="h-px bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/40 transition-all duration-500" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border/30 group-hover:scale-105 transition-transform text-primary">
                      {cat.icon}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground">{cat.title}</h3>
                  </div>
                  <p className="text-muted-foreground/40 text-xs italic mb-5 ml-[52px]">{cat.quip}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 + si * 0.04 }}
                        className="px-3 py-1.5 rounded-lg bg-secondary/60 text-sm text-secondary-foreground border border-border/30 hover:border-primary/20 hover:bg-primary/5 hover:text-foreground transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
