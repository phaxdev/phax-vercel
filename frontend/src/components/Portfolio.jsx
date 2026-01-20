import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите свой @username или номер';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Введите сообщение';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Адрес вашего Django бэкенда
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      
      const response = await axios.post(`${API_URL}/contact-messages/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.status === 201) {
        setSubmitStatus({
          type: 'success',
          message: '✅ Сообщение успешно отправлено! Мы ответим вам в ближайшее время.'
        });
        
        // Очищаем форму
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        // Автоматически скрываем сообщение об успехе через 5 секунд
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      
      if (error.response) {
        // Ошибка от сервера
        if (error.response.status === 400) {
          setSubmitStatus({
            type: 'error',
            message: '❌ Проверьте правильность заполнения полей.'
          });
        } else {
          setSubmitStatus({
            type: 'error',
            message: '❌ Ошибка сервера. Пожалуйста, попробуйте позже.'
          });
        }
      } else if (error.request) {
        // Нет ответа от сервера
        setSubmitStatus({
          type: 'error',
          message: '❌ Не удалось соединиться с сервером. Проверьте подключение к интернету.'
        });
      } else {
        // Другие ошибки
        setSubmitStatus({
          type: 'error',
          message: '❌ Произошла ошибка при отправке.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl border border-white/10">
      <h3 className="text-2xl font-bold mb-6 text-white">Написать сообщение</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Введите свой @username или номер *</label>
          <input
            type="text"
            name="name"
            placeholder="Писать сюда"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-4 bg-white/5 border rounded-xl focus:outline-none transition-all text-white placeholder-gray-500 ${
              errors.name 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-white/10 focus:border-white/30'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Ваш email *</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-4 bg-white/5 border rounded-xl focus:outline-none transition-all text-white placeholder-gray-500 ${
              errors.email 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-white/10 focus:border-white/30'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Сообщение *</label>
          <textarea
            name="message"
            placeholder="Расскажите о вашем проекте..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-4 bg-white/5 border rounded-xl focus:outline-none transition-all text-white placeholder-gray-500 resize-none ${
              errors.message 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-white/10 focus:border-white/30'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Статус отправки */}
        {submitStatus && (
          <div className={`p-4 rounded-xl ${
            submitStatus.type === 'success' 
              ? 'bg-green-900/30 border border-green-500/50 text-green-300' 
              : 'bg-red-900/30 border border-red-500/50 text-red-300'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-medium transition-all ${
            isSubmitting
              ? 'bg-white/10 cursor-not-allowed'
              : 'glass-button hover:bg-white/20'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Отправка...
            </div>
          ) : (
            'Отправить сообщение'
          )}
        </button>
      </form>
    </div>
  );
};
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaFileDownload,
    FaBars,
    FaTimes,
    FaTelegram,
    FaExternalLinkAlt,
    FaCode,
    FaDatabase,
    FaServer,
    FaTools,
    FaLaptopCode,
    FaBriefcase,
    FaGraduationCap,
    FaCalendar,
    FaMapMarkerAlt,
    FaPhone,
    FaGlobe,
    FaStar,
    FaAward
} from 'react-icons/fa';
import { portfolioAPI } from '../services/api';

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [apiStatus, setApiStatus] = useState('Проверка соединения...');

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [profile, setProfile] = useState(null);

    const menuItems = [
        { id: 'home', label: 'Главная' },
        { id: 'about', label: 'Обо мне' },
        { id: 'projects', label: 'Проекты' },
        { id: 'skills', label: 'Навыки' },
        { id: 'experience', label: 'Опыт' },
        { id: 'contact', label: 'Контакты' }
    ];

    // Минимальные мок-данные для fallback
    const getMockProfile = () => ({
        name: 'Алексей Петров',
        title: 'Full Stack разработчик',
        bio: 'Добавьте информацию о себе в админ-панели Django',
        email: 'example@email.com',
        phone: '',
        location: '',
        github_url: '',
        linkedin_url: '',
        telegram_url: '',
        photo: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setApiStatus('Подключение к серверу...');

                // Сначала проверяем соединение с API
                try {
                    await portfolioAPI.testConnection?.();
                    setApiStatus('Соединение установлено');
                } catch (error) {
                    console.log('API тест не прошел, продолжаем без него');
                    setApiStatus('Используются тестовые данные');
                }

                // Пробуем загрузить данные с API
                const [projectsRes, skillsRes, experienceRes, profileRes] = await Promise.allSettled([
                    portfolioAPI.getProjects().catch(() => ({ data: [] })),
                    portfolioAPI.getSkills().catch(() => ({ data: [] })),
                    portfolioAPI.getExperience().catch(() => ({ data: [] })),
                    portfolioAPI.getProfile().catch(() => ({ data: getMockProfile() }))
                ]);

                // Обрабатываем результаты с проверкой
                const projectsData = projectsRes.status === 'fulfilled' && projectsRes.value?.data
                    ? (Array.isArray(projectsRes.value.data) ? projectsRes.value.data : [])
                    : [];

                const skillsData = skillsRes.status === 'fulfilled' && skillsRes.value?.data
                    ? (Array.isArray(skillsRes.value.data) ? skillsRes.value.data : [])
                    : [];

                const experienceData = experienceRes.status === 'fulfilled' && experienceRes.value?.data
                    ? (Array.isArray(experienceRes.value.data) ? experienceRes.value.data : [])
                    : [];

                const profileData = profileRes.status === 'fulfilled' && profileRes.value?.data
                    ? profileRes.value.data
                    : getMockProfile();

                console.log('Загруженные данные:', {
                    projects: projectsData.length,
                    skills: skillsData.length,
                    experience: experienceData.length,
                    profile: profileData
                });

                // Устанавливаем данные
                setProjects(projectsData);
                setSkills(skillsData);
                setExperience(experienceData);
                setProfile(profileData);

            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                // Используем минимальные мок-данные
                setProfile(getMockProfile());
                setApiStatus('Ошибка подключения к API');
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchData();
    }, []);

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const getSkillIcon = (category) => {
        switch (category) {
            case 'frontend': return <FaCode className="text-gray-700" />;
            case 'backend': return <FaServer className="text-gray-700" />;
            case 'database': return <FaDatabase className="text-gray-700" />;
            case 'tools': return <FaTools className="text-gray-700" />;
            default: return <FaLaptopCode className="text-gray-700" />;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Настоящее время';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="glass p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-transparent mb-6 mx-auto"></div>
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">Загрузка портфолио</h2>
                    <p className="text-gray-300 text-center">{apiStatus}</p>
                    <div className="mt-4 text-sm text-gray-400 text-center">
                        Текущий адрес: {window.location.hostname}:{window.location.port}
                    </div>
                </div>
            </div>
        );
    }

    // Гарантируем, что это массивы
    const safeProjects = Array.isArray(projects) ? projects : [];
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeExperience = Array.isArray(experience) ? experience : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Навигация в стиле glassmorphism */}
            <nav className="fixed w-full glass-nav z-50">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-white">
                            {profile?.name?.split(' ')[0] || 'Portfolio'}
                        </div>

                        <div className="hidden md:flex space-x-8">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScroll(item.id)}
                                    className="text-gray-300 hover:text-white transition-colors font-medium relative py-1 px-2"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            ))}
                        </div>

                        <button
                            className="md:hidden text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 glass rounded-lg p-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScroll(item.id)}
                                    className="block w-full text-left py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors pl-4"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Герой-секция */}
            <section id="home" className="pt-32 pb-20 relative overflow-hidden">
                {/* Фоновые элементы */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-12 md:mb-0">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                                <span className="text-sm">Доступен для сотрудничества</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    {profile?.name || 'Разработчик'}
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                                {profile?.title || 'Full Stack разработчик'}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <button
                                    onClick={() => handleScroll('contact')}
                                    className="glass-button px-8 py-3 rounded-lg hover:bg-white/20 transition-all duration-300"
                                >
                                    Связаться со мной
                                </button>
                                <button
                                    onClick={() => handleScroll('projects')}
                                    className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all"
                                >
                                    Посмотреть проекты
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-8">
                                <div className="glass-stat p-4 rounded-xl">
                                    <div className="text-3xl font-bold text-white">{safeProjects.length}</div>
                                    <div className="text-gray-400">Проектов</div>
                                </div>
                                <div className="glass-stat p-4 rounded-xl">
                                    <div className="text-3xl font-bold text-white">{safeExperience.length}</div>
                                    <div className="text-gray-400">Года опыта</div>
                                </div>
                                <div className="glass-stat p-4 rounded-xl">
                                    <div className="text-3xl font-bold text-white">{safeSkills.length}</div>
                                    <div className="text-gray-400">Навыков</div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative">
                                <div className="w-64 h-64 md:w-80 md:h-80 glass-avatar rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                                    {profile?.photo ? (
                                        <img
                                            src={profile.photo}
                                            alt={profile.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                            <FaCode className="text-white text-6xl" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl border border-white/10">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 glass-icon rounded-lg flex items-center justify-center mr-4">
                                            <FaStar className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">Full Stack</div>
                                            <div className="text-gray-400">Разработчик</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Обо мне */}
            <section id="about" className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            <span className="relative">
                                Обо мне
                                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></span>
                            </span>
                        </h2>

                        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10">
                            <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                {profile?.bio || 'Информация о вас появится здесь после добавления в админ-панель.'}
                            </p>

                            {(profile?.email || profile?.location || profile?.phone) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
                                    {profile?.email && (
                                        <div className="glass-item p-4 rounded-xl">
                                            <div className="flex items-center text-gray-300">
                                                <FaEnvelope className="mr-3 text-white" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Email</div>
                                                    <div className="font-medium">{profile.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {profile?.location && (
                                        <div className="glass-item p-4 rounded-xl">
                                            <div className="flex items-center text-gray-300">
                                                <FaMapMarkerAlt className="mr-3 text-white" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Локация</div>
                                                    <div className="font-medium">{profile.location}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {profile?.phone && (
                                        <div className="glass-item p-4 rounded-xl">
                                            <div className="flex items-center text-gray-300">
                                                <FaPhone className="mr-3 text-white" />
                                                <div>
                                                    <div className="text-sm text-gray-400">Телефон</div>
                                                    <div className="font-medium">{profile.phone}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Проекты */}
            <section id="projects" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Проекты
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        Реализованные работы и проекты
                    </p>

                    {safeProjects.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="glass p-8 rounded-2xl max-w-md mx-auto">
                                <div className="w-20 h-20 glass-icon rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaCode className="text-white text-2xl" />
                                </div>
                                <p className="text-gray-300 text-lg mb-4">Пока нет проектов</p>
                                <p className="text-gray-500">
                                    Добавьте проекты через админ-панель Django
                                </p>
                                <div className="mt-6 text-sm text-gray-400">
                                    API статус: {apiStatus}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {safeProjects.map((project, index) => (
                                <div
                                    key={project.id || index}
                                    className="glass hover:glass-hover rounded-2xl overflow-hidden transition-all duration-300 group"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={project.image_url || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop'}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                            {project.created_at && (
                                                <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">
                                                    {formatDate(project.created_at)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 mb-4 line-clamp-2">
                                            {project.short_description || project.description || 'Описание проекта'}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {(project.technologies_list || []).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs border border-white/10"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-4 pt-4 border-t border-white/10">
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                                                >
                                                    <FaGithub className="mr-2" />
                                                    Код
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-gray-300 transition-colors flex items-center"
                                                >
                                                    <FaExternalLinkAlt className="mr-2" />
                                                    Демо
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Навыки */}
            <section id="skills" className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Навыки
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {safeSkills.length === 0 ? (
                            <div className="col-span-3 text-center py-12">
                                <p className="text-gray-400">Навыки не добавлены</p>
                            </div>
                        ) : (
                            safeSkills.map((skill, index) => (
                                <div
                                    key={skill.id || index}
                                    className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-lg glass-icon flex items-center justify-center mr-3">
                                                {getSkillIcon(skill.category)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white">{skill.name}</h3>
                                                <p className="text-sm text-gray-400">{skill.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold text-white">{skill.level}%</div>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full transition-all duration-1000"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Опыт работы */}
            <section id="experience" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Опыт работы
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        {safeExperience.length === 0 ? (
                            <div className="text-center glass p-8 rounded-2xl">
                                <FaBriefcase className="text-4xl text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-400">Опыт работы не добавлен</p>
                            </div>
                        ) : (
                            safeExperience.map((exp, index) => (
                                <div
                                    key={exp.id || index}
                                    className="relative pl-12 pb-12 last:pb-0"
                                >
                                    <div className="absolute left-0 top-0 w-8 h-8 glass-icon rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                    </div>

                                    {index < safeExperience.length - 1 && (
                                        <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
                                    )}

                                    <div className="glass p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                                                <p className="text-gray-300 font-semibold">{exp.company}</p>
                                            </div>
                                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mt-2 md:mt-0">
                                                <FaCalendar className="mr-2" />
                                                {formatDate(exp.start_date)} - {exp.is_current ? 'Настоящее время' : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Контакты */}
            <section id="contact" className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Контакты
                    </h2>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <div className="glass p-8 rounded-3xl border border-white/10">
                                    <h3 className="text-2xl font-bold mb-6 text-white">Контакты</h3>

                                    <div className="space-y-6">
                                        {profile?.email && (
                                            <a
                                                href={`mailto:${profile.email}`}
                                                className="glass-item p-4 rounded-xl flex items-center group hover:bg-white/10 transition-all"
                                            >
                                                <div className="w-12 h-12 rounded-xl glass-icon flex items-center justify-center mr-4">
                                                    <FaEnvelope className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-sm">Email</div>
                                                    <div className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                                                        {profile.email}
                                                    </div>
                                                </div>
                                            </a>
                                        )}

                                        {profile?.github_url && (
                                            <a
                                                href={profile.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="glass-item p-4 rounded-xl flex items-center group hover:bg-white/10 transition-all"
                                            >
                                                <div className="w-12 h-12 rounded-xl glass-icon flex items-center justify-center mr-4">
                                                    <FaGithub className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-sm">GitHub</div>
                                                    <div className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                                                        Профиль на GitHub
                                                    </div>
                                                </div>
                                            </a>
                                        )}

                                        {profile?.linkedin_url && (
                                            <a
                                                href={profile.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="glass-item p-4 rounded-xl flex items-center group hover:bg-white/10 transition-all"
                                            >
                                                <div className="w-12 h-12 rounded-xl glass-icon flex items-center justify-center mr-4">
                                                    <FaLinkedin className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-sm">LinkedIn</div>
                                                    <div className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                                                        Профиль на LinkedIn
                                                    </div>
                                                </div>
                                            </a>
                                        )}

                                        {profile?.telegram_url && (
                                            <a
                                                href={profile.telegram_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="glass-item p-4 rounded-xl flex items-center group hover:bg-white/10 transition-all"
                                            >
                                                <div className="w-12 h-12 rounded-xl glass-icon flex items-center justify-center mr-4">
                                                    <FaTelegram className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-sm">Telegram</div>
                                                    <div className="font-semibold text-white group-hover:text-gray-300 transition-colors">
                                                        Написать в Telegram
                                                    </div>
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="glass p-8 rounded-3xl border border-white/10">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Футер */}
            <footer className="bg-black/50 py-12 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <div className="text-2xl font-bold mb-3 text-white">
                                {profile?.name || 'Портфолио'}
                            </div>
                            <p className="text-gray-400 max-w-md">
                                {profile?.title || 'Full Stack разработчик'}
                            </p>
                            <div className="mt-4 text-sm text-gray-500">
                                API: {apiStatus}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            {profile?.github_url && (
                                <a
                                    href={profile.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-icon w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <FaGithub className="text-white" />
                                </a>
                            )}

                            {profile?.linkedin_url && (
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-icon w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <FaLinkedin className="text-white" />
                                </a>
                            )}

                            {profile?.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="glass-icon w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <FaEnvelope className="text-white" />
                                </a>
                            )}

                            {profile?.telegram_url && (
                                <a
                                    href={profile.telegram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-icon w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <FaTelegram className="text-white" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 text-center">
                        <p className="text-gray-400">
                            © {new Date().getFullYear()} {profile?.name || 'Алексей Петров'}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            made by dev
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;