import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-background/80 border-b border-border/20 shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-serif text-xl font-bold gradient-text-rose">
          Angel✦
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/50 transition-all duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-2"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden backdrop-blur-2xl bg-background/95 border-b border-border/20 px-6 pb-6"
        >
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="block py-3 text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
