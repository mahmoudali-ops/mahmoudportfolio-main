import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineItems = [
  {
    year: '08/2025 – Present',
    title: 'Part-Time Full-Stack .NET Developer',
    description: 'Building professional web solutions to help businesses grow and succeed online. Designing and developing modern, responsive, and SEO-friendly websites.',
  },
  {
    year: '03/2025 – 07/2025',
    title: 'Full Stack .NET Trainee',
    description: 'Trained in .NET Core, ASP.NET MVC, Web API, Entity Framework Core, SQL Server, and Angular. Developed full-stack applications with RESTful APIs.',
  },
  {
    year: '01/2024 – 02/2025',
    title: 'Head of IT Department',
    description: 'Led the development and maintenance of WinForms desktop applications. Managed IT infrastructure and technical operations.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="max-w-4xl mx-auto mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-xl text-foreground/90 leading-relaxed mb-6"
            >
              A Full-Stack .NET Developer specialized in building scalable, production-ready web applications using modern technologies and architectural patterns. 
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-xl text-foreground/90 leading-relaxed"
            >
              With deep expertise in ASP.NET Core, Entity Framework, and Angular, I create systems that prioritize clean code, performance, and maintainability. I bring strong knowledge of Clean Architecture, SOLID principles, and domain-driven design.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line - left on mobile, center on desktop */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-secondary" />

            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px', amount: 0.3 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 100,
                  damping: 18,
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative mb-12 md:mb-16"
              >
                {/* Mobile: single column, content right of line | Desktop: alternating */}
                <div
                  className={`relative pl-12 md:pl-0 ${
                    index % 2 === 0
                      ? 'md:pr-[52%] md:text-right'
                      : 'md:pl-[52%] md:text-left'
                  }`}
                >
                  <div
                    className={`p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-border hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(120,50,255,0.15)] transition-all duration-300 w-full ${
                      index % 2 === 0 ? 'md:mr-14' : 'md:ml-14'
                    }`}
                  >
                    <div className="text-primary font-bold text-base sm:text-lg mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute top-6 sm:top-8 left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/50 z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
