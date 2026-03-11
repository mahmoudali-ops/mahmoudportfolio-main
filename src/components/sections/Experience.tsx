import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    period: '08/2025 – Present',
    role: 'Part-Time Full-Stack .NET Developer',
    company: 'Next Step Solutions Company',
    achievements: [
      'Building professional web solutions to help businesses grow and succeed online',
      'Designing and developing modern, responsive, and SEO-friendly websites',
      'Delivering customized solutions aligned with each client\'s goals',
    ],
  },
  {
    period: '03/2025 – 07/2025',
    role: 'Full Stack .NET Trainee',
    company: 'Information Technology Institute (ITI) — Minya, Egypt',
    achievements: [
      'Trained in .NET Core, ASP.NET MVC, Web API, Entity Framework Core, SQL Server, and Angular',
      'Developed full-stack applications with RESTful APIs and Identity authentication',
      'Built responsive UIs using Angular and Bootstrap',
      'Applied SOLID principles, design patterns, and clean architecture in real-world projects',
    ],
  },
  {
    period: '01/2024 – 02/2025',
    role: 'Head of IT Department',
    company: 'Military Service — Hurghada, Egypt',
    achievements: [
      'Led the development and maintenance of WinForms desktop applications',
      'Managed IT infrastructure and technical operations',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold mb-20 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <div className="max-w-5xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, type: 'spring' }}
              className="relative"
            >
              <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-border hover:border-primary/50 transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                    <p className="text-lg text-primary">{exp.company}</p>
                  </div>
                  <div className="text-muted-foreground font-semibold mt-2 md:mt-0">{exp.period}</div>
                </div>

                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                      <span className="text-foreground/90">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Connector line */}
              {index < experiences.length - 1 && (
                <div className="h-12 w-0.5 bg-gradient-to-b from-primary to-accent mx-auto my-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
