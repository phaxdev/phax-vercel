import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import background1 from './background1.png';
import background2 from './background2.png';
import background3 from './background3.png';
import background4 from './background4.png';
import background5 from './background5.png';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        if (errors[name]) setErrors({...errors, [name]: ''});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Введите свой @username или номер';
        if (!formData.email.trim()) newErrors.email = 'Введите email';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Введите корректный email';
        if (!formData.message.trim()) newErrors.message = 'Введите сообщение';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
            const response = await fetch(`${API_URL}/contact-messages/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                setSubmitStatus({type: 'success', message: 'Сообщение отправлено'});
                setFormData({name: '', email: '', message: ''});
                setTimeout(() => setSubmitStatus(null), 5000);
            } else throw new Error('Ошибка отправки');
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            setSubmitStatus({type: 'error', message: 'Произошла ошибка при отправке'});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
                <div>
                    <input type="text" name="name" placeholder="ИМЯ / USERNAME" value={formData.name} onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-neutral-800'} focus:outline-none focus:border-neutral-600 transition-colors text-white placeholder-neutral-600 text-sm tracking-widest uppercase`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.name}</p>}
                </div>
                <div>
                    <input type="email" name="email" placeholder="EMAIL" value={formData.email} onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-neutral-800'} focus:outline-none focus:border-neutral-600 transition-colors text-white placeholder-neutral-600 text-sm tracking-widest uppercase`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.email}</p>}
                </div>
                <div>
                    <textarea name="message" placeholder="СООБЩЕНИЕ" rows="6" value={formData.message} onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.message ? 'border-red-500' : 'border-neutral-800'} focus:outline-none focus:border-neutral-600 transition-colors text-white placeholder-neutral-600 resize-none text-sm tracking-widest uppercase`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.message}</p>}
                </div>
                {submitStatus && (
                    <div className={`p-4 text-center text-sm tracking-wide ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {submitStatus.message}
                    </div>
                )}
                <button onClick={handleSubmit} disabled={isSubmitting}
                    className={`w-full py-5 border-2 border-white text-white text-sm tracking-widest uppercase transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'}`}
                >
                    {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                </button>
            </div>
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-white animate-spin-slow origin-center"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
    </div>
);

const CodeIconAnimation = () => (
    <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute top-1/2 left-1/4 text-3xl text-white animate-bounce">{'{'}</div>
        <div className="absolute top-1/2 right-1/4 text-3xl text-white animate-bounce" style={{animationDelay: '0.5s'}}>{'}'}</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-mono">
            <span className="animate-pulse">code</span>
        </div>
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
    </div>
);

const LoadingScreen = ({ apiStatus }) => (
    <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
            <LoadingSpinner />
            <p className="text-white text-sm tracking-widest uppercase mb-4">{apiStatus}</p>
            <p className="text-neutral-600 text-xs">API: Текущий адрес: {window.location.hostname}:{window.location.port}</p>
        </div>
    </div>
);

