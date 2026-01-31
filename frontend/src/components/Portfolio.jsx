import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import background1 from './background1.png';
import background2 from './background2.png';
import background3 from './background3.png';
import background4 from './background4.png';
import background5 from './background5.png';

const SEO = ({ title = "Разработка сайтов и ботов под ключ | Full Stack Developer", description = "Профессиональная разработка сайтов, Telegram ботов, скриптов Lua. Создание сайтов под ключ, верстка макетов, мини-приложения в Telegram. Фиксированные цены, гарантия качества.", keywords = "разработка сайтов, создание сайтов, telegram боты, Lua скрипты, верстка макетов, мини-приложения, fullstack разработчик, заказать сайт", ogImage = "/og-image.jpg", ogUrl = "https://phax.online", type = "website", author = "phax" }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={ogUrl} />
      <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org","@type": "ProfessionalService","name": "Разработка сайтов и ботов под ключ","description": description,"url": ogUrl,"logo": `${ogUrl}/logo.png`,"address": {"@type": "PostalAddress","addressCountry": "RU"},"service": [{"@type": "Service","name": "Разработка сайтов","description": "Создание сайтов под ключ с современным дизайном и адаптивной версткой"},{"@type": "Service","name": "Telegram боты","description": "Разработка интеллектуальных ботов для автоматизации бизнеса"},{"@type": "Service","name": "Lua скрипты","description": "Создание скриптов для игровых серверов и автоматизации"}],"offers": {"@type": "AggregateOffer","priceCurrency": "RUB","lowPrice": "15000","highPrice": "150000","offerCount": "6"}})}</script>
    </Helmet>
  );
};

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className={`relative w-16 h-8 rounded-full transition-all duration-500 ${isDark ? 'bg-neutral-800' : 'bg-blue-200'} border-2 ${isDark ? 'border-neutral-600' : 'border-blue-300'}`} aria-label="Переключить тему">
      <motion.div className={`absolute top-1 w-5 h-5 rounded-full flex items-center justify-center ${isDark ? 'bg-white' : 'bg-yellow-400'}`} animate={{ left: isDark ? '4px' : '32px', rotate: isDark ? 0 : 360 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        {isDark ? (<svg className="w-3 h-3 text-neutral-800" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>) : (<svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>)}
      </motion.div>
    </motion.button>
  );
};

const ProcessIcons = {
    Consultation: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>),
    Prototype: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>),
    Development: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>),
    Testing: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    Launch: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
    Support: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>),
    Transparency: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>),
    Communication: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    Quality: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>)
};

const PricingIcons = {
    Website: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>),
    Layout: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>),
    Lua: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>),
    TelegramBot: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    MiniApp: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>),
    ConsultationPricing: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>),
    FixedPrice: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    Speed: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
    Warranty: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
    Support24: ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
};


const ContactForm = ({ isDark }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

    const borderColor = isDark ? 'border-neutral-800' : 'border-gray-300';
    const focusBorder = isDark ? 'focus:border-neutral-600' : 'focus:border-blue-500';
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const placeholderColor = isDark ? 'placeholder-neutral-600' : 'placeholder-gray-400';

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-8">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <input type="text" name="name" placeholder="ИМЯ / USERNAME" value={formData.name} onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.name ? 'border-red-500' : borderColor} ${focusBorder} focus:outline-none transition-colors ${textColor} ${placeholderColor} text-sm tracking-widest uppercase`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.name}</p>}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <input type="email" name="email" placeholder="EMAIL" value={formData.email} onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.email ? 'border-red-500' : borderColor} ${focusBorder} focus:outline-none transition-colors ${textColor} ${placeholderColor} text-sm tracking-widest uppercase`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.email}</p>}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <textarea name="message" placeholder="СООБЩЕНИЕ" rows="6" value={formData.message} onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.message ? 'border-red-500' : borderColor} ${focusBorder} focus:outline-none transition-colors ${textColor} ${placeholderColor} resize-none text-sm tracking-widest uppercase`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.message}</p>}
                </motion.div>
                {submitStatus && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 text-center text-sm tracking-wide ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {submitStatus.message}
                    </motion.div>
                )}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={isSubmitting}
                    className={`w-full py-5 border-2 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'} text-sm tracking-widest uppercase transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                </motion.button>
            </motion.div>
        </div>
    );
};

const LoadingSpinner = ({ isDark }) => (
    <div className="relative w-32 h-32 mx-auto mb-8">
        <div className={`absolute inset-0 border-4 ${isDark ? 'border-white/30' : 'border-gray-300'} rounded-full`}></div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 ${isDark ? 'bg-white' : 'bg-gray-900'} origin-center`}></motion.div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'bg-white' : 'bg-gray-900'} rounded-full`}></div>
    </div>
);

const CodeIconAnimation = ({ isDark }) => (
    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: 'spring' }} className="relative w-32 h-32 mx-auto mb-8">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className={`absolute top-1/2 left-1/4 text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{'{'}</motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className={`absolute top-1/2 right-1/4 text-3xl ${isDark ? 'text-white' : 'text-gray-900'}`}>{'}'}</motion.div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-mono`}>
            <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>code</motion.span>
        </div>
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className={`absolute top-1/4 left-1/2 w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-900'} rounded-full`}></motion.div>
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} className={`absolute bottom-1/4 right-1/3 w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-900'} rounded-full`}></motion.div>
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.4 }} className={`absolute bottom-1/4 left-1/3 w-2 h-2 ${isDark ? 'bg-white' : 'bg-gray-900'} rounded-full`}></motion.div>
    </motion.div>
);

