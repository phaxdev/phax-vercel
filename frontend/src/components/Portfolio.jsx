import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async'; // Импортируем оба
import background1 from './background1.png';
import background2 from './background2.png';
import background3 from './background3.png';
import background4 from './background4.png';
import background5 from './background5.png';

// SEO компонент
const SEO = ({ 
  title = "Разработка сайтов и ботов под ключ | Full Stack Developer",
  description = "Профессиональная разработка сайтов, Telegram ботов, скриптов Lua. Создание сайтов под ключ, верстка макетов, мини-приложения в Telegram. Фиксированные цены, гарантия качества.",
  keywords = "разработка сайтов, создание сайтов, telegram боты, Lua скрипты, верстка макетов, мини-приложения, fullstack разработчик, заказать сайт",
  ogImage = "/og-image.jpg",
  ogUrl = "https://phax.online",
  type = "website",
  author = "phax"
}) => {
  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph (для соцсетей) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Дополнительные SEO-теги */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={ogUrl} />
      
      {/* Структурированные данные (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Разработка сайтов и ботов под ключ",
          "description": description,
          "url": ogUrl,
          "logo": `${ogUrl}/logo.png`,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "RU"
          },
          "service": [
            {
              "@type": "Service",
              "name": "Разработка сайтов",
              "description": "Создание сайтов под ключ с современным дизайном и адаптивной версткой"
            },
            {
              "@type": "Service",
              "name": "Telegram боты",
              "description": "Разработка интеллектуальных ботов для автоматизации бизнеса"
            },
            {
              "@type": "Service",
              "name": "Lua скрипты",
              "description": "Создание скриптов для игровых серверов и автоматизации"
            }
          ],
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "RUB",
            "lowPrice": "15000",
            "highPrice": "150000",
            "offerCount": "6"
          }
        })}
      </script>
    </Helmet>
  );
};

// Черно-белые SVG иконки для ПРОЦЕССА РАБОТЫ
const ProcessIcons = {
    Consultation: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    Prototype: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    ),
    Development: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    Testing: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Launch: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Support: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    Transparency: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
    Communication: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Quality: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    )
};

// Черно-белые SVG иконки для ПРАЙС-ЛИСТА
const PricingIcons = {
    Website: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    ),
    Layout: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
    ),
    Lua: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
    ),
    TelegramBot: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    MiniApp: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ),
    ConsultationPricing: () => (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    FixedPrice: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Speed: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Warranty: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    Support24: () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
};

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

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

    const inputClasses = (fieldName) => {
        const baseClasses = "w-full px-0 py-5 bg-transparent border-b-2 text-white placeholder-neutral-500 text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 focus:outline-none";
        const errorClasses = errors[fieldName] ? "border-red-500" : "";
        const focusClasses = focusedField === fieldName ? "border-white" : "border-neutral-800";
        return `${baseClasses} ${errorClasses || focusClasses}`;
    };

    return (
        <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="space-y-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="ИМЯ / USERNAME" 
                        value={formData.name} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('name')}
                    />
                    <AnimatePresence>
                        {errors.name && (
                            <motion.p 
                                className="text-red-400 text-xs mt-2 tracking-wide"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {errors.name}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="EMAIL" 
                        value={formData.email} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')}
                    />
                    <AnimatePresence>
                        {errors.email && (
                            <motion.p 
                                className="text-red-400 text-xs mt-2 tracking-wide"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {errors.email}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <textarea 
                        name="message" 
                        placeholder="СООБЩЕНИЕ" 
                        rows="6" 
                        value={formData.message} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClasses('message')} resize-none`}
                    />
                    <AnimatePresence>
                        {errors.message && (
                            <motion.p 
                                className="text-red-400 text-xs mt-2 tracking-wide"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {errors.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <AnimatePresence>
                    {submitStatus && (
                        <motion.div 
                            className={`p-6 text-center text-sm tracking-[0.15em] rounded-lg ${
                                submitStatus.type === 'success' 
                                    ? 'bg-white/10 text-white border border-white/20' 
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            {submitStatus.message}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <motion.button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="premium-button w-full py-6 border-2 border-white text-white text-sm tracking-[0.2em] uppercase font-light relative overflow-hidden group"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    disabled={isSubmitting}
                >
                    <span className="relative z-10">
                        {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                    </span>
                    {!isSubmitting && (
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                    </span>
                </motion.button>
            </div>
        </motion.div>
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
    <motion.div 
        className="relative w-40 h-40 mx-auto mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
    >
        <motion.div 
            className="absolute top-1/2 left-1/4 text-5xl text-white"
            animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
            }}
            transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
        >
            {'{'}
        </motion.div>
        <motion.div 
            className="absolute top-1/2 right-1/4 text-5xl text-white"
            animate={{ 
                y: [0, -15, 0],
                rotate: [0, -5, 0]
            }}
            transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: 0.5,
                ease: "easeInOut" 
            }}
        >
            {'}'}
        </motion.div>
        <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            code
        </motion.div>
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                    top: `${20 + i * 15}%`,
                    left: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                }}
            />
        ))}
        <motion.div
            className="absolute inset-0 border-2 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
    </motion.div>
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

const HeroSection = ({ profile, safeProjects, handleScroll }) => (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0 z-0 opacity-5">
            <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{backgroundImage: `url(${background1})`, filter: 'grayscale(100%) blur(2px)'}}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
        
        {/* Градиентные линии */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
                style={{ left: `${20 + i * 20}%` }}
                animate={{
                    opacity: [0, 0.5, 0],
                    y: [-100, window.innerHeight + 100]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "linear"
                }}
            />
        ))}
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-16">
                <CodeIconAnimation />
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tighter premium-text">
                        {profile?.name || 'Разработчик'}
                    </h1>
                </motion.div>
                
                <motion.p 
                    className="text-sm md:text-base tracking-[0.3em] text-neutral-400 uppercase font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {profile?.title || 'Full Stack Developer'}
                </motion.p>
                
                <motion.div 
                    className="flex justify-center gap-12 md:gap-20 pt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    {[
                        { value: safeProjects.length, label: 'Проектов' },
                        { value: '3+', label: 'Года опыта' },
                        { value: '6', label: 'Услуг' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group cursor-default"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div 
                                className="text-5xl md:text-6xl font-extralight mb-3 premium-text"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-light">
                                {stat.label}
                            </div>
                            <div className="mt-2 h-px w-0 group-hover:w-full bg-white/30 transition-all duration-500 mx-auto"></div>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.div 
                    className="flex flex-col sm:flex-row justify-center gap-6 pt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <motion.button 
                        onClick={() => handleScroll('contact')} 
                        className="premium-button px-12 py-5 border-2 border-white text-sm tracking-[0.2em] uppercase font-light relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">СВЯЗАТЬСЯ</span>
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            СВЯЗАТЬСЯ
                        </span>
                    </motion.button>
                    
                    <motion.button 
                        onClick={() => handleScroll('pricing')} 
                        className="px-12 py-5 border-2 border-neutral-700 text-neutral-400 text-sm tracking-[0.2em] uppercase font-light hover:border-white hover:text-white transition-all duration-500 relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">ПРАЙС</span>
                        <motion.div
                            className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    </section>
);