const HeroSection = ({ profile, safeProjects, safeSkills, safeExperience, handleScroll }) => (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative">
        <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background1})`, filter: 'grayscale(100%) blur(1px)'}}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <CodeIconAnimation />
                <h1 className="text-5xl md:text-7xl font-light tracking-tight animate-fade-in">
                    {profile?.name || 'Разработчик'}
                </h1>
                <p className="text-sm tracking-widest text-neutral-400 uppercase animate-fade-in" style={{animationDelay: '0.2s'}}>
                    {profile?.title || 'Full Stack Developer'}
                </p>
                <div className="flex justify-center gap-16 pt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <div className="text-center"><div className="text-4xl font-light mb-2">{safeProjects.length}</div><div className="text-xs tracking-widest text-neutral-500 uppercase">Проектов</div></div>
                    <div className="text-center"><div className="text-4xl font-light mb-2">{safeExperience.length}</div><div className="text-xs tracking-widest text-neutral-500 uppercase">Года опыта</div></div>
                    <div className="text-center"><div className="text-4xl font-light mb-2">{safeSkills.length}</div><div className="text-xs tracking-widest text-neutral-500 uppercase">Навыков</div></div>
                </div>
                <div className="flex justify-center gap-6 pt-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
                    <button onClick={() => handleScroll('contact')} className="px-10 py-4 border-2 border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">СВЯЗАТЬСЯ</button>
                    <button onClick={() => handleScroll('projects')} className="px-10 py-4 border-2 border-neutral-700 text-neutral-400 text-sm tracking-widest uppercase hover:border-white hover:text-white transition-all duration-300">ПРОЕКТЫ</button>
                </div>
            </div>
        </div>
    </section>
);

const ProjectCard = ({ project, isActive }) => {
    const cardRef = useRef(null);
    useEffect(() => {
        if (cardRef.current && isActive) {
            cardRef.current.classList.add('animate-pulse-once');
            setTimeout(() => cardRef.current?.classList.remove('animate-pulse-once'), 1000);
        }
    }, [isActive]);

    const getTechnologies = () => {
        if (!project) return [];
        if (Array.isArray(project.technologies)) return project.technologies;
        if (Array.isArray(project.technologies_list)) return project.technologies_list;
        if (project.technologies && typeof project.technologies === 'string') return project.technologies.split(',').map(t => t.trim());
        return [];
    };
    const technologies = getTechnologies();

    return (
        <div ref={cardRef} className={`relative bg-gradient-to-br from-black to-neutral-900 border-2 ${isActive ? 'border-white' : 'border-neutral-800'} rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] group`}>
            {isActive && <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>}
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xs tracking-widest text-neutral-500 uppercase">{project.year || new Date().getFullYear()}</span>
                    {isActive && <span className="px-3 py-1 bg-white text-black text-xs tracking-widest rounded-full animate-pulse">ACTIVE</span>}
                </div>
                <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">{project.title || 'Проект без названия'}</h3>
                <p className="text-neutral-400 mb-8 leading-relaxed">{project.short_description || project.description || 'Описание проекта будет добавлено позже'}</p>
                {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {technologies.map((tech, index) => (
                            <span key={index} className="px-4 py-2 border border-neutral-800 rounded-full text-sm tracking-wider hover:border-white hover:bg-white/5 transition-all duration-300">{tech}</span>
                        ))}
                    </div>
                )}
                <div className="flex gap-6">
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-sm tracking-widest uppercase hover:text-white transition-colors group/link"><span className="border-b border-transparent group-hover/link:border-white">GITHUB</span></a>}
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-sm tracking-widest uppercase hover:text-white transition-colors group/link"><span className="border-b border-transparent group-hover/link:border-white">ДЕМО</span></a>}
                </div>
            </div>
        </div>
    );
};

const ProjectsSwiper = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayProjects = Array.isArray(projects) && projects.length > 0 ? projects.map((p, i) => ({
        id: p.id || i, title: p.title || `Проект ${i+1}`, description: p.short_description || p.description || '',
        technologies_list: p.technologies_list || p.technologies || [], year: p.year || new Date().getFullYear(),
        github_url: p.github_url, live_url: p.live_url
    })) : [{ id: 1, title: 'ДОБАВЬТЕ ПРОЕКТЫ', description: 'Используйте админ-панель Django для добавления проектов', technologies_list: ['React', 'Django', 'API'], year: '2024'}];

    useEffect(() => { const interval = setInterval(() => setCurrentIndex(prev => (prev + 1) % displayProjects.length), 5000); return () => clearInterval(interval); }, [displayProjects.length]);
    const handlePrev = () => setCurrentIndex(prev => prev === 0 ? displayProjects.length - 1 : prev - 1);
    const handleNext = () => setCurrentIndex(prev => (prev + 1) % displayProjects.length);
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'ArrowLeft') handlePrev(); if (e.key === 'ArrowRight') handleNext(); };
        window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, displayProjects.length]);

    return (
        <div className="relative">
            <div className="flex justify-center items-center mb-12">
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-light">{String(currentIndex + 1).padStart(2, '0')}</span>
                    <div className="w-32 h-0.5 bg-neutral-800">
                        <motion.div className="h-full bg-white" initial={{width: 0}} animate={{width: `${((currentIndex + 1) / displayProjects.length) * 100}%`}} transition={{duration: 0.5}}/>
                    </div>
                    <span className="text-3xl font-light text-neutral-600">{String(displayProjects.length).padStart(2, '0')}</span>
                </div>
            </div>
            <div className="relative overflow-hidden py-8">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-4xl">
                        <div className="relative z-10 mx-auto" style={{width: '100%'}}>
                            <AnimatePresence mode="wait">
                                <motion.div key={currentIndex} initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: -100, opacity: 0}} transition={{duration: 0.5}}>
                                    <ProjectCard project={displayProjects[currentIndex]} isActive={true}/>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-12 px-4">
                <button onClick={handlePrev} className="w-12 h-12 border-2 border-neutral-800 rounded-full flex items-center justify-center hover:border-white hover:scale-110 transition-all duration-300">←</button>
                <div className="flex gap-2">
                    {displayProjects.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-neutral-600 hover:bg-neutral-400'}`}/>
                    ))}
                </div>
                <button onClick={handleNext} className="w-12 h-12 border-2 border-neutral-800 rounded-full flex items-center justify-center hover:border-white hover:scale-110 transition-all duration-300">→</button>
            </div>
            <div className="text-center mt-8">
                <p className="text-neutral-600 text-xs tracking-widest uppercase">← КЛИК / КЛАВИШИ →</p>
                <p className="text-neutral-700 text-xs mt-2">АВТОПРОКРУТКА КАЖДЫЕ 5С</p>
            </div>
        </div>
    );
};

