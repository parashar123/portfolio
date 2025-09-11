import { motion } from 'framer-motion'
import { 
  Code, 
  Users, 
  TrendingUp, 
  Award, 
  Brain, 
  Zap, 
  Target, 
  Database,
  Cloud,
  Layers,
  GitBranch,
  Rocket,
  Shield,
  BarChart3,
  Globe,
  Smartphone,
  Building,
  MapPin,
  Calendar
} from 'lucide-react'

type ExperienceItem = {
  title: string
  company: string
  location: string
  duration: string
  type: 'full-time' | 'freelance' | 'startup' | 'consulting'
  bullets: string[]
  achievements: string[]
  technologies: string[]
}

type SkillCategory = {
  category: string
  icon: any
  skills: string[]
  color: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Freelance Full-Stack Engineer & Technical Lead',
    company: 'Independent Consulting',
    location: 'Remote',
    duration: 'Dec 2024 - Present',
    type: 'freelance',
    bullets: [
      'Delivered high-complexity projects for diverse clients, combining frontend expertise with strong backend and architecture skills',
      'Designed and implemented high-throughput microservices in Golang, handling millions of API calls/day with <200ms latency',
      'Architected service mesh using Kubernetes, gRPC, and Redis caching for zero downtime deployments',
      'Built secure REST & GraphQL APIs for seamless integration with frontend applications',
      'Delivered complex React + Next.js applications with server-side rendering and micro frontend architecture',
      'Led development of multi-module analytics and automation platform combining Angular with Python AI/ML services'
    ],
    achievements: [
      'Handled millions of API calls/day with <200ms latency',
      'Built 6 independent AI modules (customer insights, lead scoring, document processing, sentiment analysis, sales forecasting, intelligent alerts)',
      'Implemented traffic spike handling without performance drops',
      'Delivered end-to-end monitoring and retraining workflows for ML pipelines'
    ],
    technologies: ['Golang', 'Python', 'React', 'Next.js', 'Angular', 'Kubernetes', 'gRPC', 'Redis', 'GraphQL', 'TensorFlow', 'scikit-learn', 'NLP']
  },
  {
    title: 'Engineering Manager | Staff Engineer L2',
    company: 'eSIM Technology Solutions',
    location: 'Bengaluru, India',
    duration: 'Sep 2024 - Dec 2024',
    type: 'full-time',
    bullets: [
      'Led engineering teams in developing cutting-edge eSIM solutions for B2C, B2B, and B2B2C markets',
      'Architected connectivity solutions for global enterprises, IoT devices, and telecom providers',
      'Managed cross-functional teams delivering scalable connectivity platforms',
      'Implemented secure, scalable solutions serving millions of users globally'
    ],
    achievements: [
      'Scaled connectivity solutions across multiple market segments',
      'Delivered enterprise-grade security and scalability requirements',
      'Led teams in building solutions for global deployment'
    ],
    technologies: ['Flutter', 'Dart', 'Django', 'Python', 'Angular', 'eSIM', 'IoT', 'Telecom']
  },
  {
    title: 'Founder & CTO',
    company: 'CodePitamah - AI Code Analysis Platform',
    location: 'Remote',
    duration: 'Mar 2024 - Aug 2024',
    type: 'startup',
    bullets: [
      'Conceptualized and architected CodePitamah.ai, an intelligent on-premise tool for code comprehension and documentation',
      'Conducted extensive research on deep learning and NLP models for automated documentation generation',
      'Designed and developed MVP featuring code parsing, intelligent documentation generation, and IDE integration',
      'Implemented foundational AI components for detecting code smells, vulnerabilities, and performance bottlenecks',
      'Built prototypes demonstrating real-time collaboration within popular IDEs and Git integration',
      'Developed offline-first architecture prioritizing security and data privacy'
    ],
    achievements: [
      'Achieved 40-50% MVP completion with full AI pipeline',
      'Built prototypes for VS Code and IntelliJ IDEA integration',
      'Implemented real-time collaboration features',
      'Created offline-first architecture for enterprise security'
    ],
    technologies: ['Python', 'Node.js', 'TensorFlow', 'PyTorch', 'NLP', 'VS Code Extension', 'IntelliJ Plugin', 'Git Integration']
  },
  {
    title: 'Staff Engineer | Full Stack | .NET | Angular | React | AWS',
    company: 'Dental Practice Management Platform',
    location: 'Remote',
    duration: 'Jun 2023 - Feb 2024',
    type: 'full-time',
    bullets: [
      'Led a team of 6 developers to deliver the PHMR Project 15% ahead of schedule and within budget',
      'Contributed 55% of the overall development efforts using C#, .NET Core, Angular, and SQL Server',
      'Architected the PHMR project focusing on calculating KPIs for Customer Success Management',
      'Implemented background jobs to calculate KPIs daily for 700 practices with ETL cron jobs',
      'Managed another team of 9 professionals in the Analytics department',
      'Achieved average project delivery improvement of 20%'
    ],
    achievements: [
      'Improved performance by 25% using Redis and Memcached caching',
      'Delivered project 15% ahead of schedule',
      'Achieved 20% improvement in project delivery across analytics department',
      'Scaled KPI calculations for 700+ practices'
    ],
    technologies: ['C#', '.NET Core', 'Angular', 'React', 'SQL Server', 'Redis', 'Memcached', 'AWS', 'Azure', 'Kubernetes', 'GraphQL', 'Node.js']
  },
  {
    title: 'SDE II (Squad Lead) | Full Stack | .NET | Angular | React | AZURE',
    company: 'Dental Practice Management Platform',
    location: 'Remote',
    duration: 'Jan 2023 - May 2023',
    type: 'full-time',
    bullets: [
      'Addressed intricate memory leak issues by implementing rigorous memory management practices',
      'Identified and fixed memory leaks, optimized garbage collection, and improved overall application performance',
      'Resolved over 600 bugs in just 2 weeks',
      'Led system design and architecture improvements',
      'Implemented optimization strategies ensuring stability and efficiency'
    ],
    achievements: [
      'Improved application performance by 35%',
      'Resolved 600+ bugs in 2 weeks',
      'Implemented comprehensive memory management solutions',
      'Achieved significant stability improvements'
    ],
    technologies: ['.NET Framework', 'C#', 'ASP.NET Core', 'Angular', 'React', 'Azure', 'Kubernetes', 'Microservices', 'System Design']
  },
  {
    title: 'Senior Software Engineer | Full Stack | .NET | Angular | React | AWS',
    company: 'Digital Solutions Provider',
    location: 'Hybrid',
    duration: 'Mar 2021 - Oct 2022',
    type: 'full-time',
    bullets: [
      'Managed a team of front-end and back-end developers, guiding high-quality technical solutions',
      'Made critical technical decisions and ensured seamless communication with clients and stakeholders',
      'Actively participated in recruitment process and served as mentor for .NET interns',
      'Developed admin dashboard using ReactJS and ReCharts for visualizing speech-to-text transcriptions',
      'Developed call management app using Twilio API leading to 35% increase in call handling efficiency',
      'Developed RESTful APIs and microservices using Golang with concurrent processing',
      'Streamlined CI/CD process using Azure pipelines, Docker, and Kubernetes'
    ],
    achievements: [
      'Improved transcription accuracy by 30%',
      'Increased call handling efficiency by 35%',
      'Successfully mentored .NET interns',
      'Implemented efficient CI/CD processes'
    ],
    technologies: ['React.js', 'Angular', 'C#', '.NET Core', 'Golang', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'Twilio', 'ReCharts', 'GraphQL', 'Node.js']
  },
  {
    title: 'Senior Software Engineer | Full Stack | .NET | Angular | React | AWS',
    company: 'Financial Technology Solutions',
    location: 'Hybrid',
    duration: 'Dec 2019 - Mar 2021',
    type: 'full-time',
    bullets: [
      'Implemented windows to web application static data conversion using MVC architecture',
      'Created and consumed APIs, WCF, and Web Services with .NET, C#, and Go for Ambit Asset Finance',
      'Worked with containerization technologies like Docker to deploy Golang applications',
      'Implemented caching strategies and utilized Message Queuing (MQ) and SignalR for notification service',
      'Planned notification service utilizing MQ and Signal-R for streamlined communication'
    ],
    achievements: [
      'Improved message delivery efficiency by 50%',
      'Revamped user engagement across the platform',
      'Successfully migrated from Windows to web applications',
      'Implemented scalable containerized deployments'
    ],
    technologies: ['.NET Framework', 'C#', 'ASP.NET Core', 'Angular', 'React', 'Golang', 'Docker', 'SignalR', 'Message Queuing', 'Azure', 'Kubernetes']
  },
  {
    title: 'Software Engineer | Full Stack | .NET | Angular | React | AWS',
    company: 'Enterprise Software Solutions',
    location: 'Bangalore',
    duration: 'Apr 2019 - Oct 2019',
    type: 'full-time',
    bullets: [
      'Gained experience in backbone.js and MVP architecture',
      'Managed database interactions using Golang\'s GORM for ORM and database migrations',
      'Utilized testing frameworks for unit and integration testing',
      'Applied Go\'s concurrency model to handle high-throughput applications efficiently',
      'Conducted in-depth code reviews and assessments for Docstar application'
    ],
    achievements: [
      'Increased overall application stability and performance by 15%',
      'Implemented rigorous testing frameworks',
      'Optimized high-throughput applications using Go concurrency',
      'Ensured adherence to MVP architecture principles'
    ],
    technologies: ['Backbone.js', 'Golang', 'GORM', 'MVP Architecture', '.NET Framework', 'C#', 'ASP.NET Core', 'Angular', 'React', 'Azure', 'Node.js']
  },
  {
    title: 'Associate Software Engineer | Full Stack | .NET | Angular',
    company: 'Global IT Services',
    location: 'Bangalore',
    duration: 'Aug 2016 - Nov 2018',
    type: 'full-time',
    bullets: [
      'Responsible for developing, testing, implementing, and maintaining EPOS applications',
      'Utilized C# with ASP.NET Core and .NET Core frameworks for robust and scalable applications',
      'Analyzed and prepared daily reports, performed trend analysis using SSIS, SSRS',
      'Managed comprehensive testing and debugging of EPOS applications using AJAX and .NET Framework',
      'Developed CRM project using ASP.NET Core, Entity Framework, and ODATA as replacement for Goldmine system',
      'Managed build releases using Jenkins and prepared release documents'
    ],
    achievements: [
      'Decreased bug reports by 50% post-launch through comprehensive testing',
      'Successfully developed and deployed CRM replacement system',
      'Implemented efficient build and release processes',
      'Delivered reliable EPOS applications'
    ],
    technologies: ['C#', 'ASP.NET', 'ASP.NET Core', '.NET Framework', '.NET Core', 'Angular', 'AJAX', 'SQL Server', 'WCF', 'MVC', 'Entity Framework', 'ODATA', 'Jenkins', 'SSIS', 'SSRS']
  }
]

