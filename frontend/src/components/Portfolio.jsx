import React, { useState, useEffect } from 'react';

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
            const API_URL = process.env.REACT_APP_API_URL; || 'http://localhost:8000/api';

            const response = await fetch(`${API_URL}/contact-messages/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 201) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Сообщение отправлено'
                });

                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });

                setTimeout(() => {
                    setSubmitStatus(null);
                }, 5000);
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);

            setSubmitStatus({
                type: 'error',
                message: 'Произошла ошибка при отправке'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="ИМЯ / USERNAME"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.name
                            ? 'border-red-500'
                            : 'border-neutral-800'
                            } focus:outline-none focus:border-neutral-600 transition-colors text-white placeholder-neutral-600 text-sm tracking-widest uppercase`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.name}</p>
                    )}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.email
                            ? 'border-red-500'
                            : 'border-neutral-800'
                            } focus:outline-none focus:border-neutral-600 transition-colors text-white placeholder-neutral-600 text-sm tracking-widest uppercase`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.email}</p>
                    )}
                </div>

                <div>
                    <textarea
                        name="message"
                        placeholder="СООБЩЕНИЕ"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.message
                            ? 'border-red-500'
                            : 'border-neutral-800'
                            } focus:outline-none focus:border-neutral-600 transition-colors text-white placeholder-neutral-600 resize-none text-sm tracking-widest uppercase`}
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-500 text-xs mt-2 tracking-wide">{errors.message}</p>
                    )}
                </div>

                {submitStatus && (
                    <div className={`p-4 text-center text-sm tracking-wide ${submitStatus.type === 'success'
                        ? 'text-green-400'
                        : 'text-red-400'
                        }`}>
                        {submitStatus.message}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-5 border-2 border-white text-white text-sm tracking-widest uppercase transition-all duration-300 ${isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-white hover:text-black'
                        }`}
                >
                    {isSubmitting ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
                </button>
            </div>
        </div>
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

    const menuItems = [
        { id: 'home', label: 'ГЛАВНАЯ' },
        { id: 'about', label: 'ОБО МНЕ' },
        { id: 'projects', label: 'ПРОЕКТЫ' },
        { id: 'skills', label: 'НАВЫКИ' },
        { id: 'experience', label: 'ОПЫТ' },
        { id: 'contact', label: 'КОНТАКТЫ' }
    ];

    const getMockProfile = () => ({
        name: 'Алексей Петров',
        title: 'Full Stack Developer',
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
                setApiStatus('Подключение к сайту...');

                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

                // Загружаем все данные параллельно
                const [projectsRes, skillsRes, experienceRes, profileRes] = await Promise.allSettled([
                    fetch(`${API_URL}/projects/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/skills/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/experience/`).then(r => r.ok ? r.json() : []),
                    fetch(`${API_URL}/profile/`).then(r => r.ok ? r.json() : getMockProfile())
                ]);

                // Обрабатываем результаты
                const projectsData = projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value)
                    ? projectsRes.value
                    : [];

                const skillsData = skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value)
                    ? skillsRes.value
                    : [];

                const experienceData = experienceRes.status === 'fulfilled' && Array.isArray(experienceRes.value)
                    ? experienceRes.value
                    : [];

                const profileData = profileRes.status === 'fulfilled' && profileRes.value
                    ? profileRes.value
                    : getMockProfile();

                console.log('Загруженные данные:', {
                    projects: projectsData.length,
                    skills: skillsData.length,
                    experience: experienceData.length,
                    profile: profileData
                });

                setProjects(projectsData);
                setSkills(skillsData);
                setExperience(experienceData);
                setProfile(profileData);
                setApiStatus('Данные загружены');

            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setProfile(getMockProfile());
                setProjects([]);
                setSkills([]);
                setExperience([]);
                setApiStatus('Ошибка подключения к API');
            } finally {
                setLoading(false);
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

    const formatDate = (dateString) => {
        if (!dateString) return 'НАСТОЯЩЕЕ ВРЕМЯ';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }).toUpperCase();
        } catch {
            return dateString;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="w-1 h-20 bg-white mx-auto mb-8 animate-pulse"></div>
                    <p className="text-white text-sm tracking-widest uppercase mb-4">{apiStatus}</p>
                    <p className="text-neutral-600 text-xs">
                        Текущий адрес: {window.location.hostname}:{window.location.port}
                    </p>
                </div>
            </div>
        );
    }

const safeProjects = Array.isArray(projects) ? projects : [];
const safeSkills = Array.isArray(skills) ? skills : [];
const safeExperience = Array.isArray(experience) ? experience : [];

return (
    <div className="min-h-screen bg-black text-white font-sans">
        {/* Навигация */}
        <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50 border-b border-neutral-900">
            <div className="container mx-auto px-6 py-6">
                <div className="flex justify-between items-center">
                    <div className="text-sm tracking-widest uppercase font-light">
                        {profile?.name?.split(' ')[0] || 'Portfolio'}
                    </div>

                    <div className="hidden md:flex space-x-12">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleScroll(item.id)}
                                className="text-xs tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        className="md:hidden text-neutral-400 hover:text-white transition-colors text-sm tracking-widest"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? 'ЗАКРЫТЬ' : 'МЕНЮ'}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-8 pb-8 space-y-6">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleScroll(item.id)}
                                className="block w-full text-left text-sm tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>

        {/* Герой */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="w-1 h-24 bg-white mx-auto"></div>

                    <h1 className="text-5xl md:text-7xl font-light tracking-tight">
                        {profile?.name || 'Разработчик'}
                    </h1>

                    <p className="text-sm tracking-widest text-neutral-400 uppercase">
                        {profile?.title || 'Full Stack Developer'}
                    </p>

                    <div className="flex justify-center gap-16 pt-8">
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">{safeProjects.length}</div>
                            <div className="text-xs tracking-widest text-neutral-500 uppercase">Проектов</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">{safeExperience.length}</div>
                            <div className="text-xs tracking-widest text-neutral-500 uppercase">Года опыта</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-light mb-2">{safeSkills.length}</div>
                            <div className="text-xs tracking-widest text-neutral-500 uppercase">Навыков</div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6 pt-12">
                        <button
                            onClick={() => handleScroll('contact')}
                            className="px-10 py-4 border-2 border-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
                        >
                            СВЯЗАТЬСЯ
                        </button>
                        <button
                            onClick={() => handleScroll('projects')}
                            className="px-10 py-4 border-2 border-neutral-700 text-neutral-400 text-sm tracking-widest uppercase hover:border-white hover:text-white transition-all duration-300"
                        >
                            ПРОЕКТЫ
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Обо мне */}
        <section id="about" className="py-32 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-12 text-center">
                        ОБО МНЕ
                    </h2>

                    <div className="text-center space-y-8">
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300">
                            {profile?.bio || 'Информация о вас появится здесь после добавления в админ-панель.'}
                        </p>

                        {(profile?.email || profile?.location) && (
                            <div className="flex justify-center gap-12 pt-12 text-sm tracking-wide text-neutral-500">
                                {profile?.email && (
                                    <div>EMAIL: {profile.email}</div>
                                )}
                                {profile?.location && (
                                    <div>ЛОКАЦИЯ: {profile.location}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* Проекты */}
        <section id="projects" className="py-32 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-20 text-center">
                    ПРОЕКТЫ
                </h2>

                {safeProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-1 h-16 bg-neutral-800 mx-auto mb-8"></div>
                        <p className="text-neutral-500 text-sm tracking-wide uppercase mb-4">
                            Добавьте проекты через админ-панель
                        </p>
                        <p className="text-neutral-700 text-xs">
                            Статус API: {apiStatus}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-24">
                        {safeProjects.map((project, index) => (
                            <div
                                key={project.id || index}
                                className="border-b border-neutral-900 pb-24 last:border-0"
                            >
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="aspect-video bg-neutral-900 overflow-hidden">
                                        <img
                                            src={project.image_url || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop'}
                                            alt={project.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center space-y-6">
                                        <h3 className="text-3xl font-light">{project.title}</h3>
                                        <p className="text-neutral-400 leading-relaxed">
                                            {project.short_description || project.description || 'Описание проекта'}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {(project.technologies_list || []).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="text-xs tracking-widest text-neutral-500 uppercase"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-6 pt-4">
                                            {project.github_url && (
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs tracking-widest text-white hover:text-neutral-400 transition-colors uppercase"
                                                >
                                                    GITHUB →
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs tracking-widest text-white hover:text-neutral-400 transition-colors uppercase"
                                                >
                                                    ДЕМО →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>

        {/* Навыки */}
        <section id="skills" className="py-32 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-20 text-center">
                    НАВЫКИ
                </h2>

                <div className="max-w-4xl mx-auto">
                    {safeSkills.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-500 text-sm tracking-wide uppercase">Навыки не добавлены</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {safeSkills.map((skill, index) => (
                                <div
                                    key={skill.id || index}
                                    className="border-b border-neutral-900 pb-8"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm tracking-widest uppercase">{skill.name}</span>
                                        <span className="text-neutral-500 text-sm">{skill.level}%</span>
                                    </div>
                                    <div className="h-px bg-neutral-900 relative overflow-hidden">
                                        <div
                                            className="h-full bg-white absolute top-0 left-0 transition-all duration-1000"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Опыт */}
        <section id="experience" className="py-32 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-20 text-center">
                    ОПЫТ РАБОТЫ
                </h2>

                <div className="max-w-4xl mx-auto">
                    {safeExperience.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-500 text-sm tracking-wide uppercase">Опыт работы не добавлен</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {safeExperience.map((exp, index) => (
                                <div
                                    key={exp.id || index}
                                    className="border-b border-neutral-900 pb-16 last:border-0"
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between mb-6">
                                        <div>
                                            <h3 className="text-2xl font-light mb-2">{exp.position}</h3>
                                            <p className="text-neutral-400 tracking-wide">{exp.company}</p>
                                        </div>
                                        <span className="text-xs tracking-widest text-neutral-500 uppercase mt-4 md:mt-0">
                                            {formatDate(exp.start_date)} - {exp.is_current ? 'НАСТОЯЩЕЕ ВРЕМЯ' : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-neutral-400 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Контакты */}
        <section id="contact" className="py-32 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <h2 className="text-xs tracking-widest text-neutral-500 uppercase mb-20 text-center">
                    КОНТАКТЫ
                </h2>

                <ContactForm />

                {(profile?.github_url || profile?.linkedin_url || profile?.telegram_url) && (
                    <div className="flex justify-center gap-12 mt-20 text-xs tracking-widest uppercase">
                        {profile?.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                GITHUB
                            </a>
                        )}
                        {profile?.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                LINKEDIN
                            </a>
                        )}
                        {profile?.telegram_url && (
                            <a
                                href={profile.telegram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                TELEGRAM
                            </a>
                        )}
                    </div>
                )}
            </div>
        </section>

        {/* Футер */}
        <footer className="py-12 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                <div className="text-center space-y-4">
                    <p className="text-xs tracking-widest text-neutral-500 uppercase">
                        © {new Date().getFullYear()} {profile?.name || 'Алексей Петров'}
                    </p>
                    <p className="text-xs text-neutral-700">
                        MADE BY DEV
                    </p>
                    <p className="text-xs text-neutral-800">
                        API: {apiStatus}
                    </p>
                </div>
            </div>
        </footer>
    </div>
);
};

export default Portfolio;