// Секция "Процесс работы"
const WorkProcess = () => {
    const [activeStep, setActiveStep] = useState(0);
    
    const processSteps = [
        {
            number: '01',
            title: 'КОНСУЛЬТАЦИЯ',
            description: 'Обсуждение проекта, анализ требований, определение сроков и бюджета',
            duration: '1-2 дня',
            icon: '💬'
        },
        {
            number: '02',
            title: 'ПРОТОТИП',
            description: 'Создание wireframes и прототипа для визуализации концепции',
            duration: '3-5 дней',
            icon: '📐'
        },
        {
            number: '03',
            title: 'РАЗРАБОТКА',
            description: 'Поэтапная разработка с регулярными демонстрациями прогресса',
            duration: 'Зависит от проекта',
            icon: '⚡'
        },
        {
            number: '04',
            title: 'ТЕСТИРОВАНИЕ',
            description: 'Всестороннее тестирование и финальные корректировки',
            duration: '3-7 дней',
            icon: '🔍'
        },
        {
            number: '05',
            title: 'ЗАПУСК',
            description: 'Деплой проекта, документация и обучение использованию',
            duration: '1-2 дня',
            icon: '🚀'
        },
        {
            number: '06',
            title: 'ПОДДЕРЖКА',
            description: 'Техническая поддержка и дальнейшее развитие проекта',
            duration: 'Постоянно',
            icon: '🛡️'
        }
    ];

    // Автопереключение шагов
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % processSteps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [processSteps.length]);

    return (
        <section id="process" className="py-32 border-t border-neutral-900 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background4})`, filter: 'grayscale(100%)'}}></div>
            </div>
            
            {/* Анимированные элементы фона */}
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-white/5 to-transparent animate-flow-line"
                        style={{
                            top: `${30 + i * 20}%`,
                            animationDelay: `${i * 1}s`,
                            width: '100%'
                        }}
                    ></div>
                ))}
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-4 text-center">ПРОЦЕСС</h2>
                <p className="text-5xl md:text-7xl font-light tracking-tight text-center mb-12">
                    РАБОТЫ<span className="text-neutral-600">.</span>
                </p>
                <p className="text-neutral-400 text-sm tracking-widest uppercase text-center mb-20 max-w-2xl mx-auto">
                    ОТ ИДЕИ ДО ЗАПУСКА: 6 КЛЮЧЕВЫХ ЭТАПОВ
                </p>
                
                <div className="max-w-6xl mx-auto">
                    {/* Основной процесс - горизонтальный для десктопа, вертикальный для мобильных */}
                    <div className="hidden lg:flex items-center justify-between mb-20 relative">
                        {/* Линия процесса */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 -translate-y-1/2 z-0"></div>
                        
                        {processSteps.map((step, index) => (
                            <div key={step.number} className="relative z-10">
                                <button
                                    onClick={() => setActiveStep(index)}
                                    className={`flex flex-col items-center transition-all duration-500 ${
                                        activeStep === index ? 'scale-110' : 'opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    {/* Шаг */}
                                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-300 ${
                                        activeStep === index 
                                            ? 'border-white bg-white text-black' 
                                            : 'border-neutral-700 bg-black text-white'
                                    }`}>
                                        <span className="text-2xl">{step.icon}</span>
                                    </div>
                                    
                                    {/* Номер шага */}
                                    <div className={`text-xs tracking-widest uppercase mb-2 transition-colors ${
                                        activeStep === index ? 'text-white' : 'text-neutral-500'
                                    }`}>
                                        {step.number}
                                    </div>
                                    
                                    {/* Название шага */}
                                    <h3 className={`text-sm tracking-widest uppercase text-center transition-colors ${
                                        activeStep === index ? 'text-white' : 'text-neutral-400'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    
                                    {/* Соединительная линия */}
                                    {index < processSteps.length - 1 && (
                                        <div className="absolute top-8 left-full w-24 h-0.5 bg-neutral-800 -translate-x-1/2"></div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {/* Мобильная версия - вертикальный список */}
                    <div className="lg:hidden space-y-8 mb-12">
                        {processSteps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {/* Вертикальная линия */}
                                {index < processSteps.length - 1 && (
                                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-neutral-800 -translate-x-1/2"></div>
                                )}
                                
                                <button
                                    onClick={() => setActiveStep(index)}
                                    className={`flex items-start gap-6 w-full p-6 rounded-2xl transition-all duration-300 ${
                                        activeStep === index 
                                            ? 'bg-gradient-to-br from-black to-neutral-900 border-2 border-white' 
                                            : 'border border-neutral-800 hover:border-neutral-600'
                                    }`}
                                >
                                    {/* Иконка */}
                                    <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                        activeStep === index 
                                            ? 'border-white bg-white text-black' 
                                            : 'border-neutral-700 bg-black text-white'
                                    }`}>
                                        <span className="text-2xl">{step.icon}</span>
                                    </div>
                                    
                                    {/* Контент */}
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center gap-4 mb-2">
                                            <span className={`text-sm tracking-widest uppercase ${
                                                activeStep === index ? 'text-white' : 'text-neutral-500'
                                            }`}>
                                                {step.number}
                                            </span>
                                            <h3 className={`text-lg tracking-widest uppercase ${
                                                activeStep === index ? 'text-white' : 'text-white'
                                            }`}>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className={`text-sm mb-3 ${
                                            activeStep === index ? 'text-neutral-300' : 'text-neutral-500'
                                        }`}>
                                            {step.description}
                                        </p>
                                        <div className={`text-xs tracking-widest uppercase ${
                                            activeStep === index ? 'text-neutral-400' : 'text-neutral-600'
                                        }`}>
                                            Длительность: {step.duration}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {/* Детали активного шага (для десктопа) */}
                    <div className="hidden lg:block">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-black to-neutral-900 border-2 border-neutral-800 rounded-3xl p-12"
                        >
                            <div className="grid md:grid-cols-3 gap-12 items-center">
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="text-6xl font-light">{processSteps[activeStep].number}</div>
                                        <div>
                                            <h3 className="text-3xl font-light mb-2">{processSteps[activeStep].title}</h3>
                                            <p className="text-sm tracking-widest text-neutral-500 uppercase">
                                                Этап {activeStep + 1} из {processSteps.length}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                                        {processSteps[activeStep].description}
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div className="px-6 py-3 border border-neutral-800 rounded-full">
                                            <span className="text-sm tracking-widest uppercase">
                                                Длительность: {processSteps[activeStep].duration}
                                            </span>
                                        </div>
                                        <div className="px-6 py-3 border border-neutral-800 rounded-full">
                                            <span className="text-sm tracking-widest uppercase">
                                                Результат: {activeStep === 5 ? 'Поддержка' : 'Следующий этап'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="w-64 h-64 rounded-full border-4 border-white/10 flex items-center justify-center">
                                            <div className="w-48 h-48 rounded-full border-4 border-white/20 flex items-center justify-center">
                                                <div className="w-32 h-32 rounded-full border-4 border-white/30 flex items-center justify-center">
                                                    <span className="text-6xl">{processSteps[activeStep].icon}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Анимированные кольца */}
                                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/5 animate-spin-slow"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-white/5 animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Навигация */}
                        <div className="flex justify-center gap-8 mt-12">
                            <button
                                onClick={() => setActiveStep(prev => prev === 0 ? processSteps.length - 1 : prev - 1)}
                                className="w-12 h-12 border-2 border-neutral-800 rounded-full flex items-center justify-center hover:border-white hover:scale-110 transition-all duration-300"
                            >
                                ←
                            </button>
                            
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-light">
                                    {String(activeStep + 1).padStart(2, '0')}
                                </span>
                                <div className="w-48 h-0.5 bg-neutral-800">
                                    <motion.div
                                        className="h-full bg-white"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <span className="text-2xl font-light text-neutral-600">
                                    {String(processSteps.length).padStart(2, '0')}
                                </span>
                            </div>
                            
                            <button
                                onClick={() => setActiveStep(prev => (prev + 1) % processSteps.length)}
                                className="w-12 h-12 border-2 border-neutral-800 rounded-full flex items-center justify-center hover:border-white hover:scale-110 transition-all duration-300"
                            >
                                →
                            </button>
                        </div>
                    </div>
                    
                    {/* Статистика процесса */}
                    <div className="mt-20 pt-20 border-t border-neutral-900">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-8 border border-neutral-800 rounded-3xl">
                                <div className="text-5xl font-light mb-4">100%</div>
                                <h4 className="text-sm tracking-widest uppercase mb-2">ПРОЗРАЧНОСТЬ</h4>
                                <p className="text-neutral-400 text-sm">Регулярные отчеты и демонстрации</p>
                            </div>
                            <div className="text-center p-8 border border-neutral-800 rounded-3xl">
                                <div className="text-5xl font-light mb-4">24/7</div>
                                <h4 className="text-sm tracking-widest uppercase mb-2">КОММУНИКАЦИЯ</h4>
                                <p className="text-neutral-400 text-sm">Поддержка в Telegram и почте</p>
                            </div>
                            <div className="text-center p-8 border border-neutral-800 rounded-3xl">
                                <div className="text-5xl font-light mb-4">✓</div>
                                <h4 className="text-sm tracking-widest uppercase mb-2">ГАРАНТИЯ КАЧЕСТВА</h4>
                                <p className="text-neutral-400 text-sm">Тестирование и фиксы после запуска</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx global>{`
                @keyframes flow-line {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-flow-line {
                    animation: flow-line 15s linear infinite;
                }
            `}</style>
        </section>
    );
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [apiStatus, setApiStatus] = useState('Загрузка...');
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [profile, setProfile] = useState(null);

    // Обновляем меню: меняем "НАВЫКИ" на "ПРОЦЕСС"
    const menuItems = [
        {id: 'home', label: 'ГЛАВНАЯ'}, 
        {id: 'about', label: 'ОБО МНЕ'}, 
        {id: 'projects', label: 'ПРОЕКТЫ'},
        {id: 'process', label: 'ПРОЦЕСС'}, // Изменено здесь
        {id: 'experience', label: 'ОПЫТ'}, 
        {id: 'contact', label: 'КОНТАКТЫ'}
    ];

    const getMockProfile = () => ({
        name: 'Алексей Петров', title: 'Full Stack Developer', bio: 'Добавьте информацию о себе в админ-панели Django',
        email: 'example@email.com', phone: '', location: '', github_url: '', linkedin_url: '', telegram_url: '', photo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); setApiStatus('Подключение к сайту...');
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
                const [projectsRes, skillsRes, experienceRes, profileRes] = await Promise.allSettled([
                    fetch(`${API_URL}/projects/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/skills/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/experience/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/profile/`).then(r => r.ok ? r.json() : getMockProfile())
                ]);
                const projectsData = projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value) ? projectsRes.value : [];
                const skillsData = skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value) ? skillsRes.value : [];
                const experienceData = experienceRes.status === 'fulfilled' && Array.isArray(experienceRes.value) ? experienceRes.value : [];
                const profileData = profileRes.status === 'fulfilled' && profileRes.value ? profileRes.value : getMockProfile();
                setProjects(projectsData); setSkills(skillsData); setExperience(experienceData); setProfile(profileData);
                setApiStatus('Данные загружены');
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setProfile(getMockProfile()); setProjects([]); setSkills([]); setExperience([]);
                setApiStatus('Ошибка подключения к API');
            } finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({behavior: 'smooth'});
        setIsMenuOpen(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'НАСТОЯЩЕЕ ВРЕМЯ';
        try { return new Date(dateString).toLocaleDateString('ru-RU', {month: 'long', year: 'numeric'}).toUpperCase(); }
        catch { return dateString; }
    };

    if (loading) return <LoadingScreen apiStatus={apiStatus} />;

    const safeProjects = Array.isArray(projects) ? projects : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeExperience = Array.isArray(experience) ? experience : [];

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 border-b border-neutral-900">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm tracking-widest uppercase font-light">{profile?.name?.split(' ')[0] || 'Portfolio'}</div>
                        <div className="hidden md:flex space-x-12">
                            {menuItems.map(item => (
                                <button key={item.id} onClick={() => handleScroll(item.id)} className="text-xs tracking-widest text-neutral-400 hover:text-white transition-colors uppercase">{item.label}</button>
                            ))}
                        </div>
                        <button className="md:hidden text-neutral-400 hover:text-white transition-colors text-sm tracking-widest" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? 'ЗАКРЫТЬ' : 'МЕНЮ'}
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden mt-8 pb-8 space-y-6">
                            {menuItems.map(item => (
                                <button key={item.id} onClick={() => handleScroll(item.id)} className="block w-full text-left text-sm tracking-widest text-neutral-400 hover:text-white transition-colors uppercase">{item.label}</button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            <HeroSection profile={profile} safeProjects={safeProjects} safeSkills={safeSkills} safeExperience={safeExperience} handleScroll={handleScroll}/>

            {/* Обо мне с background2 */}
            <section id="about" className="py-32 border-t border-neutral-900 relative">
                <div className="absolute inset-0 z-0 opacity-5">
                    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background2})`, filter: 'grayscale(100%)'}}></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-12 text-center">ОБО МНЕ</h2>
                        <div className="text-center space-y-8">
                            <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300">
                                {profile?.bio || 'Информация о вас появится здесь после добавления в админ-панель.'}
                            </p>
                            {(profile?.email || profile?.location) && (
                                <div className="flex justify-center gap-12 pt-12 text-sm tracking-wide text-neutral-500">
                                    {profile?.email && <div>EMAIL: {profile.email}</div>}
                                    {profile?.location && <div>ЛОКАЦИЯ: {profile.location}</div>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Проекты с background3 */}
            <section id="projects" className="py-32 border-t border-neutral-900 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background3})`, filter: 'grayscale(100%) blur(0.5px)'}}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-4">ПРОЕКТЫ</h2>
                        <p className="text-5xl md:text-7xl font-light tracking-tight">РАБОТЫ<span className="text-neutral-600">.</span></p>
                        <p className="text-neutral-400 text-sm tracking-widest uppercase mt-4">СВАЙПАЙТЕ → ДЛЯ ПРОСМОТРА</p>
                    </div>
                    <ProjectsSwiper projects={safeProjects} />
                </div>
            </section>

            {/* Процесс работы вместо навыков */}
            <WorkProcess />

            {/* Опыт с background5 */}
            <section id="experience" className="py-32 border-t border-neutral-900 relative">
                <div className="absolute inset-0 z-0 opacity-5">
                    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background5})`, filter: 'grayscale(100%)'}}></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-20 text-center">ОПЫТ РАБОТЫ</h2>
                    <div className="max-w-4xl mx-auto">
                        {safeExperience.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-neutral-500 text-sm tracking-wide uppercase">Опыт работы не добавлен</p>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {safeExperience.map((exp, index) => (
                                    <div key={exp.id || index} className="border-b border-neutral-900 pb-16 last:border-0">
                                        <div className="flex flex-col md:flex-row md:justify-between mb-6">
                                            <div>
                                                <h3 className="text-2xl font-light mb-2">{exp.position}</h3>
                                                <p className="text-neutral-400 tracking-wide">{exp.company}</p>
                                            </div>
                                            <span className="text-xs tracking-widest text-neutral-500 uppercase mt-4 md:mt-0">
                                                {formatDate(exp.start_date)} - {exp.is_current ? 'НАСТОЯЩЕЕ ВРЕМЯ' : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-neutral-400 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Контакты с background3 */}
            <section id="contact" className="py-32 border-t border-neutral-900 relative">
                <div className="absolute inset-0 z-0 opacity-5">
                    <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background3})`, filter: 'grayscale(100%) blur(0.5px)'}}></div>
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-20 text-center">КОНТАКТЫ</h2>
                    <ContactForm />
                    {(profile?.github_url || profile?.linkedin_url || profile?.telegram_url) && (
                        <div className="flex justify-center gap-12 mt-20 text-xs tracking-widest uppercase">
                            {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">GITHUB</a>}
                            {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">LINKEDIN</a>}
                            {profile?.telegram_url && <a href={profile.telegram_url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">TELEGRAM</a>}
                        </div>
                    )}
                </div>
            </section>

            <footer className="py-12 border-t border-neutral-900">
                <div className="container mx-auto px-6">
                    <div className="text-center space-y-4">
                        <p className="text-xs tracking-widest text-neutral-500 uppercase">© {new Date().getFullYear()} {profile?.name || 'Алексей Петров'}</p>
                        <p className="text-xs text-neutral-700">MADE BY DEV</p>
                        <p className="text-xs text-neutral-800 tracking-widest">Статус API: {apiStatus}</p>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                .animate-pulse-once { animation: pulse-once 1s ease-in-out; }
                .animate-shimmer { animation: shimmer 2s infinite linear; }
                .animate-spin-slow { animation: spin-slow 2s linear infinite; }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                @keyframes pulse-once { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
                @keyframes spin-slow { from { transform: translateX(-50%) translateY(-50%) rotate(0deg); } to { transform: translateX(-50%) translateY(-50%) rotate(360deg); } }
                @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default Portfolio;