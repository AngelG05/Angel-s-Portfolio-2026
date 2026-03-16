import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/angel-gupta/", icon: <Linkedin size={16} /> },
    { label: "Instagram", href: "https://www.instagram.com/anngell_me/", icon: <Instagram size={16} /> },
  ];

  return (
    <section id="contact" className="section-padding text-center relative" ref={ref}>
      <div className="section-divider mb-12" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(335 65% 62% / 0.06), transparent 70%)" }} />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-8 h-px bg-primary/50" />
            <p className="mono text-primary text-xs tracking-widest uppercase">Contact</p>
            <div className="w-8 h-px bg-primary/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            Let's <span className="gradient-text-rose">connect</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm italic mb-3">
            i promise i reply faster than my code compiles
          </p>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed text-sm">
            I'm always open to exciting opportunities, collaborations, or just a friendly chat. 
            Feel free to reach out!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.a
              href="mailto:angelgupta.me@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-shadow"
            >
              <Mail size={16} />
              angelgupta.me@gmail.com
            </motion.a>
            <motion.a
              href="tel:+916284505411"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-secondary/60 border border-border/30 text-secondary-foreground text-sm hover:border-primary/20 transition-all backdrop-blur-sm"
            >
              <Phone size={16} />
              +91-6284505411
            </motion.a>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/40 border border-border/20 text-sm text-secondary-foreground hover:border-primary/20 hover:bg-primary/5 transition-all backdrop-blur-sm"
              >
                <span className="text-primary">{s.icon}</span>
                {s.label}
              </motion.a>
            ))}
          </div>

          <div className="mt-24 pt-8 border-t border-border/20">
            <p className="text-xs text-muted-foreground mono tracking-wider">
              Designed with love by Angel Gupta · {new Date().getFullYear()}
            </p>
            <p className="text-[10px] text-muted-foreground/30 mt-2 italic">
              No designers were harmed in the making of this portfolio
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
