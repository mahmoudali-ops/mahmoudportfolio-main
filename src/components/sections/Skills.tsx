import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const skills = [
  { name: 'ASP.NET Core', level: 95, color: 'hsl(265 80% 65%)' },
  { name: 'C# & .NET', level: 95, color: 'hsl(270 85% 60%)' },
  { name: 'Entity Framework Core', level: 90, color: 'hsl(280 90% 65%)' },
  { name: 'SQL Server', level: 90, color: 'hsl(195 100% 50%)' },
  { name: 'Angular', level: 85, color: 'hsl(0 90% 55%)' },
  { name: 'TypeScript', level: 85, color: 'hsl(211 100% 50%)' },
  { name: 'Clean Architecture', level: 90, color: 'hsl(160 80% 45%)' },
  { name: 'CQRS & MediatR', level: 85, color: 'hsl(150 75% 45%)' },
  { name: 'Redis', level: 80, color: 'hsl(0 85% 55%)' },
  { name: 'SignalR', level: 80, color: 'hsl(30 90% 55%)' },
  { name: 'REST APIs', level: 95, color: 'hsl(260 75% 60%)' },
  { name: 'Git & GitHub', level: 90, color: 'hsl(0 0% 70%)' },
];

const badges = [
  'SOLID Principles', 'Design Patterns', 'Onion Architecture',
  'Domain-Driven Design', 'Microservices', 'JWT Auth',
];

function AnimatedCounter({ target, isInView }: { target: number; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span>{count}%</span>;
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background pulse */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, hsl(265 80% 60% / 0.3), transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-20 text-lg"
        >
          Proficiency levels across my core technologies
        </motion.p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm px-5 py-4"
            >
              <div className="mb-3 flex justify-between items-center">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <span className="text-sm font-bold tabular-nums" style={{ color: skill.color }}>
                  <AnimatedCounter target={skill.level} isInView={isInView} />
                </span>
              </div>

              {/* Enhanced progress bar */}
              <div className="relative h-3.5 rounded-full bg-muted/90 overflow-hidden border border-border/80 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: index * 0.08 + 0.3, duration: 1.2, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color})`,
                    boxShadow: `0 0 20px ${skill.color}80, inset 0 -1px 2px hsl(0 0% 0% / 0.25)`,
                  }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: index * 0.08 + 0.3, duration: 1.2, ease: 'easeOut' }}
                  className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full"
                  style={{
                    left: `calc(${skill.level}% - 6px)`,
                    background: skill.color,
                    boxShadow: `0 0 12px ${skill.color}`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill badges with orbit-like animation */}
        <div className="mt-24 flex flex-wrap gap-4 justify-center">
          {badges.map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 1.2 + index * 0.1, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.15, y: -5, boxShadow: '0 10px 30px hsl(265 80% 60% / 0.3)' }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/40 backdrop-blur-xl cursor-pointer group relative overflow-hidden"
            >
              {/* Glow sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, repeatDelay: 4 }}
              />
              <span className="font-semibold relative z-10 group-hover:text-primary transition-colors">{badge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
