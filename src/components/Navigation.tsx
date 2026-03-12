import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { socialLinks } from '@/lib/socialLinks';

const navItems = ['About', 'Tech Stack', 'Projects', 'Skills', 'Certificates', 'Contact'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setMobileOpen(false);
  };

  const scrollToSection = (id: string) => {
    const sectionId = id.toLowerCase().replace(' ', '-');
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? 'bg-card border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className="focus:outline-none"
            aria-label="Scroll to top"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent cursor-pointer"
            >
              Mahmoud Ali
            </motion.div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            {/* Desktop social icons */}
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-border/50">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Hamburger button */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative p-2.5 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-0 z-40 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="pointer-events-auto mx-4 mt-24 mb-6 rounded-3xl border border-border/60 bg-[radial-gradient(circle_at_top,_hsl(265_89%_16%_/_0.96),_hsl(230_35%_7%))] shadow-[0_0_40px_hsl(265_89%_68%_/_0.45)] backdrop-blur-xl"
            >
              <div className="flex flex-col justify-between h-full max-h-[calc(100vh-7rem)] px-8 py-8">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => scrollToSection(item)}
                      className="text-left text-xl font-medium text-foreground/85 hover:text-primary transition-colors py-4 border-b border-border/20 flex items-center gap-3 group"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_10px_hsl(var(--primary)/0.6)] transition-all" />
                      {item}
                    </motion.button>
                  ))}
                </div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-center gap-4 pt-4"
                >
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_24px_hsl(var(--primary)/0.35)] transition-all"
                      aria-label={label}
                    >
                      <Icon size={22} />
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
