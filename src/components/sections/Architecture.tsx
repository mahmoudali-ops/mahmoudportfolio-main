import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const architectureKnowledge = [
  {
    title: 'Clean Architecture',
    description: 'Implementing layered architecture with clear separation of concerns, dependency inversion, and independent testability.',
    principles: ['Dependency Rule', 'Use Cases', 'Entity Layer', 'Interface Adapters'],
  },
  {
    title: 'CQRS Pattern',
    description: 'Separating read and write operations using MediatR for scalable and maintainable command/query handling.',
    principles: ['Command Handlers', 'Query Handlers', 'Event Sourcing', 'MediatR Pipeline'],
  },
  {
    title: 'Design Patterns',
    description: 'Applying proven software design patterns to solve common architectural challenges.',
    principles: ['Repository Pattern', 'Unit of Work', 'Factory Pattern', 'Strategy Pattern'],
  },
  {
    title: 'SOLID Principles',
    description: 'Building maintainable code following object-oriented design principles.',
    principles: ['Single Responsibility', 'Open/Closed', 'Liskov Substitution', 'Dependency Inversion'],
  },
];

export default function Architecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold mb-20 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Architecture & Design
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {architectureKnowledge.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ delay: index * 0.15, type: 'spring' }}
              whileHover={{ scale: 1.03, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-xl border-2 border-border hover:border-accent/50 transition-all">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/50">
                    <span className="text-3xl">🏛️</span>
                  </div>
                  <CardTitle className="text-2xl">{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {item.principles.map((principle) => (
                      <motion.div
                        key={principle}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm text-center"
                      >
                        {principle}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
