import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import {
  Code2,
  Terminal,
  Bot,
  Globe,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Zap,
  ShieldCheck,
  Clock,
  MessageSquare,
  Menu,
  X,
  Sun,
  Moon,
  Compass,
  FileCode2,
  Mail,
  MapPin,
  Flame,
  Leaf,
  Calculator,
  Crown
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ==================== SEO COMPONENT ====================
const SEO = ({
  title = "PHAX | Fullstack Разработчик сайтов, Telegram ботов и Lua скриптов",
  description = "Профессиональная разработка сайтов под ключ, Telegram ботов, мини-приложений и Lua скриптов. Гарантия качества, прозрачные цены и быстрые сроки.",
  keywords = "phax, phaxdev, разработка сайтов, создание сайтов, telegram боты, telegram miniapps, lua скрипты, fullstack разработчик, веб разработка, django, react",
  ogImage = "/og-image.jpg",
  ogUrl = "https://phax.online",
  author = "phax"
}) => {
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
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={ogUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "PHAX - Fullstack Разработка",
          "description": description,
          "url": ogUrl,
          "address": { "@type": "PostalAddress", "addressCountry": "RU" },
          "service": [
            { "@type": "Service", "name": "Разработка сайтов под ключ" },
            { "@type": "Service", "name": "Telegram боты и Mini Apps" },
            { "@type": "Service", "name": "Lua скрипты" }
          ]
        })}
      </script>
    </Helmet>
  );
};