const LoadingScreen = ({ apiStatus, isDark }) => (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="text-center">
            <LoadingSpinner isDark={isDark} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm tracking-widest uppercase mb-4`}>{apiStatus}</motion.p>
            <p className={`${isDark ? 'text-neutral-600' : 'text-gray-400'} text-xs`}>API: Текущий адрес: {window.location.hostname}:{window.location.port}</p>
        </div>
    </div>
);


const HeroSection = ({ profile, safeProjects, handleScroll, isDark }) => {
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const mutedColor = isDark ? 'text-neutral-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-white' : 'border-gray-900';
    const borderMuted = isDark ? 'border-neutral-700' : 'border-gray-300';
    const hoverBg = isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-gray-900 hover:text-white';
    const hoverBorder = isDark ? 'hover:border-white hover:text-white' : 'hover:border-gray-900 hover:text-gray-900';

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
                <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background1})`, filter: 'grayscale(100%) blur(1px)'}}></motion.div>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center space-y-12">
                    <CodeIconAnimation isDark={isDark} />
                    <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className={`text-5xl md:text-7xl font-light tracking-tight ${textColor}`}>
                        {profile?.name || 'Разработчик'}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className={`text-sm tracking-widest ${mutedColor} uppercase`}>
                        {profile?.title || 'Full Stack Developer'}
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="flex justify-center gap-16 pt-8">
                        {[
                            { value: safeProjects.length, label: 'Проектов' },
                            { value: '3+', label: 'Года опыта' },
                            { value: '6', label: 'Услуг' }
                        ].map((stat, idx) => (
                            <motion.div key={idx} whileHover={{ scale: 1.1 }} className="text-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 + idx * 0.1, type: 'spring' }} className={`text-4xl font-light mb-2 ${textColor}`}>{stat.value}</motion.div>
                                <div className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase`}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="flex justify-center gap-6 pt-12">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleScroll('contact')} className={`px-10 py-4 border-2 ${borderColor} ${textColor} text-sm tracking-widest uppercase ${hoverBg} transition-all duration-300`}>СВЯЗАТЬСЯ</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleScroll('pricing')} className={`px-10 py-4 border-2 ${borderMuted} ${mutedColor} text-sm tracking-widest uppercase ${hoverBorder} transition-all duration-300`}>ПРАЙС</motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, isActive, isDark }) => {
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

    const bgGradient = isDark ? 'from-black to-neutral-900' : 'from-white to-gray-50';
    const borderColor = isActive ? (isDark ? 'border-white' : 'border-gray-900') : (isDark ? 'border-neutral-800' : 'border-gray-200');
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const mutedColor = isDark ? 'text-neutral-400' : 'text-gray-600';
    const techBorder = isDark ? 'border-neutral-800 hover:border-white hover:bg-white/5' : 'border-gray-200 hover:border-gray-900 hover:bg-gray-100';

    return (
        <motion.div ref={cardRef} initial={{ opacity: 0, x: 100, rotateY: -15 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} whileHover={{ scale: 1.02, rotateY: 2 }} className={`relative bg-gradient-to-br ${bgGradient} border-2 ${borderColor} rounded-2xl p-8 transition-all duration-500 group`}>
            {isActive && <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent ${isDark ? 'via-white/5' : 'via-gray-900/5'} to-transparent`}></motion.div>}
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase`}>{project.year || new Date().getFullYear()}</motion.span>
                    {isActive && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className={`px-3 py-1 ${isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'} text-xs tracking-widest rounded-full`}>ACTIVE</motion.span>}
                </div>
                <motion.h3 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className={`text-3xl md:text-4xl font-light mb-4 tracking-tight ${textColor}`}>{project.title || 'Проект без названия'}</motion.h3>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`${mutedColor} mb-8 leading-relaxed`}>{project.short_description || project.description || 'Описание проекта будет добавлено позже'}</motion.p>
                {technologies.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 mb-8">
                        {technologies.map((tech, index) => (
                            <motion.span key={index} whileHover={{ scale: 1.1, rotate: 2 }} className={`px-4 py-2 border ${techBorder} rounded-full text-sm tracking-wider transition-all duration-300 ${textColor}`}>{tech}</motion.span>
                        ))}
                    </motion.div>
                )}
                <div className="flex gap-6">
                    {project.github_url && <motion.a whileHover={{ x: 5 }} href={project.github_url} target="_blank" rel="noopener noreferrer" className={`text-sm tracking-widest uppercase ${mutedColor} transition-colors group/link`}><span className={`border-b border-transparent group-hover/link:${isDark ? 'border-white text-white' : 'border-gray-900 text-gray-900'}`}>GITHUB</span></motion.a>}
                    {project.live_url && <motion.a whileHover={{ x: 5 }} href={project.live_url} target="_blank" rel="noopener noreferrer" className={`text-sm tracking-widest uppercase ${mutedColor} transition-colors group/link`}><span className={`border-b border-transparent group-hover/link:${isDark ? 'border-white text-white' : 'border-gray-900 text-gray-900'}`}>ДЕМО</span></motion.a>}
                </div>
            </div>
        </motion.div>
    );
};


