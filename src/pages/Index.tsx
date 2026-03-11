import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Architecture from '@/components/sections/Architecture';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import { socialLinks } from '@/lib/socialLinks';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarField />
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Skills />
      <Architecture />
      <Certificates />
      <Contact />
      
      {/* Footer */}
      <footer className="relative py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground text-sm">
              © 2025 Mahmoud Ali. Built with React & Framer Motion.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `${color}60`;
                    el.style.color = color;
                    el.style.boxShadow = `0 0 15px ${color}25`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = '';
                    el.style.color = '';
                    el.style.boxShadow = '';
                  }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
