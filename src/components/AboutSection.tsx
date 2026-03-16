import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Star, Briefcase, Lightbulb, MapPin } from "lucide-react";
import EasterEgg from "@/components/EasterEgg";

const stats = [
  { label: "University", value: "NSUT, Delhi", icon: <GraduationCap size={20} /> },
  { label: "Degree", value: "B.Tech IT", icon: <BookOpen size={20} /> },
  { label: "CGPA", value: "8.93/10", icon: <Star size={20} /> },
  { label: "Experience", value: "Google STEP", icon: <Briefcase size={20} /> },
  { label: "Problems", value: "800+", icon: <Lightbulb size={20} /> },
  { label: "Location", value: "Delhi, India", icon: <MapPin size={20} /> },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">About Me</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            A little about <span className="gradient-text-rose">Angel</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-12">
            tldr: i write code, collect scholarships, and forget to sleep
          </p>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-5">
              <div className="glass-card p-8 md:p-10 space-y-5">
                <p className="text-secondary-foreground leading-[1.8] text-[15px]">
                  Hey there! I'm <span className="text-primary font-semibold">Angel Gupta</span> - a third-year 
                  Information Technology student at <span className="text-foreground font-medium">NSUT, Delhi</span> with 
                  a CGPA of 8.93/10 (yes, I'm that girl who actually studies before exams).
                </p>
                <p className="text-secondary-foreground leading-[1.8] text-[15px]">
                  I interned at <span className="text-foreground font-medium">Google</span> as a STEP developer, 
                  and I've solved <span className="text-primary font-semibold">800+ coding problems</span> across platforms. 
                  Some say I have a problem... solving problem. They're not wrong.
                </p>
                <p className="text-secondary-foreground leading-[1.8] text-[15px]">
                  Beyond code, I'm a <span className="text-foreground font-medium">Google Generation Scholar</span>, 
                  <span className="text-foreground font-medium"> Millennium Fellowship Scholar</span>, and an active community leader 
                  who believes in making tech more inclusive. Basically, I run on coffee and ambition. <EasterEgg id="about-coffee" />
                </p>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-3 h-fit">
              {stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="glass-card-hover p-4 flex flex-col items-center text-center gap-2"
                >
                  <span className="text-primary">{item.icon}</span>
                  <p className="mono text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</p>
                  <p className="text-foreground font-semibold text-sm">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