const ProjectsSwiper = ({ projects, isDark }) => {
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

    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const mutedColor = isDark ? 'text-neutral-600' : 'text-gray-400';
    const progressBg = isDark ? 'bg-neutral-800' : 'bg-gray-200';
    const progressFill = isDark ? 'bg-white' : 'bg-gray-900';
    const borderColor = isDark ? 'border-neutral-800 hover:border-white' : 'border-gray-200 hover:border-gray-900';

    return (
        <div className="relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center mb-12">
                <div className="flex items-center gap-4">
                    <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className={`text-3xl font-light ${textColor}`}>{String(currentIndex + 1).padStart(2, '0')}</motion.span>
                    <div className={`w-32 h-0.5 ${progressBg}`}>
                        <motion.div className={`h-full ${progressFill}`} initial={{width: 0}} animate={{width: `${((currentIndex + 1) / displayProjects.length) * 100}%`}} transition={{duration: 0.5}}/>
                    </div>
                    <span className={`text-3xl font-light ${mutedColor}`}>{String(displayProjects.length).padStart(2, '0')}</span>
                </div>
            </motion.div>
            <div className="relative overflow-hidden py-8">
                <div className="flex justify-center">
                    <div className="relative w-full max-w-4xl">
                        <div className="relative z-10 mx-auto" style={{width: '100%'}}>
                            <AnimatePresence mode="wait">
                                <motion.div key={currentIndex} initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} exit={{x: -100, opacity: 0}} transition={{duration: 0.5}}>
                                    <ProjectCard project={displayProjects[currentIndex]} isActive={true} isDark={isDark}/>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-12 px-4">
                <motion.button whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }} onClick={handlePrev} className={`w-12 h-12 border-2 ${borderColor} rounded-full flex items-center justify-center transition-all duration-300 ${textColor}`}>←</motion.button>
                <div className="flex gap-2">
                    {displayProjects.map((_, index) => (
                        <motion.button key={index} whileHover={{ scale: 1.2 }} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? `${progressFill} w-8` : `${isDark ? 'bg-neutral-600 hover:bg-neutral-400' : 'bg-gray-300 hover:bg-gray-500'} w-2`}`}/>
                    ))}
                </div>
                <motion.button whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} onClick={handleNext} className={`w-12 h-12 border-2 ${borderColor} rounded-full flex items-center justify-center transition-all duration-300 ${textColor}`}>→</motion.button>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-8">
                <p className={`${mutedColor} text-xs tracking-widest uppercase`}>← КЛИК / КЛАВИШИ →</p>
                <p className={`${isDark ? 'text-neutral-700' : 'text-gray-300'} text-xs mt-2`}>АВТОПРОКРУТКА КАЖДЫЕ 5С</p>
            </motion.div>
        </div>
    );
};


const WorkProcess = ({ isDark }) => {
    const [activeStep, setActiveStep] = useState(0);
    const processSteps = [
        { number: '01', title: 'КОНСУЛЬТАЦИЯ', description: 'Обсуждение проекта, анализ требований, определение сроков и бюджета', duration: '1-2 дня', icon: 'Consultation' },
        { number: '02', title: 'ПРОТОТИП', description: 'Создание wireframes и прототипа для визуализации концепции', duration: '3-5 дней', icon: 'Prototype' },
        { number: '03', title: 'РАЗРАБОТКА', description: 'Поэтапная разработка с регулярными демонстрациями прогресса', duration: 'Зависит от проекта', icon: 'Development' },
        { number: '04', title: 'ТЕСТИРОВАНИЕ', description: 'Всестороннее тестирование и финальные корректировки', duration: '3-7 дней', icon: 'Testing' },
        { number: '05', title: 'ЗАПУСК', description: 'Деплой проекта, документация и обучение использованию', duration: '1-2 дня', icon: 'Launch' },
        { number: '06', title: 'ПОДДЕРЖКА', description: 'Техническая поддержка и дальнейшее развитие проекта', duration: 'Постоянно', icon: 'Support' }
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

    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const mutedColor = isDark ? 'text-neutral-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-neutral-900' : 'border-gray-100';
    const cardBg = isDark ? 'from-black to-neutral-900' : 'from-white to-gray-50';
    const iconBorder = isDark ? 'border-neutral-700' : 'border-gray-200';
    const iconBg = isDark ? 'bg-black' : 'bg-white';

    return (
        <section id="process" className={`py-32 border-t ${borderColor} relative overflow-hidden`}>
            <div className="absolute inset-0 z-0 opacity-5">
                <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background4})`, filter: 'grayscale(100%)'}}></motion.div>
            </div>
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div key={i} animate={{ x: ['-100%', '100%'] }} transition={{ duration: 15, repeat: Infinity, delay: i * 1 }} className={`absolute h-px bg-gradient-to-r from-transparent ${isDark ? 'via-white/5' : 'via-gray-900/5'} to-transparent`} style={{ top: `${30 + i * 20}%`, width: '100%' }}></motion.div>
                ))}
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <h2 className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase mb-4 text-center`}>ПРОЦЕСС</h2>
                    <p className={`text-5xl md:text-7xl font-light tracking-tight text-center mb-12 ${textColor}`}>РАБОТЫ<span className={mutedColor}>.</span></p>
                    <p className={`${mutedColor} text-sm tracking-widest uppercase text-center mb-20 max-w-2xl mx-auto`}>ОТ ИДЕИ ДО ЗАПУСКА: 6 КЛЮЧЕВЫХ ЭТАПОВ</p>
                </motion.div>
                <div className="max-w-6xl mx-auto">
                    <div className="hidden lg:flex items-center justify-between mb-20 relative">
                        {processSteps.map((step, index) => {
                            const IconComponent = ProcessIcons[step.icon];
                            return (
                                <motion.div key={step.number} className="relative z-10" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveStep(index)} className={`flex flex-col items-center transition-all duration-500 ${activeStep === index ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}>
                                        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-300 ${activeStep === index ? `${isDark ? 'border-white bg-white text-black' : 'border-gray-900 bg-gray-900 text-white'}` : `${iconBorder} ${iconBg} ${textColor}`}`}>
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                        <div className={`text-xs tracking-widest uppercase mb-2 transition-colors ${activeStep === index ? textColor : (isDark ? 'text-neutral-500' : 'text-gray-400')}`}>{step.number}</div>
                                        <h3 className={`text-sm tracking-widest uppercase text-center transition-colors ${activeStep === index ? textColor : mutedColor}`}>{step.title}</h3>
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="lg:hidden space-y-8 mb-12">
                        {processSteps.map((step, index) => {
                            const IconComponent = ProcessIcons[step.icon];
                            return (
                                <motion.div key={step.number} className="relative" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                                    {index < processSteps.length - 1 && (<div className={`absolute left-8 top-16 bottom-0 w-0.5 ${isDark ? 'bg-neutral-800' : 'bg-gray-200'} -translate-x-1/2`}></div>)}
                                    <motion.button whileHover={{ scale: 1.02 }} onClick={() => setActiveStep(index)} className={`flex items-start gap-6 w-full p-6 rounded-2xl transition-all duration-300 ${activeStep === index ? `bg-gradient-to-br ${cardBg} border-2 ${isDark ? 'border-white' : 'border-gray-900'}` : `border ${iconBorder} hover:${isDark ? 'border-neutral-600' : 'border-gray-300'}`}`}>
                                        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${activeStep === index ? `${isDark ? 'border-white bg-white text-black' : 'border-gray-900 bg-gray-900 text-white'}` : `${iconBorder} ${iconBg}`}`}>
                                            <IconComponent className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className={`text-sm tracking-widest uppercase ${activeStep === index ? textColor : (isDark ? 'text-neutral-500' : 'text-gray-400')}`}>{step.number}</span>
                                                <h3 className={`text-lg tracking-widest uppercase ${textColor}`}>{step.title}</h3>
                                            </div>
                                            <p className={`text-sm mb-3 ${activeStep === index ? (isDark ? 'text-neutral-300' : 'text-gray-700') : (isDark ? 'text-neutral-500' : 'text-gray-500')}`}>{step.description}</p>
                                            <div className={`text-xs tracking-widest uppercase ${activeStep === index ? mutedColor : (isDark ? 'text-neutral-600' : 'text-gray-400')}`}>Длительность: {step.duration}</div>
                                        </div>
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="hidden lg:block">
                        <motion.div key={activeStep} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className={`bg-gradient-to-br ${cardBg} border-2 ${iconBorder} rounded-3xl p-12`}>
                            <div className="grid md:grid-cols-3 gap-12 items-center">
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-6 mb-8">
                                        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className={`text-6xl font-light ${textColor}`}>{processSteps[activeStep].number}</motion.div>
                                        <div>
                                            <h3 className={`text-3xl font-light mb-2 ${textColor}`}>{processSteps[activeStep].title}</h3>
                                            <p className={`text-sm tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase`}>Этап {activeStep + 1} из {processSteps.length}</p>
                                        </div>
                                    </div>
                                    <p className={`text-xl ${isDark ? 'text-neutral-300' : 'text-gray-700'} mb-8 leading-relaxed`}>{processSteps[activeStep].description}</p>
                                    <div className="flex items-center gap-8">
                                        <div className={`px-6 py-3 border ${iconBorder} rounded-full`}><span className={`text-sm tracking-widest uppercase ${textColor}`}>Длительность: {processSteps[activeStep].duration}</span></div>
                                        <div className={`px-6 py-3 border ${iconBorder} rounded-full`}><span className={`text-sm tracking-widest uppercase ${textColor}`}>Результат: {activeStep === 5 ? 'Поддержка' : 'Следующий этап'}</span></div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className={`w-64 h-64 rounded-full border-4 ${isDark ? 'border-white/10' : 'border-gray-900/10'} flex items-center justify-center`}>
                                            <div className={`w-48 h-48 rounded-full border-4 ${isDark ? 'border-white/20' : 'border-gray-900/20'} flex items-center justify-center`}>
                                                <div className={`w-32 h-32 rounded-full border-4 ${isDark ? 'border-white/30' : 'border-gray-900/30'} flex items-center justify-center ${textColor}`}>
                                                    {(() => {
                                                        const IconComponent = ProcessIcons[processSteps[activeStep].icon];
                                                        return <IconComponent className="w-16 h-16" />;
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className={`absolute inset-0 rounded-full border-4 border-transparent ${isDark ? 'border-t-white/5' : 'border-t-gray-900/5'}`}></motion.div>
                                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className={`absolute inset-0 rounded-full border-4 border-transparent ${isDark ? 'border-r-white/5' : 'border-r-gray-900/5'}`}></motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="flex justify-center gap-8 mt-12">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveStep(prev => prev === 0 ? processSteps.length - 1 : prev - 1)} className={`w-12 h-12 border-2 ${iconBorder} rounded-full flex items-center justify-center ${isDark ? 'hover:border-white' : 'hover:border-gray-900'} transition-all duration-300 ${textColor}`}>←</motion.button>
                            <div className="flex items-center gap-4">
                                <span className={`text-2xl font-light ${textColor}`}>{String(activeStep + 1).padStart(2, '0')}</span>
                                <div className={`w-48 h-0.5 ${isDark ? 'bg-neutral-800' : 'bg-gray-200'}`}>
                                    <motion.div className={`h-full ${isDark ? 'bg-white' : 'bg-gray-900'}`} initial={{ width: 0 }} animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }} transition={{ duration: 0.5 }}/>
                                </div>
                                <span className={`text-2xl font-light ${mutedColor}`}>{String(processSteps.length).padStart(2, '0')}</span>
                            </div>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveStep(prev => (prev + 1) % processSteps.length)} className={`w-12 h-12 border-2 ${iconBorder} rounded-full flex items-center justify-center ${isDark ? 'hover:border-white' : 'hover:border-gray-900'} transition-all duration-300 ${textColor}`}>→</motion.button>
                        </div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className={`mt-20 pt-20 border-t ${borderColor}`}>
                        <div className="grid md:grid-cols-3 gap-8">
                            {processStats.map((stat, index) => {
                                const IconComponent = ProcessIcons[stat.icon];
                                return (
                                    <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} className={`text-center p-8 border ${iconBorder} rounded-3xl`}>
                                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className={`flex justify-center mb-4 ${textColor}`}><IconComponent className="w-8 h-8" /></motion.div>
                                        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: 'spring', delay: index * 0.1 }} viewport={{ once: true }} className={`text-5xl font-light mb-4 ${textColor}`}>{stat.value}</motion.div>
                                        <h4 className={`text-sm tracking-widest uppercase mb-2 ${textColor}`}>{stat.title}</h4>
                                        <p className={`${mutedColor} text-sm`}>{stat.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


const PricingSection = ({ isDark }) => {
    const [activeService, setActiveService] = useState(0);
    const services = [
        { id: 1, title: 'РАЗРАБОТКА САЙТОВ ПОД КЛЮЧ', description: 'Полный цикл разработки от дизайна до запуска. Современные технологии, адаптивная верстка, SEO-оптимизация.', price: 'от 45 000 ₽', priceRange: '45 000 - 120 000 ₽', features: ['Адаптивный дизайн (мобильные + десктоп)', 'CMS для самостоятельного управления', 'Интеграция с соц. сетями и аналитикой', 'SEO-оптимизация под поисковые системы', 'Техническая поддержка 3 месяца', 'Хостинг на 1 год в подарок'], timeline: '2-4 недели', icon: 'Website', popular: true },
        { id: 2, title: 'ВЕРСТКА С МАКЕТА', description: 'Точная верстка Figma/PSD макетов. Чистый код, Pixel Perfect, кроссбраузерная совместимость.', price: 'от 25 000 ₽', priceRange: '25 000 - 60 000 ₽', features: ['Pixel Perfect верстка', 'Анимации и интерактивные элементы', 'Кроссбраузерная совместимость', 'Оптимизация скорости загрузки', 'Валидный HTML5/CSS3 код', 'Адаптив под все устройства'], timeline: '1-2 недели', icon: 'Layout', popular: false },
        { id: 3, title: 'РАЗРАБОТКА СКРИПТОВ LUA', description: 'Скрипты для игр (Garrys Mod, World of Warcraft, FiveM), автоматизация процессов, игровые модификации.', price: 'от 15 000 ₽', priceRange: '15 000 - 40 000 ₽', features: ['Скрипты для игровых серверов', 'Автоматизация рутинных задач', 'Создание игровых модификаций', 'Интеграция с игровыми API', 'Оптимизация производительности', 'Тестирование и отладка'], timeline: '1-3 недели', icon: 'Lua', popular: false },
        { id: 4, title: 'НАПИСАНИЕ БОТОВ TELEGRAM', description: 'Умные боты для автоматизации бизнеса, рассылок, опросов, интеграции с CRM и платежными системами.', price: 'от 30 000 ₽', priceRange: '30 000 - 80 000 ₽', features: ['Боты для бизнеса и личного использования', 'Интеграция с платежными системами', 'Рассылки и автоматические ответы', 'Поддержка Inline режима', 'Панель администратора', 'Ведение базы данных пользователей'], timeline: '2-3 недели', icon: 'TelegramBot', popular: false },
        { id: 5, title: 'MINIAPPS В TELEGRAM', description: 'Мини-приложения внутри Telegram для бизнеса, игр, образовательных платформ с интеграцией TON.', price: 'от 50 000 ₽', priceRange: '50 000 - 150 000 ₽', features: ['Полная интеграция с Telegram API', 'Поддержка TON криптовалюты', 'Web App внутри мессенджера', 'Push-уведомления и алерты', 'Мультиязычность', 'Масштабируемая архитектура'], timeline: '3-5 недель', icon: 'MiniApp', popular: false },
        { id: 6, title: 'КОНСУЛЬТАЦИЯ И АУДИТ', description: 'Технический аудит существующих проектов, консультации по разработке, помощь с выбором технологий.', price: 'от 5 000 ₽', priceRange: '5 000 - 20 000 ₽', features: ['Анализ текущего кода и архитектуры', 'Рекомендации по оптимизации', 'Обзор подходящих технологий', 'Помощь с выбором стека', 'Code review существующего проекта', 'Рекомендации по безопасности'], timeline: '1-3 дня', icon: 'ConsultationPricing', popular: false }
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

    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const mutedColor = isDark ? 'text-neutral-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-neutral-900' : 'border-gray-100';
    const cardBg = isDark ? 'from-black/50 to-neutral-900/50' : 'from-white/50 to-gray-50/50';
    const activeBg = isDark ? 'from-black to-neutral-900' : 'from-white to-gray-50';
    const iconBorder = isDark ? 'border-neutral-800' : 'border-gray-200';

    return (
        <section id="pricing" className={`py-32 border-t ${borderColor} relative overflow-hidden`}>
            <div className="absolute inset-0 z-0 opacity-5">
                <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background5})`, filter: 'grayscale(100%) blur(1px)'}}></motion.div>
            </div>
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <motion.div key={i} className={`absolute w-px h-32 bg-gradient-to-b from-transparent ${isDark ? 'via-white/5' : 'via-gray-900/5'} to-transparent`} initial={{ y: -100, opacity: 0 }} animate={{ y: ['-100%', '200%'], opacity: [0, 0.3, 0] }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: 'loop' }} style={{ left: `${10 + i * 12}%` }}/>
                ))}
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <h2 className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase mb-4 text-center`}>СТОИМОСТЬ</h2>
                    <p className={`text-5xl md:text-7xl font-light tracking-tight text-center mb-12 ${textColor}`}>УСЛУГИ<span className={mutedColor}>.</span></p>
                    <p className={`${mutedColor} text-sm tracking-widest uppercase text-center mb-20 max-w-2xl mx-auto`}>ПРОЗРАЧНЫЕ ЦЕНЫ • ФИКСИРОВАННЫЙ БЮДЖЕТ • ГАРАНТИЯ КАЧЕСТВА</p>
                </motion.div>
                <div className="max-w-6xl mx-auto">
                    <div className="flex overflow-x-auto pb-8 mb-12 hide-scrollbar lg:overflow-visible lg:grid lg:grid-cols-3 lg:gap-8">
                        {services.map((service, index) => {
                            const IconComponent = PricingIcons[service.icon];
                            return (
                                <motion.button key={service.id} onClick={() => setActiveService(index)} initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -5 }} className={`flex-shrink-0 w-80 lg:w-auto mx-2 lg:mx-0 rounded-2xl p-8 transition-all duration-500 ${activeService === index ? `bg-gradient-to-br ${activeBg} border-2 ${isDark ? 'border-white' : 'border-gray-900'} transform scale-105` : `bg-gradient-to-br ${cardBg} border ${iconBorder} ${isDark ? 'hover:border-neutral-600' : 'hover:border-gray-300'}`}`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <motion.div animate={{ rotate: activeService === index ? [0, 5, -5, 0] : 0 }} transition={{ duration: 2, repeat: Infinity }} className={`${textColor}`}><IconComponent className="w-10 h-10" /></motion.div>
                                        {service.popular && (<span className={`px-3 py-1 ${isDark ? 'bg-white text-black' : 'bg-gray-900 text-white'} text-xs tracking-widest rounded-full`}>ПОПУЛЯРНО</span>)}
                                    </div>
                                    <h3 className={`text-xl font-light mb-4 text-left tracking-tight ${textColor}`}>{service.title}</h3>
                                    <div className="text-left mb-6">
                                        <div className={`text-3xl font-light mb-2 ${textColor}`}>{service.price}</div>
                                        <div className={`text-sm ${mutedColor}`}>Диапазон: {service.priceRange}</div>
                                    </div>
                                    <div className="text-left">
                                        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'} mb-4`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Срок: {service.timeline}</span>
                                        </div>
                                        {activeService === index && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className={`mt-4 pt-4 border-t ${iconBorder}`}>
                                                <p className={`text-sm ${isDark ? 'text-neutral-300' : 'text-gray-700'} mb-3`}>{service.description}</p>
                                                <div className={`text-xs ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                                                    {service.features.slice(0, 2).map((feature, i) => (
                                                        <div key={i} className="flex items-center gap-2 mb-1">
                                                            <svg className={`w-3 h-3 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
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
                    </div>
                    <motion.div key={activeService} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className={`bg-gradient-to-br ${activeBg} border-2 ${iconBorder} rounded-3xl p-8 lg:p-12 mb-12`}>
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <div className="flex items-center gap-6 mb-8">
                                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className={`text-5xl ${textColor}`}>
                                        {(() => {
                                            const IconComponent = PricingIcons[services[activeService].icon];
                                            return <IconComponent className="w-12 h-12" />;
                                        })()}
                                    </motion.div>
                                    <div>
                                        <h3 className={`text-3xl font-light mb-2 ${textColor}`}>{services[activeService].title}</h3>
                                        <div className="flex items-center gap-4">
                                            <div className={`text-2xl font-light ${textColor}`}>{services[activeService].price}</div>
                                            <div className={`px-3 py-1 border ${iconBorder} rounded-full text-sm ${textColor}`}>Срок: {services[activeService].timeline}</div>
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-xl ${isDark ? 'text-neutral-300' : 'text-gray-700'} mb-8 leading-relaxed`}>{services[activeService].description}</p>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <motion.div whileHover={{ scale: 1.05 }} className={`p-4 border ${iconBorder} rounded-2xl`}>
                                        <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'} mb-1`}>Диапазон цен</div>
                                        <div className={`text-lg font-light ${textColor}`}>{services[activeService].priceRange}</div>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} className={`p-4 border ${iconBorder} rounded-2xl`}>
                                        <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'} mb-1`}>Срок выполнения</div>
                                        <div className={`text-lg font-light ${textColor}`}>{services[activeService].timeline}</div>
                                    </motion.div>
                                </div>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className={`w-full py-4 border-2 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'} text-sm tracking-widest uppercase transition-all duration-300`}>ЗАКАЗАТЬ ЭТУ УСЛУГУ</motion.button>
                            </div>
                            <div>
                                <h4 className={`text-xl font-light mb-6 tracking-widest uppercase ${textColor}`}>Что входит в услугу:</h4>
                                <div className="space-y-4">
                                    {services[activeService].features.map((feature, index) => (
                                        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ x: 5 }} className={`flex items-start gap-3 p-4 border ${iconBorder} rounded-2xl ${isDark ? 'hover:border-white' : 'hover:border-gray-900'} transition-colors`}>
                                            <div className={`w-6 h-6 rounded-full border ${isDark ? 'border-white' : 'border-gray-900'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                <svg className={`w-3 h-3 ${isDark ? 'text-white' : 'text-gray-900'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span className={isDark ? 'text-neutral-300' : 'text-gray-700'}>{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className={`mt-8 p-6 border ${iconBorder} rounded-2xl ${isDark ? 'bg-black/30' : 'bg-gray-50'}`}>
                                    <h5 className={`text-sm tracking-widest uppercase mb-3 ${mutedColor}`}>ДОПОЛНИТЕЛЬНО</h5>
                                    <ul className={`space-y-2 text-sm ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>
                                        {['Бесплатная консультация перед началом', 'Фиксированная цена без скрытых платежей', 'Техническая поддержка после сдачи проекта', 'Гарантия на код 6 месяцев'].map((item, idx) => (
                                            <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center gap-2">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="flex justify-between items-center mb-12">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveService(prev => prev === 0 ? services.length - 1 : prev - 1)} className={`w-12 h-12 border-2 ${iconBorder} rounded-full flex items-center justify-center ${isDark ? 'hover:border-white' : 'hover:border-gray-900'} transition-all duration-300 ${textColor}`}>←</motion.button>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className={`text-3xl font-light ${textColor}`}>{String(activeService + 1).padStart(2, '0')}</div>
                                <div className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase`}>Услуга</div>
                            </div>
                            <div className={`w-48 h-0.5 ${isDark ? 'bg-neutral-800' : 'bg-gray-200'}`}>
                                <motion.div className={`h-full ${isDark ? 'bg-white' : 'bg-gray-900'}`} initial={{ width: 0 }} animate={{ width: `${((activeService + 1) / services.length) * 100}%` }} transition={{ duration: 0.5 }}/>
                            </div>
                            <div className="text-center">
                                <div className={`text-3xl font-light ${mutedColor}`}>{String(services.length).padStart(2, '0')}</div>
                                <div className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase`}>Всего</div>
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setActiveService(prev => (prev + 1) % services.length)} className={`w-12 h-12 border-2 ${iconBorder} rounded-full flex items-center justify-center ${isDark ? 'hover:border-white' : 'hover:border-gray-900'} transition-all duration-300 ${textColor}`}>→</motion.button>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className={`mt-20 pt-20 border-t ${borderColor}`}>
                        <h3 className={`text-2xl font-light text-center mb-12 tracking-widest uppercase ${textColor}`}>ПОЧЕМУ ВЫБИРАЮТ НАС</h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            {benefits.map((benefit, index) => {
                                const IconComponent = PricingIcons[benefit.icon];
                                return (
                                    <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -5 }} className={`text-center p-6 border ${iconBorder} rounded-2xl`}>
                                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className={`flex justify-center mb-4 ${textColor}`}><IconComponent className="w-8 h-8" /></motion.div>
                                        <h4 className={`text-sm tracking-widest uppercase mb-2 ${textColor}`}>{benefit.title}</h4>
                                        <p className={`${mutedColor} text-xs`}>{benefit.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
            <style jsx global>{`
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};


const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [apiStatus, setApiStatus] = useState('Загрузка...');
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isDark, setIsDark] = useState(true);

    const menuItems = [
        {id: 'home', label: 'ГЛАВНАЯ'}, {id: 'about', label: 'ОБО МНЕ'}, {id: 'projects', label: 'ПРОЕКТЫ'},
        {id: 'process', label: 'ПРОЦЕСС'}, {id: 'pricing', label: 'ПРАЙС'}, {id: 'contact', label: 'КОНТАКТЫ'}
    ];

    const getMockProfile = () => ({
        name: 'Алексей Петров', title: 'Full Stack Developer', bio: 'Добавьте информацию о себе в админ-панель Django',
        email: 'example@email.com', phone: '', location: '', github_url: '', linkedin_url: '', telegram_url: '', photo: ''
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setIsDark(savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

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
                setProjects(projectsData); setProfile(profileData); setApiStatus('Данные загружены');
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setProfile(getMockProfile()); setProjects([]); setApiStatus('Ошибка подключения к API');
            } finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({behavior: 'smooth'});
        setIsMenuOpen(false);
    };

    if (loading) return <LoadingScreen apiStatus={apiStatus} isDark={isDark} />;

    const safeProjects = Array.isArray(projects) ? projects : [];
    const bgColor = isDark ? 'bg-black' : 'bg-white';
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const mutedColor = isDark ? 'text-neutral-400' : 'text-gray-600';
    const borderColor = isDark ? 'border-neutral-900' : 'border-gray-100';
    const navBg = isDark ? 'bg-black/95' : 'bg-white/95';

    return (
        <HelmetProvider>
            <div className={`min-h-screen ${bgColor} ${textColor} font-sans transition-colors duration-500`}>
                <SEO title="Разработчик сайтов | Создание Telegram ботов | Lua скрипты под ключ" description="Профессиональный fullstack разработчик. Делаю сайты под ключ от 25.000₽, Telegram боты, мини-приложения, скрипты Lua. Гарантия 6 месяцев. Срок от 2 недель." keywords="заказать сайт недорого, разработка сайтов москва, создать телеграм бота, программист на Lua, верстка макетов Figma, разработка мини-приложений, fullstack разработчик, веб-разработка под ключ" ogUrl={window.location.href} author={profile?.name || 'phax'}/>
                <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className={`fixed w-full ${navBg} backdrop-blur-sm z-50 border-b ${borderColor}`}>
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex justify-between items-center">
                            <motion.div whileHover={{ scale: 1.05 }} className={`text-sm tracking-widest uppercase font-light ${textColor}`}>{profile?.name?.split(' ')[0] || 'Portfolio'}</motion.div>
                            <div className="hidden md:flex space-x-12 items-center">
                                {menuItems.map(item => (
                                    <motion.button key={item.id} whileHover={{ scale: 1.1, y: -2 }} onClick={() => handleScroll(item.id)} className={`text-xs tracking-widest ${mutedColor} hover:${textColor} transition-colors uppercase`}>{item.label}</motion.button>
                                ))}
                                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                            </div>
                            <div className="md:hidden flex items-center gap-4">
                                <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                                <motion.button whileHover={{ scale: 1.05 }} className={`${mutedColor} hover:${textColor} transition-colors text-sm tracking-widest`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? 'ЗАКРЫТЬ' : 'МЕНЮ'}</motion.button>
                            </div>
                        </div>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden mt-8 pb-8 space-y-6">
                                    {menuItems.map(item => (
                                        <motion.button key={item.id} whileHover={{ x: 10 }} onClick={() => handleScroll(item.id)} className={`block w-full text-left text-sm tracking-widest ${mutedColor} hover:${textColor} transition-colors uppercase`}>{item.label}</motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.nav>

                <HeroSection profile={profile} safeProjects={safeProjects} handleScroll={handleScroll} isDark={isDark}/>

                <section id="about" className={`py-32 border-t ${borderColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 z-0 opacity-5">
                        <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background2})`, filter: 'grayscale(100%)'}}></motion.div>
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
                            <h2 className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase mb-12 text-center`}>ОБО МНЕ</h2>
                            <div className="text-center space-y-8">
                                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className={`text-2xl md:text-3xl font-light leading-relaxed ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>
                                    {profile?.bio || 'Информация о вас появится здесь после добавления в админ-панель.'}
                                </motion.p>
                                {(profile?.email || profile?.location) && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} viewport={{ once: true }} className={`flex justify-center gap-12 pt-12 text-sm tracking-wide ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                                        {profile?.email && <div>EMAIL: {profile.email}</div>}
                                        {profile?.location && <div>ЛОКАЦИЯ: {profile.location}</div>}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="projects" className={`py-32 border-t ${borderColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 z-0 opacity-10">
                        <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background3})`, filter: 'grayscale(100%) blur(0.5px)'}}></motion.div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${isDark ? 'via-black/50 to-black' : 'via-white/50 to-white'} pointer-events-none`}></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-20">
                            <h2 className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase mb-4`}>ПРОЕКТЫ</h2>
                            <p className={`text-5xl md:text-7xl font-light tracking-tight ${textColor}`}>РАБОТЫ<span className={mutedColor}>.</span></p>
                            <p className={`${mutedColor} text-sm tracking-widest uppercase mt-4`}>СВАЙПАЙТЕ → ДЛЯ ПРОСМОТРА</p>
                        </motion.div>
                        <ProjectsSwiper projects={safeProjects} isDark={isDark} />
                    </div>
                </section>

                <WorkProcess isDark={isDark} />
                <PricingSection isDark={isDark} />

                <section id="contact" className={`py-32 border-t ${borderColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 z-0 opacity-5">
                        <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${background3})`, filter: 'grayscale(100%) blur(0.5px)'}}></motion.div>
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                            <h2 className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase mb-20 text-center`}>КОНТАКТЫ</h2>
                            <ContactForm isDark={isDark} />
                            {(profile?.github_url || profile?.linkedin_url || profile?.telegram_url) && (
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className={`flex justify-center gap-12 mt-20 text-xs tracking-widest uppercase`}>
                                    {profile?.github_url && <motion.a whileHover={{ scale: 1.1, y: -2 }} href={profile.github_url} target="_blank" rel="noopener noreferrer" className={`${mutedColor} hover:${textColor} transition-colors`}>GITHUB</motion.a>}
                                    {profile?.linkedin_url && <motion.a whileHover={{ scale: 1.1, y: -2 }} href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className={`${mutedColor} hover:${textColor} transition-colors`}>LINKEDIN</motion.a>}
                                    {profile?.telegram_url && <motion.a whileHover={{ scale: 1.1, y: -2 }} href={profile.telegram_url} target="_blank" rel="noopener noreferrer" className={`${mutedColor} hover:${textColor} transition-colors`}>TELEGRAM</motion.a>}
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </section>

                <footer className={`py-12 border-t ${borderColor}`}>
                    <div className="container mx-auto px-6">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center space-y-4">
                            <p className={`text-xs tracking-widest ${isDark ? 'text-neutral-500' : 'text-gray-500'} uppercase`}>© {new Date().getFullYear()} {profile?.name || 'phax'}</p>
                            <p className={`text-xs ${isDark ? 'text-neutral-700' : 'text-gray-300'}`}>MADE BY DEV</p>
                            <p className={`text-xs ${isDark ? 'text-neutral-800' : 'text-gray-200'} tracking-widest`}>Статус API: {apiStatus}</p>
                        </motion.div>
                    </div>
                </footer>

                <style jsx global>{`
                    .animate-pulse-once { animation: pulse-once 1s ease-in-out; }
                    @keyframes pulse-once { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
                `}</style>
            </div>
        </HelmetProvider>
    );
};

export default Portfolio;