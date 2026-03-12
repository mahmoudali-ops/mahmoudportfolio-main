import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import proj3 from '@/assets/proj3.png';
import proj4 from '@/assets/proj4.png';
import proj5 from '@/assets/proj5.png';
import proj6 from '@/assets/proj6.png';
import proj7 from '@/assets/proj7.png';
import proj8 from '@/assets/proj8.png';
import proj9 from '@/assets/proj9.jpg';
import proj10 from '@/assets/proj10.jpg';
import proj11 from '@/assets/proj11.png';
import proj12 from '@/assets/proj12.png';
import proj13 from '@/assets/proj13.png';
import proj14 from '@/assets/proj14.png';

type Category = 'fullstack' | 'frontend' | 'backend' | 'desktop';

const categories: { key: Category; label: string }[] = [
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'desktop', label: 'Desktop' },
];

const projects: {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  gradient: string;
  category: Category;
  image: string;
  link: string;
}[] = [

  {
    title: 'TopPicks Travels – Tourism Management Platform',
    description: 'Full-featured booking system with SSR, multilingual support, and Redis caching for optimal performance.',
    tech: ['ASP.NET Core Web API', 'Angular 17 SSR', 'Redis', 'JWT', 'SQL Server'],
    features: ['Booking System', 'Multilingual Content', 'Redis Caching', 'SEO Optimized', 'Admin Dashboard'],
    gradient: 'from-primary to-accent',
    category: 'fullstack',
    image: proj4,
    link: 'https://www.toppickstravels.com/home',
  },
  {
    title: ' BbeSocial – Customer Service Platform (Production Project) Customer Service Platform',
    description: 'Enterprise-grade platform with role-based authorization and dynamic service management.',
    tech: ['ASP.NET Core', 'Angular', 'Redis', 'SQL Server', 'SignalR'],
    features: ['Role-based Auth', 'Dynamic Services', 'Server Pagination', 'Multilingual', 'Real-time Updates'],
    gradient: 'from-accent to-secondary',
    category: 'fullstack',
    image: proj5,
    link: 'https://www.bbesocial.com/home',
  },
  {
    title: 'Online Shopping (E-commerce Project) | Self study',
    description: 'Complete online store with payment processing, order management, and analytics.',
    tech: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'Stripe', 'Identity'],
    features: ['Shopping Cart', 'Order Management', 'Stripe Payments', 'Refunds', 'Sales Analytics'],
    gradient: 'from-primary via-accent to-secondary',
    category: 'fullstack',
    image: proj6,
    link: 'https://github.com/mahmoudali-ops/MyShop-E-Commerce_ASP.NET-Core-MVC',
  },
  {
    title: 'SharkWorlds – Marine Tours & Diving Experiences',
    description: 'Modern tourism platform for booking marine adventures, diving trips, and Red Sea excursions with a fast and SEO-friendly architecture.',
    tech: ['ASP.NET Core Web API', 'Angular 17', 'JWT Authentication', 'SQL Server', 'Cloud Hosting'],
    features: ['Online Tour Booking', 'Diving & Snorkeling Packages', 'Responsive Travel UI', 'Dynamic Tour Listings', 'Admin Tour Management'],
    gradient: 'from-primary to-accent',
    category: 'fullstack',
    image: proj7,
    link: 'https://www.sharkworlds.de/home',
  },

  {
    title: 'Souk E-Commerce Platform',
    description: 'Modern e-commerce platform frontend built with Angular featuring product browsing, cart management, and responsive UI.',
    tech: ['Angular', 'TypeScript', 'Bootstrap', 'REST API', 'RxJS'],
    features: ['Product Listing & Details', 'Shopping Cart Management', 'User Authentication UI', 'Responsive Design', 'API Integration'],
    gradient: 'from-accent to-primary',
    category: 'frontend',
    image: proj14,
    link: 'https://welcome-your-wishes.lovable.app/',
  },
  {
    title: 'Skyline Tourism Website',
    description: 'Multilingual tourism website with modern UI and booking request forms, designed to showcase travel packages and destinations.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'i18n'],
    features: ['Multilingual Support (Arabic / English)', 'Tour Packages & Destination Pages', 'Booking Request Forms', 'Responsive Design', 'Interactive UI'],
    gradient: 'from-primary to-accent',
    category: 'frontend',
    image: proj12,
    link: 'https://www.skylineeg.net/',
  },
  {
    title: 'Coral Fun Travel Website',
    description: 'Tourism and excursions website showcasing Egypt tours, safari trips, and sea activities with booking request forms.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Form Validation'],
    features: ['Tours & Excursions Listing', 'Booking Request Forms', 'Responsive Travel UI', 'Destination & Trip Pages', 'Interactive UI Components'],
    gradient: 'from-primary to-accent',
    category: 'frontend',
    image: proj11,
    link: 'https://coralfuntravel.com/',
  },
  {
    title: 'Next Step Solutions Website',
    description: 'Corporate customer service website presenting company services, solutions, and client communication features.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Form Validation'],
    features: ['Corporate Services Pages', 'Customer Contact Forms', 'Responsive Business UI', 'Service & Company Information Sections', 'Interactive UI Components'],
    gradient: 'from-accent to-primary',
    category: 'frontend',
    image: proj13,
    link: 'https://www.next-stepsolutions.com/',
  },
  {
    title: 'Student Grades Management & Control System',
    description: 'Academic management system for handling grades lifecycle, automated calculations, Excel import validation, and report generation.',
    tech: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'EPPlus'],
    features: ['Automated GPA & degree calculations', 'Excel import with validation rules', 'Promotion & second-chance workflow', 'PDF report generation', 'Structured database design'],
    gradient: 'from-secondary to-primary',
    category: 'fullstack',
    image: proj3,
    link: 'http://controlsystemiti.runasp.net/',
  },
  {
    title: 'RESTful API Gateway',
    description: 'Scalable API gateway with authentication, rate limiting, and centralized logging.',
    tech: ['ASP.NET Core Web API', 'Redis', 'JWT', 'Serilog', 'Docker'],
    features: ['Rate Limiting', 'JWT Auth', 'Centralized Logging', 'Caching', 'API Versioning'],
    gradient: 'from-primary to-secondary',
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    link: 'https://github.com/mahmoud-ali/api-gateway',
  },
  {
    title: 'RedSea Tours – German Travel & Excursion Platform',
    description: 'Tourism platform designed for German travelers visiting the Red Sea, offering excursion booking, tour details, and a seamless multilingual experience.',
    tech: ['ASP.NET Core Web API', 'Angular', 'JWT Authentication', 'SQL Server', 'Responsive UI'],
    features: ['German-Focused Travel Content', 'Excursion Booking System', 'Tour Packages & Activity Listings', 'Mobile-Friendly Travel Interface', 'Admin Panel for Tour Management'],
    gradient: 'from-primary to-accent',
    category: 'fullstack',
    image: proj8,
    link: 'https://www.redsea-tours.com/home',
  },
  {
    title: 'Examination Management System – Backend API',
    description: 'Backend system designed to manage examination workflows, focusing on structured database design, optimized queries, and efficient data access.',
    tech: ['.NET Core Web API', 'Entity Framework Core', 'SQL Server'],
    features: ['Relational Database Modeling', 'Exam & Question Management APIs', 'Query Optimization for Large Datasets', 'Efficient Data Access with Entity Framework', 'Structured Examination Workflow'],
    gradient: 'from-primary to-accent',
    category: 'backend',
    image: proj9,
    link: '#',
  },
  {
    title: 'Bookstore Inventory Management System – Desktop Application',
    description: 'Desktop-based inventory and sales management system for bookstores, designed with a structured relational database and efficient reporting features.',
    tech: ['C#', 'WinForms', 'Entity Framework', 'SQL Server'],
    features: ['CRUD Operations for Book Inventory', 'Advanced Search & Filtering', 'Sales Tracking & Transaction Records', 'Inventory Stock Management', 'Sales Reports & Data Insights'],
    gradient: 'from-primary to-accent',
    category: 'desktop',
    image: proj10,
    link: 'https://github.com/Abd-Elghany/Stationery_Store',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState<Category>('fullstack');

  const filtered = projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shrink-0 ${
                active === cat.key
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                  : 'bg-card/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {filtered.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="block"
            >
              <Card className="h-full bg-card/50 backdrop-blur-xl border-2 border-border hover:border-primary/50 transition-all group overflow-hidden cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pt-6">
                  <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${project.gradient} mb-4`} />
                  <CardTitle className="text-3xl mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <Badge key={t} className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:from-primary/30 hover:to-accent/30 text-foreground font-medium">
                          {t}
                        </Badge>
                      ))}
                    </div>        </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-foreground">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center gap-2 text-foreground/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
          </div>

        </div>
    </section>
  );
}