const ProjectCard = ({ project, isActive }) => {
    const cardRef = useRef(null);
    
    const getTechnologies = () => {
        if (!project) return [];
        if (Array.isArray(project.technologies)) return project.technologies;
        if (Array.isArray(project.technologies_list)) return project.technologies_list;
        if (project.technologies && typeof project.technologies === 'string') return project.technologies.split(',').map(t => t.trim());
        return [];
    };
    const technologies = getTechnologies();

    return (
        <motion.div 
            ref={cardRef}
            className={`premium-card relative rounded-3xl p-10 md:p-12 group cursor-pointer`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10 }}
        >
            {/* Светящийся эффект для активной карточки */}
            {isActive && (
                <motion.div 
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                        x: ['-100%', '100%']
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            )}
            
            {/* Градиентная рамка */}
            <motion.div
                className={`absolute inset-0 rounded-3xl ${
                    isActive ? 'border-2 border-white' : 'border border-white/20'
                }`}
                animate={isActive ? {
                    boxShadow: [
                        '0 0 20px rgba(255, 255, 255, 0.1)',
                        '0 0 40px rgba(255, 255, 255, 0.3)',
                        '0 0 20px rgba(255, 255, 255, 0.1)'
                    ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <motion.span 
                        className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {project.year || new Date().getFullYear()}
                    </motion.span>
                    {isActive && (
                        <motion.span 
                            className="px-4 py-1.5 bg-white text-black text-xs tracking-[0.15em] rounded-full font-medium"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            ACTIVE
                        </motion.span>
                    )}
                </div>
                
                <motion.h3 
                    className="text-4xl md:text-5xl font-extralight mb-6 tracking-tight premium-text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {project.title || 'Проект без названия'}
                </motion.h3>
                
                <motion.p 
                    className="text-neutral-300 mb-10 leading-relaxed text-lg font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {project.short_description || project.description || 'Описание проекта будет добавлено позже'}
                </motion.p>
                
                {technologies.length > 0 && (
                    <motion.div 
                        className="flex flex-wrap gap-3 mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {technologies.map((tech, index) => (
                            <motion.span 
                                key={index}
                                className="px-5 py-2.5 border border-white/20 rounded-full text-sm tracking-wider font-light hover:border-white hover:bg-white/10 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.1, borderColor: 'white' }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>
                )}
                
                <motion.div 
                    className="flex gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    {project.github_url && (
                        <motion.a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm tracking-[0.2em] uppercase font-light group/link relative"
                            whileHover={{ x: 5 }}
                        >
                            <span className="relative z-10">GITHUB</span>
                            <motion.span
                                className="absolute bottom-0 left-0 h-px bg-white"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    )}
                    {project.live_url && (
                        <motion.a 
                            href={project.live_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm tracking-[0.2em] uppercase font-light group/link relative"
                            whileHover={{ x: 5 }}
                        >
                            <span className="relative z-10">ДЕМО</span>
                            <motion.span
                                className="absolute bottom-0 left-0 h-px bg-white"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    )}
                </motion.div>
            </div>
        </motion.div>
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
            <motion.div 
                className="flex justify-center items-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-6">
                    <motion.span 
                        className="text-5xl font-extralight premium-text"
                        key={currentIndex}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {String(currentIndex + 1).padStart(2, '0')}
                    </motion.span>
                    <div className="w-48 h-px bg-neutral-800 relative overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-transparent via-white to-transparent" 
                            initial={{width: 0}} 
                            animate={{width: `${((currentIndex + 1) / displayProjects.length) * 100}%`}} 
                            transition={{duration: 0.8, ease: "easeOut"}}
                        />
                    </div>
                    <span className="text-5xl font-extralight text-neutral-600">
                        {String(displayProjects.length).padStart(2, '0')}
                    </span>
                </div>
            </motion.div>
            
            <div className="relative overflow-hidden py-12">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-5xl">
                        <div className="relative z-10 mx-auto" style={{width: '100%'}}>
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={currentIndex} 
                                    initial={{x: 100, opacity: 0, scale: 0.95}} 
                                    animate={{x: 0, opacity: 1, scale: 1}} 
                                    exit={{x: -100, opacity: 0, scale: 0.95}} 
                                    transition={{duration: 0.6, ease: "easeInOut"}}
                                >
                                    <ProjectCard project={displayProjects[currentIndex]} isActive={true}/>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            
            <motion.div 
                className="flex justify-between items-center mt-16 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.button 
                    onClick={handlePrev} 
                    className="w-14 h-14 border-2 border-white/20 rounded-full flex items-center justify-center hover:border-white transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="relative z-10 text-xl">←</span>
                    <motion.div
                        className="absolute inset-0 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity z-20">←</span>
                </motion.button>
                
                <div className="flex gap-3">
                    {displayProjects.map((_, index) => (
                        <motion.button 
                            key={index} 
                            onClick={() => setCurrentIndex(index)} 
                            className={`rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-white w-10 h-2' 
                                    : 'bg-neutral-700 w-2 h-2 hover:bg-neutral-500'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            initial={false}
                            animate={{
                                width: index === currentIndex ? 40 : 8,
                                backgroundColor: index === currentIndex ? 'white' : 'rgb(64 64 64)'
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </div>
                
                <motion.button 
                    onClick={handleNext} 
                    className="w-14 h-14 border-2 border-white/20 rounded-full flex items-center justify-center hover:border-white transition-all duration-300 group relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="relative z-10 text-xl">→</span>
                    <motion.div
                        className="absolute inset-0 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity z-20">→</span>
                </motion.button>
            </motion.div>
            
            <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase font-light">← КЛИК / КЛАВИШИ →</p>
                <p className="text-neutral-700 text-xs mt-3 font-light">АВТОПРОКРУТКА КАЖДЫЕ 5С</p>
            </motion.div>
        </div>
    );
};

// Секция "Процесс работы" с черно-белыми иконками
const WorkProcess = () => {
    const [activeStep, setActiveStep] = useState(0);
    
    const processSteps = [
        {
            number: '01',
            title: 'КОНСУЛЬТАЦИЯ',
            description: 'Обсуждение проекта, анализ требований, определение сроков и бюджета',
            duration: '1-2 дня',
            icon: 'Consultation'
        },
        {
            number: '02',
            title: 'ПРОТОТИП',
            description: 'Создание wireframes и прототипа для визуализации концепции',
            duration: '3-5 дней',
            icon: 'Prototype'
        },
        {
            number: '03',
            title: 'РАЗРАБОТКА',
            description: 'Поэтапная разработка с регулярными демонстрациями прогресса',
            duration: 'Зависит от проекта',
            icon: 'Development'
        },
        {
            number: '04',
            title: 'ТЕСТИРОВАНИЕ',
            description: 'Всестороннее тестирование и финальные корректировки',
            duration: '3-7 дней',
            icon: 'Testing'
        },
        {
            number: '05',
            title: 'ЗАПУСК',
            description: 'Деплой проекта, документация и обучение использованию',
            duration: '1-2 дня',
            icon: 'Launch'
        },
        {
            number: '06',
            title: 'ПОДДЕРЖКА',
            description: 'Техническая поддержка и дальнейшее развитие проекта',
            duration: 'Постоянно',
            icon: 'Support'
        }
    ];

    const processStats = [
        { icon: 'Transparency', value: '100%', title: 'ПРОЗРАЧНОСТЬ', description: 'Регулярные отчеты и демонстрации' },
        { icon: 'Communication', value: '24/7', title: 'КОММУНИКАЦИЯ', description: 'Поддержка в Telegram и почте' },
        { icon: 'Quality', value: '✓', title: 'ГАРАНТИЯ КАЧЕСТВА', description: 'Тестирование и фиксы после запуска' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % processSteps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [processSteps.length]);

    return (
        <motion.section 
            id="process" 
            className="py-32 border-t border-white/10 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 z-0 opacity-5">
                <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: `url(${background4})`, filter: 'grayscale(100%) blur(1px)'}}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        style={{
                            top: `${20 + i * 15}%`,
                            width: '100%'
                        }}
                        animate={{
                            x: ['-100%', '100%'],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 1.5,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2 
                    className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6 text-center font-light"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    ПРОЦЕСС
                </motion.h2>
                <motion.p 
                    className="text-6xl md:text-8xl font-extralight tracking-tighter text-center mb-8 premium-text"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    РАБОТЫ<span className="text-neutral-600">.</span>
                </motion.p>
                <motion.p 
                    className="text-neutral-400 text-sm tracking-[0.2em] uppercase text-center mb-24 max-w-2xl mx-auto font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    ОТ ИДЕИ ДО ЗАПУСКА: 6 КЛЮЧЕВЫХ ЭТАПОВ
                </motion.p>
                
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        className="hidden lg:flex items-center justify-between mb-24 relative"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0"></div>
                        
                        {processSteps.map((step, index) => {
                            const IconComponent = ProcessIcons[step.icon];
                            return (
                                <motion.div 
                                    key={step.number} 
                                    className="relative z-10"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                >
                                    <motion.button
                                        onClick={() => setActiveStep(index)}
                                        className="flex flex-col items-center"
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <motion.div 
                                            className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mb-6 transition-all duration-500 ${
                                                activeStep === index 
                                                    ? 'border-white bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.5)]' 
                                                    : 'border-white/20 bg-black hover:border-white/40'
                                            }`}
                                            animate={activeStep === index ? {
                                                scale: [1, 1.1, 1],
                                                boxShadow: [
                                                    '0 0 20px rgba(255, 255, 255, 0.3)',
                                                    '0 0 40px rgba(255, 255, 255, 0.6)',
                                                    '0 0 20px rgba(255, 255, 255, 0.3)'
                                                ]
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <IconComponent />
                                        </motion.div>
                                        
                                        <motion.div 
                                            className={`text-xs tracking-[0.2em] uppercase mb-3 font-light transition-colors ${
                                                activeStep === index ? 'text-white' : 'text-neutral-500'
                                            }`}
                                        >
                                            {step.number}
                                        </motion.div>
                                        
                                        <h3 className={`text-sm tracking-[0.15em] uppercase text-center font-light transition-colors ${
                                            activeStep === index ? 'text-white' : 'text-neutral-400'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        
                                        {index < processSteps.length - 1 && (
                                            <motion.div 
                                                className="absolute top-10 left-full w-20 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent -translate-x-1/2"
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                            />
                                        )}
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                    
                    <div className="lg:hidden space-y-8 mb-12">
                        {processSteps.map((step, index) => {
                            const IconComponent = ProcessIcons[step.icon];
                            return (
                                <div key={step.number} className="relative">
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
                                        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                            activeStep === index 
                                                ? 'border-white bg-white text-black' 
                                                : 'border-neutral-700 bg-black'
                                        }`}>
                                            <IconComponent />
                                        </div>
                                        
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
                            );
                        })}
                    </div>
                    
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
                                                    {(() => {
                                                        const IconComponent = ProcessIcons[processSteps[activeStep].icon];
                                                        return <IconComponent />;
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/5 animate-spin-slow"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-white/5 animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex justify-center gap-8 mt-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.button
                                onClick={() => setActiveStep(prev => prev === 0 ? processSteps.length - 1 : prev - 1)}
                                className="w-14 h-14 border-2 border-white/20 rounded-full flex items-center justify-center hover:border-white transition-all duration-300 group relative overflow-hidden"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="relative z-10 text-xl">←</span>
                                <motion.div
                                    className="absolute inset-0 bg-white rounded-full"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity z-20">←</span>
                            </motion.button>
                            
                            <div className="flex items-center gap-6">
                                <motion.span 
                                    className="text-3xl font-extralight premium-text"
                                    key={activeStep}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {String(activeStep + 1).padStart(2, '0')}
                                </motion.span>
                                <div className="w-56 h-px bg-neutral-800 relative overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    />
                                </div>
                                <span className="text-3xl font-extralight text-neutral-600">
                                    {String(processSteps.length).padStart(2, '0')}
                                </span>
                            </div>
                            
                            <motion.button
                                onClick={() => setActiveStep(prev => (prev + 1) % processSteps.length)}
                                className="w-14 h-14 border-2 border-white/20 rounded-full flex items-center justify-center hover:border-white transition-all duration-300 group relative overflow-hidden"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="relative z-10 text-xl">→</span>
                                <motion.div
                                    className="absolute inset-0 bg-white rounded-full"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity z-20">→</span>
                            </motion.button>
                        </motion.div>
                    </div>
                    
                    <div className="mt-20 pt-20 border-t border-neutral-900">
                        <div className="grid md:grid-cols-3 gap-8">
                            {processStats.map((stat, index) => {
                                const IconComponent = ProcessIcons[stat.icon];
                                return (
                                    <div key={index} className="text-center p-8 border border-neutral-800 rounded-3xl">
                                        <div className="flex justify-center mb-4">
                                            <IconComponent />
                                        </div>
                                        <div className="text-5xl font-light mb-4">{stat.value}</div>
                                        <h4 className="text-sm tracking-widest uppercase mb-2">{stat.title}</h4>
                                        <p className="text-neutral-400 text-sm">{stat.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </motion.section>
    );
};

// Секция "Прайс-лист" с черно-белыми иконками
const PricingSection = () => {
    const [activeService, setActiveService] = useState(0);
    
    const services = [
        {
            id: 1,
            title: 'РАЗРАБОТКА САЙТОВ ПОД КЛЮЧ',
            description: 'Полный цикл разработки от дизайна до запуска. Современные технологии, адаптивная верстка, SEO-оптимизация.',
            price: 'от 45 000 ₽',
            priceRange: '45 000 - 120 000 ₽',
            features: [
                'Адаптивный дизайн (мобильные + десктоп)',
                'CMS для самостоятельного управления',
                'Интеграция с соц. сетями и аналитикой',
                'SEO-оптимизация под поисковые системы',
                'Техническая поддержка 3 месяца',
                'Хостинг на 1 год в подарок'
            ],
            timeline: '2-4 недели',
            icon: 'Website',
            popular: true
        },
        {
            id: 2,
            title: 'ВЕРСТКА С МАКЕТА',
            description: 'Точная верстка Figma/PSD макетов. Чистый код, Pixel Perfect, кроссбраузерная совместимость.',
            price: 'от 25 000 ₽',
            priceRange: '25 000 - 60 000 ₽',
            features: [
                'Pixel Perfect верстка',
                'Анимации и интерактивные элементы',
                'Кроссбраузерная совместимость',
                'Оптимизация скорости загрузки',
                'Валидный HTML5/CSS3 код',
                'Адаптив под все устройства'
            ],
            timeline: '1-2 недели',
            icon: 'Layout',
            popular: false
        },
        {
            id: 3,
            title: 'РАЗРАБОТКА СКРИПТОВ LUA',
            description: 'Скрипты для игр (Garry\'s Mod, World of Warcraft, FiveM), автоматизация процессов, игровые модификации.',
            price: 'от 15 000 ₽',
            priceRange: '15 000 - 40 000 ₽',
            features: [
                'Скрипты для игровых серверов',
                'Автоматизация рутинных задач',
                'Создание игровых модификаций',
                'Интеграция с игровыми API',
                'Оптимизация производительности',
                'Тестирование и отладка'
            ],
            timeline: '1-3 недели',
            icon: 'Lua',
            popular: false
        },
        {
            id: 4,
            title: 'НАПИСАНИЕ БОТОВ TELEGRAM',
            description: 'Умные боты для автоматизации бизнеса, рассылок, опросов, интеграции с CRM и платежными системами.',
            price: 'от 30 000 ₽',
            priceRange: '30 000 - 80 000 ₽',
            features: [
                'Боты для бизнеса и личного использования',
                'Интеграция с платежными системами',
                'Рассылки и автоматические ответы',
                'Поддержка Inline режима',
                'Панель администратора',
                'Ведение базы данных пользователей'
            ],
            timeline: '2-3 недели',
            icon: 'TelegramBot',
            popular: false
        },
        {
            id: 5,
            title: 'MINIAPPS В TELEGRAM',
            description: 'Мини-приложения внутри Telegram для бизнеса, игр, образовательных платформ с интеграцией TON.',
            price: 'от 50 000 ₽',
            priceRange: '50 000 - 150 000 ₽',
            features: [
                'Полная интеграция с Telegram API',
                'Поддержка TON криптовалюты',
                'Web App внутри мессенджера',
                'Push-уведомления и алерты',
                'Мультиязычность',
                'Масштабируемая архитектура'
            ],
            timeline: '3-5 недель',
            icon: 'MiniApp',
            popular: false
        },
        {
            id: 6,
            title: 'КОНСУЛЬТАЦИЯ И АУДИТ',
            description: 'Технический аудит существующих проектов, консультации по разработке, помощь с выбором технологий.',
            price: 'от 5 000 ₽',
            priceRange: '5 000 - 20 000 ₽',
            features: [
                'Анализ текущего кода и архитектуры',
                'Рекомендации по оптимизации',
                'Обзор подходящих технологий',
                'Помощь с выбором стека',
                'Code review существующего проекта',
                'Рекомендации по безопасности'
            ],
            timeline: '1-3 дня',
            icon: 'ConsultationPricing',
            popular: false
        }
    ];

    const benefits = [
        { icon: 'FixedPrice', title: 'ФИКСИРОВАННАЯ ЦЕНА', description: 'Цена не меняется в процессе работы' },
        { icon: 'Speed', title: 'СКОРОСТЬ РАБОТЫ', description: 'Средний срок разработки 2-3 недели' },
        { icon: 'Warranty', title: 'ГАРАНТИЯ 6 МЕСЯЦЕВ', description: 'Исправляем баги бесплатно полгода' },
        { icon: 'Support24', title: 'ПОДДЕРЖКА 24/7', description: 'Отвечаем в Telegram в любое время' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveService(prev => (prev + 1) % services.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [services.length]);

    return (
        <motion.section 
            id="pricing" 
            className="py-32 border-t border-white/10 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 z-0 opacity-5">
                <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: `url(${background5})`, filter: 'grayscale(100%) blur(1px)'}}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            
            <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ 
                            y: ['-100%', '200%'],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 0.4,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: "linear"
                        }}
                        style={{
                            left: `${8 + i * 9}%`
                        }}
                    />
                ))}
            </div>
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2 
                    className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6 text-center font-light"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    СТОИМОСТЬ
                </motion.h2>
                <motion.p 
                    className="text-6xl md:text-8xl font-extralight tracking-tighter text-center mb-12 premium-text"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    УСЛУГИ<span className="text-neutral-600">.</span>
                </motion.p>
                <motion.p 
                    className="text-neutral-400 text-sm tracking-[0.2em] uppercase text-center mb-24 max-w-2xl mx-auto font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    ПРОЗРАЧНЫЕ ЦЕНЫ • ФИКСИРОВАННЫЙ БЮДЖЕТ • ГАРАНТИЯ КАЧЕСТВА
                </motion.p>
                
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        className="flex overflow-x-auto pb-8 mb-16 hide-scrollbar lg:overflow-visible lg:grid lg:grid-cols-3 lg:gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {services.map((service, index) => {
                            const IconComponent = PricingIcons[service.icon];
                            return (
                                <motion.button
                                    key={service.id}
                                    onClick={() => setActiveService(index)}
                                    className={`premium-card flex-shrink-0 w-80 lg:w-auto mx-2 lg:mx-0 rounded-3xl p-8 ${
                                        activeService === index
                                            ? 'border-2 border-white'
                                            : 'border border-white/20 hover:border-white/40'
                                    }`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    animate={activeService === index ? {
                                        boxShadow: [
                                            '0 0 20px rgba(255, 255, 255, 0.1)',
                                            '0 0 40px rgba(255, 255, 255, 0.3)',
                                            '0 0 20px rgba(255, 255, 255, 0.1)'
                                        ]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <motion.div
                                            animate={activeService === index ? {
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 5, -5, 0]
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <IconComponent />
                                        </motion.div>
                                        {service.popular && (
                                            <motion.span 
                                                className="px-4 py-1.5 bg-white text-black text-xs tracking-[0.15em] rounded-full font-medium"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            >
                                                ПОПУЛЯРНО
                                            </motion.span>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-xl font-extralight mb-6 text-left tracking-tight premium-text">
                                        {service.title}
                                    </h3>
                                    
                                    <div className="text-left mb-8">
                                        <motion.div 
                                            className="text-4xl font-extralight mb-3 premium-text"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            {service.price}
                                        </motion.div>
                                        <div className="text-sm text-neutral-400 font-light">Диапазон: {service.priceRange}</div>
                                    </div>
                                    
                                    <div className="text-left">
                                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Срок: {service.timeline}</span>
                                        </div>
                                        {activeService === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4 pt-4 border-t border-neutral-800"
                                            >
                                                <p className="text-sm text-neutral-300 mb-3">{service.description}</p>
                                                <div className="text-xs text-neutral-500">
                                                    {service.features.slice(0, 2).map((feature, i) => (
                                                        <div key={i} className="flex items-center gap-2 mb-1">
                                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span>{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                    
                    <motion.div
                        key={activeService}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="premium-card border-2 border-white/20 rounded-3xl p-8 lg:p-12 mb-16"
                    >
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="text-5xl">
                                        {(() => {
                                            const IconComponent = PricingIcons[services[activeService].icon];
                                            return <IconComponent />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-light mb-2">{services[activeService].title}</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="text-2xl font-light">{services[activeService].price}</div>
                                            <div className="px-3 py-1 border border-neutral-800 rounded-full text-sm">
                                                Срок: {services[activeService].timeline}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                                    {services[activeService].description}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 border border-neutral-800 rounded-2xl">
                                        <div className="text-sm text-neutral-500 mb-1">Диапазон цен</div>
                                        <div className="text-lg font-light">{services[activeService].priceRange}</div>
                                    </div>
                                    <div className="p-4 border border-neutral-800 rounded-2xl">
                                        <div className="text-sm text-neutral-500 mb-1">Срок выполнения</div>
                                        <div className="text-lg font-light">{services[activeService].timeline}</div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                                    className="w-full py-4 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    ЗАКАЗАТЬ ЭТУ УСЛУГУ
                                </button>
                            </div>
                            
                            <div>
                                <h4 className="text-xl font-light mb-6 tracking-widest uppercase">Что входит в услугу:</h4>
                                <div className="space-y-4">
                                    {services[activeService].features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 border border-neutral-800 rounded-2xl hover:border-white transition-colors">
                                            <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-neutral-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 p-6 border border-neutral-800 rounded-2xl bg-black/30">
                                    <h5 className="text-sm tracking-widest uppercase mb-3 text-neutral-400">ДОПОЛНИТЕЛЬНО</h5>
                                    <ul className="space-y-2 text-sm text-neutral-300">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Бесплатная консультация перед началом
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Фиксированная цена без скрытых платежей
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Техническая поддержка после сдачи проекта
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Гарантия на код 6 месяцев
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="flex justify-between items-center mb-12">
                        <button
                            onClick={() => setActiveService(prev => prev === 0 ? services.length - 1 : prev - 1)}
                            className="w-12 h-12 border-2 border-neutral-800 rounded-full flex items-center justify-center hover:border-white hover:scale-110 transition-all duration-300"
                        >
                            ←
                        </button>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-light">{String(activeService + 1).padStart(2, '0')}</div>
                                <div className="text-xs tracking-widest text-neutral-500 uppercase">Услуга</div>
                            </div>
                            
                            <div className="w-48 h-0.5 bg-neutral-800">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((activeService + 1) / services.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            
                            <div className="text-center">
                                <div className="text-3xl font-light text-neutral-600">{String(services.length).padStart(2, '0')}</div>
                                <div className="text-xs tracking-widest text-neutral-500 uppercase">Всего</div>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setActiveService(prev => (prev + 1) % services.length)}
                            className="w-12 h-12 border-2 border-neutral-800 rounded-full flex items-center justify-center hover:border-white hover:scale-110 transition-all duration-300"
                        >
                            →
                        </button>
                    </div>
                    
                    <motion.div 
                        className="mt-24 pt-24 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h3 
                            className="text-3xl font-extralight text-center mb-16 tracking-[0.2em] uppercase premium-text"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            ПОЧЕМУ ВЫБИРАЮТ НАС
                        </motion.h3>
                        <div className="grid md:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => {
                                const IconComponent = PricingIcons[benefit.icon];
                                return (
                                    <motion.div 
                                        key={index} 
                                        className="premium-card text-center p-8 rounded-3xl"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                    >
                                        <motion.div 
                                            className="flex justify-center mb-6"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <IconComponent />
                                        </motion.div>
                                        <h4 className="text-sm tracking-[0.2em] uppercase mb-3 font-light">{benefit.title}</h4>
                                        <p className="text-neutral-400 text-sm font-light">{benefit.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </motion.section>
    );
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [apiStatus, setApiStatus] = useState('Загрузка...');
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(null);

    const menuItems = [
        {id: 'home', label: 'ГЛАВНАЯ'}, 
        {id: 'about', label: 'ОБО МНЕ'}, 
        {id: 'projects', label: 'ПРОЕКТЫ'},
        {id: 'process', label: 'ПРОЦЕСС'},
        {id: 'pricing', label: 'ПРАЙС'},
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
                
                const [projectsRes, profileRes] = await Promise.allSettled([
                    fetch(`${API_URL}/projects/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/profile/`).then(r => r.ok ? r.json() : getMockProfile())
                ]);

                const projectsData = projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value) ? projectsRes.value : [];
                const profileData = profileRes.status === 'fulfilled' && profileRes.value ? profileRes.value : getMockProfile();

                setProjects(projectsData);
                setProfile(profileData);
                setApiStatus('Данные загружены');

            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setProfile(getMockProfile()); 
                setProjects([]);
                setApiStatus('Ошибка подключения к API');
            } finally { 
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({behavior: 'smooth'});
        setIsMenuOpen(false);
    };

    if (loading) return <LoadingScreen apiStatus={apiStatus} />;

    const safeProjects = Array.isArray(projects) ? projects : [];

    return (
        <HelmetProvider> {/* ВАЖНО: оборачиваем всё в HelmetProvider */}
            <div className="min-h-screen bg-black text-white font-sans">
                <SEO 
                    title="Разработчик сайтов | Создание Telegram ботов | Lua скрипты под ключ"
                    description="Профессиональный fullstack разработчик. Делаю сайты под ключ от 25.000₽, Telegram боты, мини-приложения, скрипты Lua. Гарантия 6 месяцев. Срок от 2 недель."
                    keywords="заказать сайт недорого, разработка сайтов москва, создать телеграм бота, программист на Lua, верстка макетов Figma, разработка мини-приложений, fullstack разработчик, веб-разработка под ключ"
                    ogUrl={window.location.href}
                    author={profile?.name || 'phax'}
                />
                
                <motion.nav 
                    className="fixed w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10"
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="container mx-auto px-6 py-5">
                        <div className="flex justify-between items-center">
                            <motion.div 
                                className="text-sm tracking-[0.2em] uppercase font-light cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                            >
                                {profile?.name?.split(' ')[0] || 'Portfolio'}
                            </motion.div>
                            <div className="hidden md:flex space-x-8">
                                {menuItems.map((item, index) => (
                                    <motion.button 
                                        key={item.id} 
                                        onClick={() => handleScroll(item.id)} 
                                        className="text-xs tracking-[0.15em] text-neutral-400 hover:text-white uppercase font-light relative group"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {item.label}
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-px bg-white"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.button>
                                ))}
                            </div>
                            <motion.button 
                                className="md:hidden text-neutral-400 hover:text-white transition-colors text-sm tracking-[0.2em] uppercase font-light"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMenuOpen ? 'ЗАКРЫТЬ' : 'МЕНЮ'}
                            </motion.button>
                        </div>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div 
                                    className="md:hidden mt-8 pb-8 space-y-6"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {menuItems.map((item, index) => (
                                        <motion.button 
                                            key={item.id} 
                                            onClick={() => handleScroll(item.id)} 
                                            className="block w-full text-left text-sm tracking-[0.15em] text-neutral-400 hover:text-white transition-colors uppercase font-light"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ x: 10 }}
                                        >
                                            {item.label}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>

                <HeroSection profile={profile} safeProjects={safeProjects} handleScroll={handleScroll}/>

                <motion.section 
                    id="about" 
                    className="py-32 border-t border-white/10 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 z-0 opacity-5">
                        <motion.div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{backgroundImage: `url(${background2})`, filter: 'grayscale(100%) blur(1px)'}}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <motion.h2 
                                className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-16 text-center font-light"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                ОБО МНЕ
                            </motion.h2>
                            
                            <div className="text-center space-y-12">
                                <motion.p 
                                    className="text-2xl md:text-4xl font-extralight leading-relaxed text-neutral-200 premium-text"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {profile?.bio || 'Информация о вас появится здесь после добавления в админ-панель.'}
                                </motion.p>
                                
                                {(profile?.email || profile?.location) && (
                                    <motion.div 
                                        className="flex flex-col sm:flex-row justify-center gap-8 pt-16 text-sm tracking-[0.15em] text-neutral-400 uppercase font-light"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                    >
                                        {profile?.email && (
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="px-6 py-3 border border-white/10 rounded-full hover:border-white/30 transition-all duration-300"
                                            >
                                                EMAIL: {profile.email}
                                            </motion.div>
                                        )}
                                        {profile?.location && (
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="px-6 py-3 border border-white/10 rounded-full hover:border-white/30 transition-all duration-300"
                                            >
                                                ЛОКАЦИЯ: {profile.location}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section 
                    id="projects" 
                    className="py-32 border-t border-white/10 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 z-0 opacity-10">
                        <motion.div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{backgroundImage: `url(${background3})`, filter: 'grayscale(100%) blur(1px)'}}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div 
                            className="text-center mb-24"
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-6 font-light">ПРОЕКТЫ</h2>
                            <p className="text-6xl md:text-8xl font-extralight tracking-tighter premium-text">
                                РАБОТЫ<span className="text-neutral-600">.</span>
                            </p>
                            <motion.p 
                                className="text-neutral-400 text-sm tracking-[0.2em] uppercase mt-6 font-light"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                СВАЙПАЙТЕ → ДЛЯ ПРОСМОТРА
                            </motion.p>
                        </motion.div>
                        <ProjectsSwiper projects={safeProjects} />
                    </div>
                </motion.section>

                <WorkProcess />

                <PricingSection />

                <motion.section 
                    id="contact" 
                    className="py-32 border-t border-white/10 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 z-0 opacity-5">
                        <motion.div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{backgroundImage: `url(${background3})`, filter: 'grayscale(100%) blur(1px)'}}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.h2 
                            className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-24 text-center font-light"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            КОНТАКТЫ
                        </motion.h2>
                        
                        <ContactForm />
                        
                        {(profile?.github_url || profile?.linkedin_url || profile?.telegram_url) && (
                            <motion.div 
                                className="flex flex-wrap justify-center gap-8 mt-24 text-xs tracking-[0.2em] uppercase font-light"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                {profile?.github_url && (
                                    <motion.a 
                                        href={profile.github_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-neutral-400 hover:text-white transition-colors relative group"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        GITHUB
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-px bg-white"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                )}
                                {profile?.linkedin_url && (
                                    <motion.a 
                                        href={profile.linkedin_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-neutral-400 hover:text-white transition-colors relative group"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        LINKEDIN
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-px bg-white"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                )}
                                {profile?.telegram_url && (
                                    <motion.a 
                                        href={profile.telegram_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-neutral-400 hover:text-white transition-colors relative group"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        TELEGRAM
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-px bg-white"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.a>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.section>

                <motion.footer 
                    className="py-16 border-t border-white/10 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="container mx-auto px-6">
                        <div className="text-center space-y-6">
                            <motion.p 
                                className="text-xs tracking-[0.2em] text-neutral-500 uppercase font-light"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                © {new Date().getFullYear()} {profile?.name || 'phax'}
                            </motion.p>
                            <motion.p 
                                className="text-xs text-neutral-700 font-light"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                MADE BY DEV
                            </motion.p>
                            <motion.p 
                                className="text-xs text-neutral-800 tracking-[0.15em] font-light"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Статус API: {apiStatus}
                            </motion.p>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </HelmetProvider>
    );
};

export default Portfolio;