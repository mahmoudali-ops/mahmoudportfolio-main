import { motion } from 'framer-motion';
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

  return (
    <section id="experience" className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 sm:mb-16 md:mb-20 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px', amount: 0.2 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                type: 'spring',
                stiffness: 90,
                damping: 18,
              }}
              className="relative"
            >
              <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/5">
                <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-primary">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-muted-foreground font-semibold text-sm sm:text-base shrink-0">
                    {exp.period}
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <span className="mt-1.5 sm:mt-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                      <span className="text-foreground/90 text-sm sm:text-base">
                        {achievement}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Connector line */}
              {index < experiences.length - 1 && (
                <div className="h-8 sm:h-10 md:h-12 w-0.5 bg-gradient-to-b from-primary to-accent mx-auto my-3 sm:my-4 opacity-80" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
