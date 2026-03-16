import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Swords, Globe, GraduationCap } from "lucide-react";
import EasterEgg from "@/components/EasterEgg";

const leadership = [
  { role: "Team Lead", org: "Project Aasha", desc: "Quality education for underprivileged children", date: "Aug 2025", icon: <Heart size={18} />, quip: "Teaching kids > debugging production" },
  { role: "Senior Executive", org: "D'Code, NSUT", desc: "Competitive Programming Society", date: "Jan 2025", icon: <Swords size={18} />, quip: "Where we turn coffee into algorithms" },
  { role: "OC Lead", org: "GDSC WoW Delhi-NCR", desc: "700+ GDSCs collaborative event", date: "Mar 2024", icon: <Globe size={18} />, quip: "Organized 700+ GDSCs. Send help." },
  { role: "Delegate", org: "Harvard PAIR'24", desc: "From 50,000+ applicants in 70+ countries", date: "Dec 2023", icon: <GraduationCap size={18} />, quip: "Harvard said yes before my crush did" },
];

const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Leadership</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            Leading & <span className="gradient-text-rose">giving back</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-12">
            apparently people trust me to lead things?? <EasterEgg id="leadership-trust" />
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {leadership.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="glass-card-hover relative overflow-hidden group"
              >
                <div className="h-px bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/40 transition-all duration-500" />
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{item.icon}</span>
                      <span className="mono text-xs text-primary tracking-wider uppercase font-bold">{item.role}</span>
                    </div>
                    <span className="mono text-[10px] text-muted-foreground tracking-wider">{item.date}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-1.5">{item.org}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                  <p className="text-muted-foreground/30 text-xs italic">"{item.quip}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
