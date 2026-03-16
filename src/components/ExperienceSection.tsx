import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cloud, Wrench, CalendarDays, Search } from "lucide-react";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const highlights = [
    { label: "Team", value: "Cloud Dataplex", icon: <Cloud size={16} /> },
    { label: "Impact", value: "1L+ fixes", icon: <Wrench size={16} /> },
    { label: "Duration", value: "12 weeks", icon: <CalendarDays size={16} /> },
  ];

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Experience</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            Where I've <span className="gradient-text-rose">worked</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-12">
            just one internship and it was at google. no big deal.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card relative overflow-hidden group"
          >
            <div className="h-1 bg-gradient-to-r from-primary/40 via-lavender/30 to-peach/20" />
            
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border/30 glow-pink">
                      <Search size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-foreground">Google</h3>
                      <p className="text-primary font-medium text-sm">Associate Software Developer (STEP) Intern</p>
                      <p className="text-muted-foreground text-xs mt-0.5">Hyderabad, India</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mono text-xs text-primary shrink-0">
                  May - Aug 2025
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {highlights.map((h) => (
                  <div key={h.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/20">
                    <span className="text-primary">{h.icon}</span>
                    <div>
                      <p className="mono text-[9px] text-muted-foreground uppercase tracking-widest">{h.label}</p>
                      <p className="text-foreground text-xs font-semibold">{h.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Java", "gORM", "Google Cloud", "Dataplex"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-secondary/80 mono text-[11px] text-secondary-foreground border border-border/30">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-4">
                {[
                  "Worked with Google Cloud Dataplex SecCom and CCFE team to handle controlplane-dataplane sync.",
                  "Developed wipeout pipeline in integration with GMEK to ensure secure deletion of CMEK-enabled resources.",
                  "Leading the resolution of 1 Lakh+ state violations where compliance notifications are not sent after migration.",
                ].map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.12 }}
                    className="flex items-start gap-3 text-secondary-foreground text-[15px] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
