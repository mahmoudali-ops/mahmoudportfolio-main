import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import profileImage from '@/assets/mahmoud-profile.jpg';
import { socialLinks } from '@/lib/socialLinks';

// Generate galaxy stars with varied properties
function useGalaxyStars(count: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const armOffset = Math.floor(Math.random() * 3) * ((Math.PI * 2) / 3); // 3 spiral arms
      const radius = Math.random() * 45 + 5; // % from center
      const spiralAngle = angle + armOffset + radius * 0.06;
      const scatter = (Math.random() - 0.5) * 15;
      
      return {
        id: i,
        x: 50 + Math.cos(spiralAngle) * radius + scatter,
        y: 50 + Math.sin(spiralAngle) * radius * 0.6 + (Math.random() - 0.5) * 10,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleDelay: Math.random() * 5,
        twinkleDuration: 2 + Math.random() * 3,
        color: ['hsl(265 89% 78%)', 'hsl(195 100% 70%)', 'hsl(280 100% 80%)', 'hsl(210 100% 90%)', 'hsl(0 0% 100%)'][Math.floor(Math.random() * 5)],
      };
    });
  }, [count]);
}

// Lightweight mobile detection to simplify heavy animations on small screens
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

function GalaxyBackground() {
  const isMobile = useIsMobile();
  // عدد أقل شوية على الموبايل للحفاظ على الأداء، مع نفس طريقة الحركة تقريبًا
  const stars = useGalaxyStars(isMobile ? 260 : 600);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Galaxy core glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full blur-[70px] md:blur-[80px]"
        style={{ background: 'radial-gradient(circle, hsl(265 89% 68% / 0.5), hsl(280 100% 70% / 0.2), transparent)' }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.45, 0.7, 0.45],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary nebula glow */}
      <motion.div
        className="absolute left-[40%] top-[45%] w-[220px] h-[180px] md:w-[250px] md:h-[200px] rounded-full blur-[55px] md:blur-[60px]"
        style={{ background: 'radial-gradient(ellipse, hsl(195 100% 50% / 0.3), transparent)' }}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* نجوم خفيفة على الموبايل (مع دوران أسرع)، وجالاكسي كاملة على الديسكتوب */}
      {isMobile ? (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        >
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              }}
              animate={{
                opacity: [star.opacity * 0.6, star.opacity, star.opacity * 0.6],
              }}
              transition={{
                duration: star.twinkleDuration + 1,
                repeat: Infinity,
                delay: star.twinkleDelay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                }}
                animate={{
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: star.twinkleDuration,
                  repeat: Infinity,
                  delay: star.twinkleDelay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* Shooting stars */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`shoot-${i}`}
              className="absolute w-[2px] h-[2px] rounded-full"
              style={{
                background: 'hsl(0 0% 100%)',
                boxShadow: '0 0 6px 2px hsl(195 100% 80% / 0.8), -20px 0 15px 1px hsl(195 100% 70% / 0.4)',
              }}
              initial={{ x: '20%', y: '10%', opacity: 0 }}
              animate={{
                x: ['20%', '80%'],
                y: ['10%', '60%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 7 + 3,
                repeatDelay: 15 + i * 5,
                ease: 'easeIn',
              }}
            />
          ))}
        </>
      )}

    </div>
  );
}

function TypewriterTitle() {
  const titles = [
    'Full-Stack .NET Developer',
    'Clean Code Enthusiast',
    'Problem Solver',
    'Always Learning New Tech'
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next title
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  return (
    <h2 className="text-3xl md:text-5xl font-semibold text-foreground min-h-[1.2em] flex items-center justify-center">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-10 md:h-14 bg-primary ml-1"
      />
    </h2>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GalaxyBackground />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="mb-8 pt-16 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <img
                src={profileImage}
                alt="Mahmoud Ali"
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent animate-[gradient-shift_4s_ease-in-out_infinite] bg-[length:300%_300%]" style={{ backgroundImage: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--secondary)), hsl(var(--primary)))' }}>
              Mahmoud Ali
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <TypewriterTitle />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Building scalable web applications with ASP.NET Core, Angular, and modern architecture patterns.
            Specialized in Clean Architecture, CQRS, and production-ready systems.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="p-3.5 rounded-2xl border border-border bg-card/50 backdrop-blur-xl text-foreground/70 hover:text-foreground transition-all duration-300"
                style={{
                  ['--hover-color' as string]: color,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = color;
                  el.style.boxShadow = `0 0 25px ${color}40, 0 8px 20px ${color}20`;
                  el.style.color = color;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = '';
                  el.style.boxShadow = '';
                  el.style.color = '';
                }}
                aria-label={label}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(265 89% 68% / 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full text-lg font-semibold hover:shadow-2xl transition-all"
            >
              View Projects
            </motion.button>
            <motion.a
              href="/CV_Mahmoud.pdf"
              download="Mahmoud_Ali_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary rounded-full text-lg font-semibold hover:bg-primary/10 transition-all flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-accent/60 rounded-full text-lg font-semibold hover:bg-accent/10 transition-all"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
