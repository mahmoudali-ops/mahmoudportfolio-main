import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// SVG Tech Icons
const TechIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    '.NET': (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M2.17 12.27a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.92zm5.41-6.77L5.32 8.95 9.7 15.5H7.58l-3.08-4.65v4.65H2.75V8.5h1.75v4.35l2.92-4.35h1.16zm5.03 3.6L11.07 15.5H9.3L12.2 8.5h1.21l2.92 7h-1.77l-1.55-6.4zm5.69-3.6h1.59l-3.07 7H15.2l3.1-7zm0 0"/>
        <text x="1" y="18" fontSize="9" fontWeight="bold" fontFamily="monospace">.NET</text>
      </svg>
    ),
    'C#': (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <text x="2" y="17" fontSize="13" fontWeight="bold" fontFamily="monospace">C#</text>
      </svg>
    ),
    'default': null,
  };
  return icons[name] || null;
};

const technologies = [
  { name: '.NET', category: 'Platform', color: 'hsl(265 80% 65%)', abbr: '.NET' },
  { name: 'C#', category: 'Backend', color: 'hsl(270 85% 60%)', abbr: 'C#' },
  { name: 'ASP.NET Core', category: 'Backend', color: 'hsl(280 90% 65%)', abbr: 'ASP' },
  { name: 'Web API', category: 'Backend', color: 'hsl(260 75% 60%)', abbr: 'API' },
  { name: 'Entity Framework', category: 'Backend', color: 'hsl(290 80% 60%)', abbr: 'EF' },
  { name: 'SQL Server', category: 'Database', color: 'hsl(195 100% 50%)', abbr: 'SQL' },
  { name: 'Redis', category: 'Database', color: 'hsl(0 85% 55%)', abbr: 'RDS' },
  { name: 'Angular', category: 'Frontend', color: 'hsl(0 90% 55%)', abbr: 'NG' },
  { name: 'TypeScript', category: 'Frontend', color: 'hsl(211 100% 50%)', abbr: 'TS' },
  { name: 'JavaScript', category: 'Frontend', color: 'hsl(50 100% 50%)', abbr: 'JS' },
  { name: 'MediatR', category: 'Architecture', color: 'hsl(160 80% 45%)', abbr: 'MR' },
  { name: 'SignalR', category: 'RealTime', color: 'hsl(30 90% 55%)', abbr: 'SR' },
  { name: 'Clean Architecture', category: 'Architecture', color: 'hsl(150 75% 45%)', abbr: 'CA' },
];

// Split into 3 rows for galaxy effect
const row1 = technologies.slice(0, 5);
const row2 = technologies.slice(5, 9);
const row3 = technologies.slice(9, 13);

interface TechCardProps {
  tech: typeof technologies[0];
}

const TechCard = ({ tech }: TechCardProps) => (
  <motion.div
    whileHover={{ scale: 1.15, y: -8 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="flex-shrink-0 group cursor-pointer mx-4"
  >
    <div
      className="relative px-8 py-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 min-w-[160px]"
      style={{
        borderColor: `${tech.color}40`,
        backgroundColor: `${tech.color}10`,
        boxShadow: `0 0 25px ${tech.color}25`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 40px ${tech.color}60`, background: `${tech.color}08` }}
      />

      {/* Abbr Icon */}
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 font-black text-xl mx-auto"
        style={{
          background: `linear-gradient(135deg, ${tech.color}30, ${tech.color}60)`,
          color: tech.color,
          boxShadow: `0 6px 20px ${tech.color}40`,
          border: `2px solid ${tech.color}50`,
          textShadow: `0 0 12px ${tech.color}`,
        }}
      >
        {tech.abbr}
      </div>

      <p className="text-center text-sm font-semibold text-foreground group-hover:text-white transition-colors leading-tight">
        {tech.name}
      </p>
      <p
        className="text-center text-xs mt-1.5 font-medium"
        style={{ color: tech.color }}
      >
        {tech.category}
      </p>
    </div>
  </motion.div>
);

interface MarqueeRowProps {
  items: typeof technologies;
  duration?: number;
  reverse?: boolean;
}

const MarqueeRow = ({ items, duration = 25, reverse = false }: MarqueeRowProps) => {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        className="flex will-change-transform"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration}s linear infinite`,
        }}
      >
        {repeated.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
};

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tech-stack" className="relative py-32 overflow-hidden">
      {/* Galaxy nebula glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, hsl(265 80% 60% / 0.3), transparent 70%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[200px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, hsl(195 100% 50% / 0.25), transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground mb-16 text-lg"
        >
          Technologies orbiting my development galaxy
        </motion.p>
      </div>

      {/* Galaxy marquee rows */}
      <div className="space-y-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <MarqueeRow items={row1} duration={22} reverse={false} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <MarqueeRow items={row2} duration={18} reverse={true} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <MarqueeRow items={row3} duration={26} reverse={false} />
        </motion.div>
      </div>
    </section>
  );
}
