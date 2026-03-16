import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, HeartPulse } from "lucide-react";
import EasterEgg from "@/components/EasterEgg";

const projects = [
  {
    title: "MeetWise",
    subtitle: "Smart Meeting Assistant",
    tech: ["React", "JavaScript", "Firebase"],
    icon: <ClipboardList size={22} />,
    description:
      "A meeting management web app to organize, track, and summarize meetings with structured agendas, actionable follow-ups, and real-time Firebase synchronization.",
    date: "Sept 2025",
    quip: "Because 'I'll remember it' is never true",
  },
  {
    title: "Medilink",
    subtitle: "Medically Linked",
    tech: ["React", "JavaScript", "Bootstrap"],
    icon: <HeartPulse size={22} />,
    description:
      "A responsive healthcare platform to streamline appointment scheduling, improve patient access, and integrate medical record management for enhanced coordination.",
    date: "March 2024",
    tag: "Hackathon",
    quip: "Built in a hackathon fueled by chai & chaos",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="section-divider mb-12" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Projects</p>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            Things I've <span className="gradient-text-rose">built</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-12">
            the ones that actually work, at least most of the time <EasterEgg id="projects-work" />
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="glass-card-hover relative overflow-hidden group"
              >
                <div className="h-1 bg-gradient-to-r from-primary/30 to-lavender/20 group-hover:from-primary/50 group-hover:to-lavender/40 transition-all duration-500" />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border/30 group-hover:scale-105 transition-transform duration-300 text-primary">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold text-foreground">{project.title}</h3>
                        <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                      </div>
                    </div>
                    {project.tag && (
                      <span className="px-3 py-1 rounded-full bg-accent/8 text-accent mono text-[10px] font-bold border border-accent/15 uppercase tracking-wider">
                        {project.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-secondary-foreground text-sm leading-[1.7] mb-4">{project.description}</p>
                  <p className="text-muted-foreground/40 text-xs italic mb-6">"{project.quip}"</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-secondary/80 mono text-[10px] text-secondary-foreground border border-border/30">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mono text-[10px] text-muted-foreground">{project.date}</span>
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

export default ProjectsSection;
