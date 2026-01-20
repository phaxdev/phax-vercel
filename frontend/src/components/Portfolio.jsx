import React, { useState, useEffect, useRef } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTelegram, 
  FaEnvelope, 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaWrench,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaExternalLinkAlt,
  FaChevronDown,
  FaRocket,
  FaCrown,
  FaSparkles,
  FaStar,
  FaBolt,
  FaGlobe,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaCloud,
  FaRobot,
  FaMagic
} from 'react-icons/fa';
import { SiTypescript, SiDjango, SiPostgresql, SiRedis, SiGraphql, SiKubernetes } from 'react-icons/si';

// 3D анимация текста
const FloatingText = ({ children, delay = 0 }) => {
  return (
    <span 
      className="inline-block animate-float"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
};

// Анимированные частицы
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Соединяем частицы линиями
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// 3D карточка
const Card3D = ({ children, className = '' }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

// Анимированный прогресс-бар
const AnimatedProgressBar = ({ value, label, icon }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <span className="text-sm font-bold">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-white to-gray-300 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus({
        type: 'success',
        message: '✅ Сообщение отправлено! Скоро свяжусь с вами'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus({
        type: 'error',
        message: '❌ Ошибка отправки. Попробуйте еще раз'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card3D className="border border-gray-800 bg-black/50 backdrop-blur-sm p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <input
            type="text"
            required
            placeholder="Ваше имя"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors group-hover:border-gray-500"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-focus-within:w-full transition-all duration-300"></div>
        </div>

        <div className="relative group">
          <input
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors group-hover:border-gray-500"
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-focus-within:w-full transition-all duration-300"></div>
        </div>

        <div className="relative group">
          <textarea
            required
            placeholder="Ваше сообщение..."
            rows="4"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none group-hover:border-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-white text-black font-bold text-lg tracking-wider hover:bg-gray-200 active:scale-95 transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                ОТПРАВКА...
              </>
            ) : (
              <>
                ОТПРАВИТЬ <FaRocket className="ml-2 animate-pulse" />
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {submitStatus && (
          <div className={`px-4 py-3 text-center animate-fadeIn ${submitStatus.type === 'success' ? 'bg-white/10 border border-white' : 'bg-red-500/10 border border-red-500'}`}>
            {submitStatus.message}
          </div>
        )}
      </form>
    </Card3D>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Технологии стек
  const techStack = [
    { icon: <FaReact />, name: 'React', level: 95 },
    { icon: <SiTypescript />, name: 'TypeScript', level: 90 },
    { icon: <FaNodeJs />, name: 'Node.js', level: 88 },
    { icon: <FaPython />, name: 'Python', level: 85 },
    { icon: <SiDjango />, name: 'Django', level: 82 },
    { icon: <SiPostgresql />, name: 'PostgreSQL', level: 80 },
    { icon: <FaAws />, name: 'AWS', level: 75 },
    { icon: <SiKubernetes />, name: 'Kubernetes', level: 70 },
  ];

  const projects = [
    {
      title: 'AI Analytics Platform',
      description: 'Масштабируемая платформа для анализа данных с ML',
      tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
      year: '2024'
    },
    {
      title: 'Blockchain Dashboard',
      description: 'Дашборд для мониторинга транзакций в реальном времени',
      tech: ['Next.js', 'Node.js', 'Web3', 'Redis'],
      year: '2024'
    },
    {
      title: 'E-commerce Microservices',
      description: 'Архитектура микросервисов для высокой нагрузки',
      tech: ['React', 'NestJS', 'MongoDB', 'RabbitMQ'],
      year: '2023'
    },
  ];

  const stats = [
    { value: '50+', label: 'Проектов', icon: <FaCode /> },
    { value: '3+', label: 'Лет опыта', icon: <FaCrown /> },
    { value: '99%', label: 'Удовлетворенных клиентов', icon: <FaStar /> },
    { value: '24/7', label: 'Поддержка', icon: <FaShieldAlt /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* SEO метаданные */}
      <head>
        <title>Senior Full Stack Developer | Современные Web-решения</title>
        <meta name="description" content="Создаю высоконагруженные веб-приложения с использованием React, Node.js, Python и облачных технологий. Проекты под ключ с гарантией качества." />
        <meta name="keywords" content="fullstack разработчик, React, Node.js, Python, веб-разработка, SEO оптимизация, высоконагруженные системы" />
        <meta property="og:title" content="Senior Full Stack Developer" />
        <meta property="og:description" content="Профессиональная веб-разработка с фокусом на производительность и SEO" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com" />
      </head>

      {/* Анимированный фон */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900"></div>
      </div>

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FaCode className="text-black text-xl" />
              </div>
              <span className="text-xl font-bold tracking-wider">DEV<span className="text-gray-400">.PRO</span></span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {section === 'home' ? 'Главная' :
                   section === 'about' ? 'Обо мне' :
                   section === 'projects' ? 'Проекты' :
                   section === 'skills' ? 'Навыки' :
                   section === 'experience' ? 'Опыт' : 'Контакты'}
                  {activeSection === section && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-white text-black font-bold text-sm tracking-wider hover:bg-gray-200 active:scale-95 transition-all duration-300"
            >
              НАЧАТЬ ПРОЕКТ
            </button>
          </div>
        </div>
      </nav>

      {/* Герой секция */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 border border-white/30 rounded-full animate-pulse">
            <FaSparkles />
            <span className="text-sm">ДОСТУПЕН ДЛЯ КРУПНЫХ ПРОЕКТОВ</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            <span className="block">
              <FloatingText delay={0.1}>СОЗДАЮ</FloatingText>
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              <FloatingText delay={0.2}>БУДУЩЕЕ</FloatingText>
            </span>
            <span className="block">
              <FloatingText delay={0.3}>ВЕБА</FloatingText>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Full Stack Developer специализируюсь на создании 
            <span className="text-white font-bold"> высоконагруженных систем </span>
            с фокусом на 
            <span className="text-white font-bold"> производительность </span>
            и 
            <span className="text-white font-bold"> SEO</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white text-black font-bold text-lg tracking-wider hover:bg-gray-200 active:scale-95 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">ОБСУДИТЬ ПРОЕКТ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg tracking-wider hover:bg-white/10 active:scale-95 transition-all duration-300"
            >
              ПОСМОТРЕТЬ РАБОТЫ
            </button>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card3D key={index} className="border border-gray-800 bg-black/50 p-6">
                <div className="text-3xl font-bold mb-2 flex items-center justify-center">
                  {stat.icon}
                  <span className="ml-2">{stat.value}</span>
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </Card3D>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaChevronDown className="text-white text-2xl" />
          </div>
        </div>
      </section>

      {/* Технологии */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black tracking-tighter mb-6">
              ТЕХНОЛОГИЧЕСКИЙ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">СТЕК</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Использую современные технологии для создания масштабируемых и производительных решений
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {techStack.map((tech, index) => (
              <Card3D key={index} className="border border-gray-800 bg-black/50 p-6">
                <AnimatedProgressBar 
                  value={tech.level}
                  label={tech.name}
                  icon={<span className="text-xl">{tech.icon}</span>}
                />
              </Card3D>
            ))}
          </div>

          {/* Дополнительные технологии */}
          <div className="text-center">
            <div className="inline-flex flex-wrap justify-center gap-6 p-6 border border-gray-800 rounded-2xl">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg">
                <FaDocker />
                <span>Docker</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg">
                <SiRedis />
                <span>Redis</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg">
                <SiGraphql />
                <span>GraphQL</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg">
                <FaMobileAlt />
                <span>PWA</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg">
                <FaChartLine />
                <span>Analytics</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-900/50 rounded-lg">
                <FaRobot />
                <span>AI/ML</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Проекты */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black tracking-tighter mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ПРЕМИУМ</span> ПРОЕКТЫ
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Реальные кейсы с измеримыми результатами и прозрачной аналитикой
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <Card3D key={index} className="group border border-gray-800 bg-black/50 overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">{project.year}</div>
                      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    </div>
                    <FaExternalLinkAlt className="text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 border border-gray-800 text-xs rounded-full hover:border-white transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="text-sm font-medium hover:text-white transition-colors">
                      Подробнее →
                    </button>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-5xl font-black tracking-tighter mb-6">
                  ГОТОВЫ К <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ПРОРЫВУ</span>?
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Обсудим ваш проект и создадим решение, которое превзойдет ожидания
                </p>

                <div className="space-y-6 mb-8">
                  <a href="mailto:contact@devpro.com" className="flex items-center space-x-4 p-4 border border-gray-800 hover:border-white transition-colors group">
                    <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg group-hover:bg-white/20">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">contact@devpro.com</div>
                    </div>
                  </a>

                  <a href="https://t.me/devpro" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 border border-gray-800 hover:border-white transition-colors group">
                    <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg group-hover:bg-white/20">
                      <FaTelegram className="text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Telegram</div>
                      <div className="font-medium">@devpro</div>
                    </div>
                  </a>
                </div>

                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-800 hover:border-white transition-colors">
                    <FaGithub className="text-xl" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-800 hover:border-white transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t border-gray-800 py-12 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <FaCode className="text-black text-xl" />
              </div>
              <div>
                <div className="text-xl font-bold">DEV.PRO</div>
                <div className="text-sm text-gray-500">Premium Web Development</div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm text-gray-500 mb-2">
                © {new Date().getFullYear()} Все права защищены
              </div>
              <div className="flex items-center justify-center md:justify-end space-x-2 text-sm">
                <FaMagic className="animate-pulse" />
                <span className="text-gray-400">Сделано с магией кода</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Скролл вверх */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-40"
      >
        <FaChevronDown className="rotate-180" />
      </button>

      {/* CSS анимации */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        /* Стили для SEO контента */
        .seo-content {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
          opacity: 0;
        }
      `}</style>

      {/* Скрытый SEO-контент */}
      <div className="seo-content">
        <h1>Full Stack Developer Москва Санкт-Петербург удаленная работа</h1>
        <h2>Веб-разработчик React Node.js Python Django создание сайтов</h2>
        <p>
          Профессиональный Full Stack разработчик с опытом создания высоконагруженных веб-приложений.
          Специализация: React, Next.js, Node.js, Python, Django, PostgreSQL, MongoDB, AWS, Docker.
          Разработка с нуля, оптимизация производительности, SEO продвижение, мобильная адаптация.
          Работаю с крупными проектами, стартапами и корпоративными клиентами.
        </p>
        <ul>
          <li>Создание современных веб-приложений</li>
          <li>Разработка API и микросервисной архитектуры</li>
          <li>Оптимизация скорости загрузки и SEO</li>
          <li>Интеграция платежных систем и аналитики</li>
          <li>Техническая поддержка и развитие проектов</li>
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;