// ==================== THEME TOGGLE ====================
const ThemeToggle = ({ isDark, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    aria-label="Сменить тему"
    className={`p-2.5 rounded-xl border transition-all duration-300 ${
      isDark
        ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
        : 'bg-white border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-300 shadow-sm'
    }`}
  >
    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
  </button>
);

// ==================== INTERACTIVE TERMINAL WIDGET ====================
const InteractiveTerminal = ({ isDark, profile }) => {
  const [activeTab, setActiveTab] = useState('skills');

  const tabsData = {
    skills: [
      { cmd: 'phax --skills --verbose', type: 'cmd' },
      { text: '✓ Frontend:  React 18, Next.js, TailwindCSS, Framer Motion', color: 'text-blue-400' },
      { text: '✓ Backend:   Python, Django REST Framework, PostgreSQL, Redis', color: 'text-emerald-400' },
      { text: '✓ Telegram:  Aiogram 3, Telethon, BotFather API, Telegram MiniApps (TMA)', color: 'text-cyan-400' },
      { text: '✓ Game & OS: Lua (GMod, FiveM, Roblox), Bash scripting, Docker, Nginx', color: 'text-purple-400' },
    ],
    status: [
      { cmd: 'phax --status', type: 'cmd' },
      { text: '🟢 Status: Available for freelance & turnkey contracts', color: 'text-emerald-400 font-semibold' },
      { text: `📍 Location: ${profile?.location || 'Владикавказ, Россия / Remote'}`, color: 'text-zinc-400' },
      { text: '⚡ Response time: ~15-30 mins via Telegram', color: 'text-amber-400' },
      { text: '🛡️ Warranty: 6 months code maintenance on all projects', color: 'text-zinc-300' }
    ],
    contact: [
      { cmd: 'phax --connect', type: 'cmd' },
      { text: 'Telegram:  https://t.me/skypespeaker (@skypespeaker)', color: 'text-cyan-400' },
      { text: `Email:     ${profile?.email || 'phaxdev.info@internet.ru'}`, color: 'text-blue-400' },
      { text: 'GitHub:    https://github.com/phaxdev', color: 'text-purple-400' },
    ]
  };

  return (
    <div
      className={`rounded-2xl border font-mono text-xs overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-zinc-950/90 border-zinc-800 shadow-2xl shadow-blue-500/5'
          : 'bg-zinc-900 border-zinc-700 text-zinc-100 shadow-xl'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-[11px] text-zinc-400 ml-2 font-mono flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            phax@dev-server:~
          </span>
        </div>
        <div className="flex gap-1">
          {['skills', 'status', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
                activeTab === tab
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              .{tab}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 space-y-2 leading-relaxed min-h-[170px]">
        {tabsData[activeTab].map((line, idx) => (
          <div key={idx} className="flex items-start gap-2">
            {line.type === 'cmd' ? (
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-zinc-200 font-semibold">{line.cmd}</span>
              </div>
            ) : (
              <div className={`pl-4 ${line.color}`}>{line.text}</div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2 pt-2 text-zinc-500">
          <span className="text-emerald-400">➜</span>
          <span className="text-blue-400">~</span>
          <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// ==================== INTERACTIVE CALCULATOR (KILLER FEATURE) ====================
const ProjectCalculator = ({ isDark, onSelectService }) => {
  const [projectType, setProjectType] = useState('site');
  const [options, setOptions] = useState({
    design: true,
    urgent: false,
    payments: false,
    admin: true,
  });

  const types = [
    { id: 'site', title: 'Сайт под ключ', basePrice: 25000, baseDays: 7, icon: Globe },
    { id: 'bot', title: 'Telegram Бот', basePrice: 12000, baseDays: 3, icon: Bot },
    { id: 'miniapp', title: 'Telegram MiniApp', basePrice: 25000, baseDays: 7, icon: Sparkles },
    { id: 'lua', title: 'Lua Скрипты', basePrice: 7000, baseDays: 2, icon: FileCode2 },
    { id: 'layout', title: 'Верстка макета', basePrice: 10000, baseDays: 2, icon: Layers },
  ];

  const extraOptions = useMemo(() => [
    { id: 'design', label: 'Уникальный UI/UX дизайн с нуля', price: 5000, days: 1 },
    { id: 'payments', label: 'Интеграция онлайн-оплаты / TON', price: 5000, days: 1 },
    { id: 'admin', label: 'Удобная панель управления (CMS)', price: 4000, days: 1 },
    { id: 'urgent', label: 'Срочный экспресс-запуск за 48 часов', price: 6000, days: -2 },
  ], []);

  const currentType = types.find(t => t.id === projectType);

  const calculated = useMemo(() => {
    let price = currentType.basePrice;
    let days = currentType.baseDays;

    extraOptions.forEach(opt => {
      if (options[opt.id]) {
        price += opt.price;
        days += opt.days;
      }
    });

    if (days < 3) days = 3;
    return { price, days };
  }, [options, currentType, extraOptions]);

  const toggleOption = (id) => {
    setOptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApplyOrder = () => {
    const selectedOptsLabels = extraOptions
      .filter(o => options[o.id])
      .map(o => `• ${o.label}`)
      .join('\n');

    const message = `Здравствуйте! Рассчитал проект через калькулятор на сайте:\n\n` +
      `Тип проекта: ${currentType.title}\n` +
      `Выбранные опции:\n${selectedOptsLabels || '• Базовая комплектация'}\n\n` +
      `Ориентировочная стоимость: ~${calculated.price.toLocaleString('ru-RU')} ₽\n` +
      `Ориентировочный срок: ~${calculated.days} дн.\n\n` +
      `Хочу обсудить детали и приступить к работе.`;

    onSelectService(message);
  };

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-10 transition-all ${
        isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Интерактивный калькулятор проекта
          </h3>
          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Выберите параметры — мгновенно рассчитайте бюджет и сроки без скрытых доплат
          </p>
        </div>
      </div>

      {/* Step 1: Project Type */}
      <div className="mb-6">
        <label className={`block text-xs font-mono uppercase tracking-wider mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          1. Выберите тип разработки:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {types.map((type) => {
            const Icon = type.icon;
            const isSelected = projectType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setProjectType(type.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? isDark
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                      : 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm'
                    : isDark
                      ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-blue-500' : 'text-zinc-400'}`} />
                <div className="text-xs font-medium leading-tight mb-1">{type.title}</div>
                <div className={`text-[11px] font-mono ${isSelected ? (isDark ? 'text-blue-300' : 'text-blue-700') : 'text-zinc-500'}`}>
                  от {type.basePrice.toLocaleString('ru-RU')} ₽
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Extra Options */}
      <div className="mb-8">
        <label className={`block text-xs font-mono uppercase tracking-wider mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          2. Дополнительные опции:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {extraOptions.map((opt) => {
            const checked = options[opt.id];
            return (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
                  checked
                    ? isDark
                      ? 'bg-zinc-900/80 border-emerald-500/40 text-zinc-100'
                      : 'bg-emerald-50/60 border-emerald-500/50 text-zinc-900'
                    : isDark
                      ? 'bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      : 'bg-zinc-50/60 border-zinc-200 text-zinc-600 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      checked
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isDark
                          ? 'border-zinc-700'
                          : 'border-zinc-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-medium">{opt.label}</span>
                </div>
                <span className={`text-[11px] font-mono pl-2 shrink-0 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  +{opt.price.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calculation Summary Footer */}
      <div
        className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isDark
            ? 'bg-zinc-900/60 border-zinc-800'
            : 'bg-zinc-100/70 border-zinc-200'
        }`}
      >
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Итоговая оценка</div>
          <div className="flex items-baseline gap-3 mt-0.5">
            <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              ~{calculated.price.toLocaleString('ru-RU')} ₽
            </span>
            <span className="text-xs text-emerald-500 font-mono font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ~{calculated.days} дней
            </span>
          </div>
        </div>

        <button
          onClick={handleApplyOrder}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-95"
        >
          <span>Заказать расчет</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ==================== MAIN PORTFOLIO COMPONENT ====================
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState('Загрузка данных...');
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [copiedText, setCopiedText] = useState(null);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'Обо мне' },
    { id: 'projects', label: 'Проекты' },
    { id: 'services', label: 'Услуги & Прайс' },
    { id: 'process', label: 'Процесс' },
    { id: 'contact', label: 'Контакты' },
  ];

  const getMockProfile = () => ({
    name: 'phax',
    title: 'Fullstack Разработчик',
    bio: 'Специализируюсь на создании сайтов под ключ, Telegram-ботов любой сложности, WebApp мини-приложений и Lua скриптов. Чистый код, гарантия и поддержка.',
    email: 'phaxdev.info@internet.ru',
    location: 'Владикавказ, Россия',
    github_url: 'https://github.com/phaxdev',
    telegram_url: 'https://t.me/skypespeaker',
    photo_url: 'https://res.cloudinary.com/ddear0jsu/image/upload/v1/media/profile/photo_2026-01-10_18-06-35_mzpitz',
  });

  // Theme Sync
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setApiStatus('Подключение к серверу...');
        const API_URL = process.env.REACT_APP_API_URL || '/api';
        
        const [projectsRes, profileRes] = await Promise.allSettled([
          fetch(`${API_URL}/projects/`).then((r) => (r.ok ? r.json() : [])),
          fetch(`${API_URL}/profile/`).then((r) => (r.ok ? r.json() : getMockProfile())),
        ]);

        const projectsData = projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value) ? projectsRes.value : [];
        const profileData = profileRes.status === 'fulfilled' && profileRes.value ? profileRes.value : getMockProfile();

        setProjects(projectsData);
        setProfile(profileData);
        setApiStatus('Онлайн');
      } catch (err) {
        console.error('Data fetch error:', err);
        setProfile(getMockProfile());
        setProjects([]);
        setApiStatus('Автономный режим');
      }
    };
    fetchData();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCalculatorSelect = (prefilledMessage) => {
    setFormData(prev => ({ ...prev, message: prefilledMessage }));
    scrollTo('contact');
  };

  // Form Handling
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Укажите имя или ник в Telegram';
    if (!formData.email.trim()) newErrors.email = 'Укажите email для ответа';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    if (!formData.message.trim()) newErrors.message = 'Напишите кратко суть задачи';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const API_URL = process.env.REACT_APP_API_URL || '/api';
      const res = await fetch(`${API_URL}/contact-messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok || res.status === 201) {
        setSubmitStatus({
          type: 'success',
          message: 'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        type: 'error',
        message: 'Не удалось отправить форму через сервер. Напишите напрямую в Telegram @skypespeaker!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects) || projects.length === 0) return [];
    if (activeTab === 'all') return projects;
    return projects.filter(p => {
      const tech = (p.technologies || p.technologies_list || []).toString().toLowerCase();
      const title = (p.title || '').toLowerCase();
      if (activeTab === 'web') return tech.includes('react') || tech.includes('django') || tech.includes('api') || title.includes('geo');
      if (activeTab === 'tg') return tech.includes('telegram') || tech.includes('bot') || title.includes('bot') || title.includes('userbot');
      if (activeTab === 'lua') return tech.includes('lua') || title.includes('lua');
      return true;
    });
  }, [projects, activeTab]);

  return (
    <HelmetProvider>
      <div className={`min-h-screen transition-colors duration-500 font-sans ${isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'}`}>
        <SEO author={profile?.name || 'phax'} />

        {/* Global Mesh Background Glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[120px] transition-opacity duration-1000 ${
              isDark ? 'bg-blue-600/10 opacity-70' : 'bg-blue-400/15 opacity-60'
            }`}
          />
          <div
            className={`absolute top-[40%] -left-32 w-[500px] h-[500px] rounded-full blur-[140px] transition-opacity duration-1000 ${
              isDark ? 'bg-indigo-600/10 opacity-60' : 'bg-indigo-400/10 opacity-40'
            }`}
          />
          <div
            className={`absolute top-[70%] -right-32 w-[600px] h-[600px] rounded-full blur-[140px] transition-opacity duration-1000 ${
              isDark ? 'bg-emerald-600/10 opacity-60' : 'bg-emerald-400/10 opacity-40'
            }`}
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-grid-pattern opacity-40' : 'bg-grid-pattern-light opacity-50'}`} />
        </div>

        {/* ==================== HEADER ==================== */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDark ? 'glass-nav' : 'glass-nav-light'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-base uppercase font-mono">
                  {profile?.name || 'PHAX'}
                  <span className="text-blue-500">.</span>
                </span>
                <span className="text-[10px] text-zinc-400 tracking-widest uppercase -mt-1 font-mono">DEV STUDIO</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl border bg-zinc-900/40 border-zinc-800/80 backdrop-blur-md">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
                    isDark
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              <a
                href={profile?.telegram_url || 'https://t.me/skypespeaker'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl border ${isDark ? 'border-zinc-800 text-zinc-200' : 'border-zinc-300 text-zinc-800'}`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden border-b px-4 py-6 space-y-2 ${isDark ? 'bg-zinc-950/95 border-zinc-800' : 'bg-white/95 border-zinc-200'}`}
              >
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wide uppercase hover:bg-blue-600/10 hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-zinc-800/50">
                  <a
                    href={profile?.telegram_url || 'https://t.me/skypespeaker'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-semibold uppercase flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Написать в Telegram</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="relative z-10 pt-24 sm:pt-32">
          {/* ==================== HERO SECTION ==================== */}
          <section id="home" className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="max-w-5xl mx-auto w-full text-center space-y-8">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-mono font-medium backdrop-blur-md bg-zinc-900/60 border-zinc-800 text-zinc-300 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Доступен для новых проектов • Открыт к заказам</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto">
                  Создаю{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500">
                    веб-сайты
                  </span>
                  ,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    ботов
                  </span>{' '}
                  и{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    скрипты
                  </span>
                </h1>
                <p className={`text-base sm:text-xl max-w-2xl mx-auto font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Fullstack разработка под ключ: от идеи и дизайн-макета до деплоя на сервер с гарантией 6 месяцев.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
              >
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/25 hover:shadow-blue-600/35 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Обсудить задачу</span>
                </button>
                <button
                  onClick={() => scrollTo('projects')}
                  className={`w-full sm:w-auto px-8 py-4 rounded-2xl border font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all active:scale-95 ${
                    isDark
                      ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80'
                      : 'bg-white border-zinc-300 text-zinc-700 hover:text-black hover:border-zinc-400'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>Смотреть работы ({projects.length})</span>
                </button>
                {profile?.cv_file && (
                  <a
                    href={profile.cv_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto px-6 py-4 rounded-2xl border font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                      isDark
                        ? 'border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                        : 'border-zinc-200 text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    <span>Резюме</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>

              {/* Stats Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-6"
              >
                {[
                  { value: '3+ года', label: 'Коммерческий опыт', icon: Clock },
                  { value: `${projects.length || '3+'} проекта`, label: 'Сдано в продакшн', icon: CheckCircle2 },
                  { value: '100%', label: 'Соблюдение дедлайнов', icon: Zap },
                  { value: '6 мес.', label: 'Гарантия и поддержка', icon: ShieldCheck },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isDark ? 'bg-zinc-950/50 border-zinc-800/70' : 'bg-white/80 border-zinc-200 shadow-sm'
                      }`}
                    >
                      <Icon className="w-4 h-4 mx-auto mb-2 text-blue-500 opacity-80" />
                      <div className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Interactive Terminal Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-2xl mx-auto pt-4"
              >
                <InteractiveTerminal isDark={isDark} profile={profile} />
              </motion.div>
            </div>
          </section>

          {/* ==================== BENTO ABOUT & SKILLS ==================== */}
          <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold">
                {"// Экспертиза & Обо мне"}
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Технологии и подход к работе
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Bento 1: Profile Main */}
              <div
                className={`md:col-span-2 lg:col-span-2 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
                }`}
              >
                <div className="flex items-start gap-5 mb-6">
                  {profile?.photo_url && (
                    <img
                      src={profile.photo_url}
                      alt={profile?.name || 'phax'}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500/30 shadow-lg shrink-0"
                    />
                  )}
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-mono mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>{profile?.title || 'Fullstack Developer'}</span>
                    </div>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {profile?.name || 'phax'}
                    </h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {profile?.location || 'Владикавказ, Россия / Remote'}
                    </p>
                  </div>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed mb-6 font-light ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {profile?.bio ||
                    'Разрабатываю надежные веб-сервисы, быстрых Telegram-ботов и Lua скрипты. Ценю чистую архитектуру, высокую скорость отклика и прозрачное общение с заказчиком.'}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800/60">
                  <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono">
                    #FullStack
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                    #TelegramBots
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono">
                    #LuaScripts
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
                    #ReactDjango
                  </span>
                </div>
              </div>

              {/* Bento 2: Telegram Bots & TMA */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mb-5">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Telegram Боты & TMA
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Умные боты для бизнеса, WebApp мини-аппы, интеграция CryptoPay / ЮKassa, рассылки и автоворонки.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Aiogram 3 / TMA</span>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              {/* Bento 3: Lua Scripting */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-5">
                    <FileCode2 className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Lua Скрипты
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Игровые серверы Garry's Mod, FiveM, скрипты автоматизации и интеграции с внешними API серверов.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-purple-400">
                  <span>GMod / FiveM</span>
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                </div>
              </div>

              {/* Bento 4: Fast Copy Contacts */}
              <div
                className={`md:col-span-3 lg:col-span-4 p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-950/30 via-zinc-950 to-indigo-950/30 border-zinc-800'
                    : 'bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/50 border-zinc-200 shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-blue-600/10 text-blue-500 border border-blue-500/20">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      Нужен быстрый ответ?
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Пишите прямо сейчас в Telegram или на почту — скопируйте контакт в один клик
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => copyToClipboard('https://t.me/skypespeaker', 'tg')}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                        : 'bg-white border-zinc-300 hover:border-zinc-400 text-zinc-800'
                    }`}
                  >
                    {copiedText === 'tg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>@skypespeaker</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(profile?.email || 'phaxdev.info@internet.ru', 'email')}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                      isDark
                        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                        : 'bg-white border-zinc-300 hover:border-zinc-400 text-zinc-800'
                    }`}
                  >
                    {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{profile?.email || 'phaxdev.info@internet.ru'}</span>
                  </button>

                  <a
                    href="https://t.me/skypespeaker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-blue-600/20"
                  >
                    <span>Открыть диалог</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ==================== PROJECTS SHOWCASE ==================== */}
          <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold">
                  {"// Портфолио"}
                </span>
                <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Реализованные проекты
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl border bg-zinc-900/40 border-zinc-800/80 self-start md:self-auto">
                {[
                  { id: 'all', label: 'Все' },
                  { id: 'web', label: 'Веб & API' },
                  { id: 'tg', label: 'Telegram' },
                  { id: 'lua', label: 'Lua' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : isDark
                          ? 'text-zinc-400 hover:text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, idx) => {
                  const techList = Array.isArray(project.technologies_list)
                    ? project.technologies_list
                    : typeof project.technologies === 'string'
                      ? project.technologies.split(',').map(s => s.trim())
                      : ['React', 'Django', 'API'];

                    const theme = (() => {
                      const t = (project.slug || project.title || '').toLowerCase();
                      if (t.includes('chess') || t.includes('stockfish')) {
                        return {
                          gradient: isDark ? 'from-amber-950/30 via-zinc-950 to-zinc-950' : 'from-amber-50/50 via-white to-amber-50/20',
                          border: isDark ? 'border-amber-500/40 group-hover:border-amber-400' : 'border-amber-300 group-hover:border-amber-500',
                          headerBg: 'bg-gradient-to-br from-amber-900/40 via-zinc-900 to-zinc-950',
                          tagBg: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
                          accentText: 'group-hover:text-amber-400',
                          glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]',
                          icon: Crown,
                          subBadge: '♟️ Stockfish 3500+ ELO'
                        };
                      }
                      if (t.includes('geo')) {
                        return {
                          gradient: isDark ? 'from-amber-950/30 via-zinc-950 to-[#0c1015]' : 'from-amber-50/50 via-white to-amber-50/20',
                          border: isDark ? 'border-amber-500/30 group-hover:border-amber-400' : 'border-amber-200 group-hover:border-amber-500',
                          headerBg: 'bg-gradient-to-br from-amber-900/40 via-[#0c1015] to-zinc-900',
                          tagBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                          accentText: 'group-hover:text-amber-400',
                          glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]',
                          icon: Compass,
                          subBadge: '🗺️ Гео-карты РФ'
                        };
                      }
                      if (t.includes('eco')) {
                        return {
                          gradient: isDark ? 'from-emerald-950/30 via-zinc-950 to-[#041215]' : 'from-emerald-50/50 via-white to-emerald-50/20',
                          border: isDark ? 'border-emerald-500/30 group-hover:border-emerald-400' : 'border-emerald-200 group-hover:border-emerald-500',
                          headerBg: 'bg-gradient-to-br from-emerald-900/40 via-[#041215] to-zinc-900',
                          tagBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                          accentText: 'group-hover:text-emerald-400',
                          glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]',
                          icon: Leaf,
                          subBadge: '🌱 Live AQI сенсоры'
                        };
                      }
                      if (t.includes('bot') || t.includes('phax')) {
                        return {
                          gradient: isDark ? 'from-cyan-950/30 via-zinc-950 to-[#081820]' : 'from-cyan-50/50 via-white to-cyan-50/20',
                          border: isDark ? 'border-cyan-500/30 group-hover:border-cyan-400' : 'border-cyan-200 group-hover:border-cyan-500',
                          headerBg: 'bg-gradient-to-br from-cyan-900/40 via-zinc-900 to-zinc-950',
                          tagBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
                          accentText: 'group-hover:text-cyan-400',
                          glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]',
                          icon: Bot,
                          subBadge: '⚡ Telethon Engine'
                        };
                      }
                      if (t.includes('dnevnik')) {
                        return {
                          gradient: isDark ? 'from-indigo-950/30 via-zinc-950 to-purple-950/20' : 'from-indigo-50/50 via-white to-indigo-50/20',
                          border: isDark ? 'border-indigo-500/30 group-hover:border-indigo-400' : 'border-indigo-200 group-hover:border-indigo-500',
                          headerBg: 'bg-gradient-to-br from-indigo-900/40 via-zinc-900 to-zinc-950',
                          tagBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
                          accentText: 'group-hover:text-indigo-400',
                          glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]',
                          icon: FileCode2,
                          subBadge: '🎓 Next.js + Prisma'
                        };
                      }
                      if (t.includes('vpn')) {
                        return {
                          gradient: isDark ? 'from-purple-950/30 via-zinc-950 to-pink-950/20' : 'from-purple-50/50 via-white to-purple-50/20',
                          border: isDark ? 'border-purple-500/30 group-hover:border-purple-400' : 'border-purple-200 group-hover:border-purple-500',
                          headerBg: 'bg-gradient-to-br from-purple-900/40 via-zinc-900 to-zinc-950',
                          tagBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
                          accentText: 'group-hover:text-purple-400',
                          glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]',
                          icon: ShieldCheck,
                          subBadge: '🛡️ VLESS Reality'
                        };
                      }
                      return {
                        gradient: isDark ? 'from-blue-950/30 via-zinc-950 to-zinc-950' : 'from-blue-50/50 via-white to-white',
                        border: isDark ? 'border-blue-500/30 group-hover:border-blue-400' : 'border-blue-200 group-hover:border-blue-500',
                        headerBg: 'bg-gradient-to-br from-blue-900/40 via-zinc-900 to-zinc-950',
                        tagBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                        accentText: 'group-hover:text-blue-400',
                        glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]',
                        icon: Code2,
                        subBadge: '💻 Web Project'
                      };
                    })();

                    const Icon = theme.icon;

                    return (
                      <motion.div
                        key={project.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={`group rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 bg-gradient-to-b ${theme.gradient} ${theme.border} ${theme.glow}`}
                      >
                        {/* Project Image or Themed Header */}
                        <div className={`relative h-48 overflow-hidden ${theme.headerBg} flex items-center justify-center border-b border-zinc-800/50`}>
                          {project.image_url || project.image ? (
                            <img
                              src={project.image_url || project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-6 text-center">
                              <Icon className="w-12 h-12 text-zinc-500 mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                                {project.title.split('—')[0]}
                              </span>
                            </div>
                          )}

                          <div className="absolute top-3 left-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border backdrop-blur-md ${theme.tagBg}`}>
                              {theme.subBadge}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/70 backdrop-blur-md text-zinc-300 border border-zinc-700/60">
                              #{project.id || idx + 1}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {techList.map((t, i) => (
                                <span
                                  key={i}
                                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono ${
                                    isDark
                                      ? 'bg-zinc-900/90 text-zinc-300 border border-zinc-800'
                                      : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            <h3 className={`text-xl font-bold tracking-tight mb-2 transition-colors ${theme.accentText} ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                              {project.title}
                            </h3>

                            <p className={`text-xs leading-relaxed line-clamp-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              {project.short_description || project.description || 'Описание разрабатываемого проекта.'}
                            </p>
                          </div>

                          {/* Card Footer Links */}
                          <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                            {project.github_url ? (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
                              >
                                <GithubIcon className="w-4 h-4" />
                                <span>Репозиторий</span>
                              </a>
                            ) : (
                              <span className="text-zinc-600 text-[11px]">Private Repo</span>
                            )}

                            {project.live_url ? (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                              >
                                <span>Демо</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <span className="text-zinc-500 text-[11px]">В разработке</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-zinc-500 font-mono text-sm">
                  Проекты в этой категории скоро появятся.
                </div>
              )}
            </div>
          </section>

          {/* ==================== SERVICES & CALCULATOR ==================== */}
          <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold">
                {"// Услуги и стоимость"}
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Прозрачные фиксированные цены
              </h2>
              <p className={`text-sm mt-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Каждый этап фиксируется договором или четким ТЗ. Без скрытых платежей.
              </p>
            </div>

            {/* Calculator Component */}
            <div className="mb-14">
              <ProjectCalculator isDark={isDark} onSelectService={handleCalculatorSelect} />
            </div>

            {/* Standard Service Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Сайты под ключ',
                  price: 'от 25 000 ₽',
                  time: '5-10 дней',
                  desc: 'Корпоративные сайты, сервисы, лендинги и веб-платформы на React/Django.',
                  features: ['Адаптивный дизайн (Mobile/Desktop)', 'SEO-оптимизация и мета-теги', 'Админ-панель для контента', 'Хостинг и SSL в подарок']
                },
                {
                  title: 'Telegram Боты',
                  price: 'от 12 000 ₽',
                  time: '2-5 дней',
                  desc: 'Автоматизация приема заявок, платные подписки, CRM-интеграция, рассылки.',
                  features: ['Интеграция с платежами (ЮKassa, Crypto)', 'База данных пользователей (PostgreSQL)', 'Админ-команды и статистика', 'Развертывание на сервере 24/7']
                },
                {
                  title: 'Telegram MiniApps (TMA)',
                  price: 'от 25 000 ₽',
                  time: '5-9 дней',
                  desc: 'Полноценные веб-приложения внутри Telegram с подключением кошельков TON.',
                  features: ['Web App интерфейс в мессенджере', 'Авторизация через Telegram InitData', 'Интеграция с TON кошельками', 'Плавная мобильная верстка']
                },
                {
                  title: 'Скрипты на Lua',
                  price: 'от 7 000 ₽',
                  time: '1-3 дня',
                  desc: 'Скрипты для Garry’s Mod, FiveM, игровые механики и автоматизация.',
                  features: ['Высокая оптимизация (без просадок FPS)', 'Интеграция с базой данных сервера', 'Настройка под ваши конфигурации', 'Тестирование и фикс багов']
                },
                {
                  title: 'Верстка макетов Figma',
                  price: 'от 10 000 ₽',
                  time: '2-4 дня',
                  desc: 'Точный перенос дизайна из Figma в чистый, валидный код на Tailwind/React.',
                  features: ['Pixel Perfect точность', 'Интерактивные микро-анимации', '100% адаптив под любые экраны', 'Чистый семантичный код']
                },
                {
                  title: 'Технический аудит & Fix',
                  price: 'от 5 000 ₽',
                  time: '1-2 дня',
                  desc: 'Поиск багов, ускорение загрузки, настройка серверов Nginx/Docker, доработка чужого кода.',
                  features: ['Code review архитектуры', 'Оптимизация скорости до 95+ PageSpeed', 'Исправление уязвимостей', 'Отчет с рекомендациями']
                }
              ].map((srv, i) => (
                <div
                  key={i}
                  className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                    isDark
                      ? 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{srv.title}</h3>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                        {srv.time}
                      </span>
                    </div>

                    <div className="text-2xl font-extrabold text-blue-500 font-mono mb-3">
                      {srv.price}
                    </div>

                    <p className={`text-xs leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {srv.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      {srv.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-zinc-400">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const msg = `Здравствуйте! Хочу заказать услугу "${srv.title}" (${srv.price}). Давайте обсудим детали проекта.`;
                      handleCalculatorSelect(msg);
                    }}
                    className={`w-full py-3 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                      isDark
                        ? 'border-zinc-700 text-zinc-200 hover:bg-white hover:text-black hover:border-white'
                        : 'border-zinc-300 text-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-900'
                    }`}
                  >
                    Заказать услугу
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== WORK PROCESS ==================== */}
          <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold">
                {"// Этапы взаимодействия"}
              </span>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                Как строится работа
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: '01', title: 'Консультация & ТЗ', days: '1-2 дня', desc: 'Обсуждаем идею, составляем техническое задание и фиксируем точную смету и срок.' },
                { num: '02', title: 'Прототип & Дизайн', days: '3-5 дней', desc: 'Создаем интерактивный макет интерфейса, согласовываем стиль и логику экранов.' },
                { num: '03', title: 'Разработка', days: 'Зависит от ТЗ', desc: 'Пишем чистый код, подключаем API и базы данных, настраиваем серверную логику.' },
                { num: '04', title: 'Тестирование', days: '2-4 дня', desc: 'Проверяем проект на всех типах устройств, исключаем баги и тестируем нагрузки.' },
                { num: '05', title: 'Деплой и запуск', days: '1 день', desc: 'Разворачиваем проект на рабочем сервере, привязываем домен, настраиваем SSL.' },
                { num: '06', title: 'Поддержка & Гарантия', days: '6 месяцев', desc: 'Бесплатно устраняем любые недочеты и консультируем по развитию сервиса.' },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    isDark ? 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold font-mono text-blue-500">{step.num}</span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/60">
                      {step.days}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{step.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== CONTACT SECTION ==================== */}
          <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Telegram & Contacts */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold">
                    {"// Начать проект"}
                  </span>
                  <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Давайте создадим что-то крутое
                  </h2>
                  <p className={`text-sm mt-3 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Расскажите о вашей идее или задаче. Я отвечу в течение 15 минут с предварительной оценкой стоимости и сроков.
                  </p>
                </div>

                {/* Direct Telegram Card */}
                <div
                  className={`p-6 rounded-3xl border transition-all ${
                    isDark
                      ? 'bg-gradient-to-br from-blue-950/40 via-zinc-950 to-zinc-950 border-blue-500/30 shadow-xl shadow-blue-500/5'
                      : 'bg-blue-50/60 border-blue-200 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                      <Send className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Быстрая связь в Telegram</div>
                      <div className="text-xs text-blue-400 font-mono">@skypespeaker</div>
                    </div>
                  </div>
                  <p className={`text-xs mb-5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Самый быстрый способ связаться. Отвечаю оперативно, скидываю примеры работ и сразу считаю бюджет.
                  </p>
                  <a
                    href="https://t.me/skypespeaker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
                  >
                    <span>Написать в Telegram</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Contact List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                    <Mail className="w-4 h-4 text-zinc-500" />
                    <span>{profile?.email || 'phaxdev.info@internet.ru'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <span>{profile?.location || 'Владикавказ, Россия / Удаленно'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                    <Clock className="w-4 h-4 text-zinc-500" />
                    <span>Часовой пояс: МСК (UTC+3)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div
                className={`lg:col-span-7 p-6 sm:p-10 rounded-3xl border transition-all ${
                  isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  Отправить заявку
                </h3>
                <p className={`text-xs mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Заполните форму, и я свяжусь с вами в Telegram или по почте
                </p>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-2xl mb-6 text-xs flex items-center gap-3 ${
                      submitStatus.type === 'success'
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                        : 'bg-red-500/15 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Ваше имя или @username *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="@username или Имя"
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-all outline-none ${
                          errors.name
                            ? 'border-red-500/80 bg-red-500/5'
                            : isDark
                              ? 'bg-zinc-900/60 border-zinc-800 text-white focus:border-blue-500 focus:bg-zinc-900'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500 focus:bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Email для связи *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="example@mail.ru"
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-all outline-none ${
                          errors.email
                            ? 'border-red-500/80 bg-red-500/5'
                            : isDark
                              ? 'bg-zinc-900/60 border-zinc-800 text-white focus:border-blue-500 focus:bg-zinc-900'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500 focus:bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Телефон или Telegram (опционально)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+7 (999) 000-00-00"
                      className={`w-full px-4 py-3 rounded-xl border text-xs transition-all outline-none ${
                        isDark
                          ? 'bg-zinc-900/60 border-zinc-800 text-white focus:border-blue-500 focus:bg-zinc-900'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Описание задачи / проекта *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Расскажите о проекте: функции, сроки, ссылки на референсы..."
                      className={`w-full px-4 py-3 rounded-xl border text-xs transition-all outline-none resize-none ${
                        errors.message
                          ? 'border-red-500/80 bg-red-500/5'
                          : isDark
                            ? 'bg-zinc-900/60 border-zinc-800 text-white focus:border-blue-500 focus:bg-zinc-900'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-blue-500 focus:bg-white'
                      }`}
                    />
                    {errors.message && <p className="text-[10px] text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
                  >
                    {isSubmitting ? (
                      <span>Отправка данных...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Отправить заявку</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* ==================== FOOTER ==================== */}
        <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t transition-colors ${isDark ? 'border-zinc-800/80 bg-zinc-950/80' : 'border-zinc-200 bg-white'}`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-wider uppercase font-mono">
                {profile?.name || 'PHAX'} • {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                API: {apiStatus}
              </span>
              <a href="#home" className="hover:text-zinc-300 transition-colors">
                Наверх ↑
              </a>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default Portfolio;