const skillCategories: SkillCategory[] = [
  {
    category: 'Backend Development',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: ['ASP.NET', 'C#', 'WPF', 'WCF', 'ASP.NET Core', 'Python', 'Django', 'ADO.NET', 'Golang', 'Node.js', 'Java', 'WCF', 'Web Services']
  },
  {
    category: 'Frontend Development',
    icon: Globe,
    color: 'from-green-500 to-emerald-500',
    skills: ['ReactJS', 'Angular', 'HTML', 'JavaScript', 'CSS', 'Next.js', 'Redux', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Mobile Development',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    skills: ['Flutter', 'Dart', 'Kotlin', 'React Native', 'Mobile UI/UX']
  },
  {
    category: 'Database & Storage',
    icon: Database,
    color: 'from-orange-500 to-red-500',
    skills: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Cassandra', 'Redis', 'Entity Framework', 'GORM']
  },
  {
    category: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-indigo-500 to-purple-500',
    skills: ['AWS Lambda', 'EC2', 'Azure Cloud Services', 'Kubernetes', 'Docker', 'Jenkins', 'ArgoCD', 'CI/CD', 'GitLab']
  },
  {
    category: 'AI & Machine Learning',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
    skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'NLP', 'Deep Learning', 'ML Pipelines', 'Model Training', 'AI Integration']
  },
  {
    category: 'Architecture & Design',
    icon: Layers,
    color: 'from-yellow-500 to-orange-500',
    skills: ['Microservices', 'System Design', 'SOLID Principles', 'Clean Architecture', 'CQRS', 'Domain-Driven Design', 'Event-Driven Architecture']
  },
  {
    category: 'Leadership & Management',
    icon: Users,
    color: 'from-teal-500 to-cyan-500',
    skills: ['Team Leadership', 'Project Management', 'Scrum Master', 'Mentoring', 'Technical Decision Making', 'OKRs', 'Agile Development']
  }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'freelance': return 'from-green-500 to-emerald-500'
    case 'full-time': return 'from-blue-500 to-cyan-500'
    case 'startup': return 'from-purple-500 to-pink-500'
    case 'consulting': return 'from-orange-500 to-red-500'
    default: return 'from-gray-500 to-gray-600'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'freelance': return 'Freelance'
    case 'full-time': return 'Full-time'
    case 'startup': return 'Startup'
    case 'consulting': return 'Consulting'
    default: return 'Other'
  }
}

export default function Experience() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(51,65,85,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Professional Experience</span>
            </h1>
            <p className="text-xl sm:text-2xl text-dark-300 max-w-4xl mx-auto leading-relaxed">
              9+ years of building scalable systems, leading teams, and delivering impactful solutions across diverse industries
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              <div className="metric-card text-center">
                <Award size={24} className="text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">9+</div>
                <div className="text-sm text-dark-400">Years Experience</div>
              </div>
              <div className="metric-card text-center">
                <Users size={24} className="text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">15+</div>
                <div className="text-sm text-dark-400">Team Members Led</div>
              </div>
              <div className="metric-card text-center">
                <TrendingUp size={24} className="text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">35%</div>
                <div className="text-sm text-dark-400">Avg. Performance Gain</div>
              </div>
              <div className="metric-card text-center">
                <Zap size={24} className="text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark-100 mb-1">&lt;200ms</div>
                <div className="text-sm text-dark-400">API Response Time</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Career Journey
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              From Associate Engineer to Engineering Manager - A journey of continuous growth and impact
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>
            
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative mb-16 pl-20"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} border-4 border-dark-900 z-10`}></div>
                
                {/* Experience card */}
                <div className="interactive-card p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-dark-100">{exp.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(exp.type)} text-white`}>
                          {getTypeLabel(exp.type)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-dark-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Building size={16} />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Achievements */}
                  {exp.achievements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-primary-400 mb-3 flex items-center gap-2">
                        <Award size={20} />
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 bg-primary-500/10 rounded-lg border border-primary-500/20">
                            <Target size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                            <span className="text-dark-200 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-dark-100 mb-3 flex items-center gap-2">
                      <Code size={20} />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-dark-300">
                          <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-dark-100 mb-3 flex items-center gap-2">
                      <Layers size={20} />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-dark-700 text-dark-200 rounded-full text-sm border border-dark-600 hover:border-primary-500/50 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-100 mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Comprehensive skillset spanning full-stack development, cloud architecture, AI/ML, and leadership
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="interactive-card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dark-100 mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                      <span className="text-dark-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Learning Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Community Impact & Continuous Learning
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Sharing knowledge with the tech community and continuously evolving with new technologies
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain size={24} />
                  Knowledge Sharing
                </h3>
                <ul className="space-y-2 text-primary-100">
                  <li>• Creating content that simplifies complex technical concepts</li>
                  <li>• Sharing best practices and insights from 9+ years of experience</li>
                  <li>• Active on Telegram: <span className="text-white font-medium">@practicalGuru</span></li>
                  <li>• Regular contributions to the developer community</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Rocket size={24} />
                  Learning Philosophy
                </h3>
                <ul className="space-y-2 text-primary-100">
                  <li>• "30 minutes daily learning for 14 days" methodology</li>
                  <li>• Continuous exploration of emerging technologies</li>
                  <li>• Hands-on experimentation with new frameworks</li>
                  <li>• Cross-industry knowledge transfer and adaptation</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


