import React, { useState, useEffect } from 'react';
// Импортируем иконки из react-icons/fa
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaPaperPlane, 
  FaExternalLinkAlt, 
  FaCode, 
  FaDatabase, 
  FaServer, 
  FaWrench, 
  FaLaptop, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaStar, 
  FaTimes, 
  FaBars 
} from 'react-icons/fa';

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
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      
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
          message: '✓ Сообщение отправлено'
        });
        
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setSubmitStatus({
        type: 'error',
        message: '✗ Ошибка отправки'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="@username или номер"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black border ${errors.name ? 'border-white' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors`}
        />
        {errors.name && <p className="text-white text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black border ${errors.email ? 'border-white' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors`}
        />
        {errors.email && <p className="text-white text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Сообщение"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black border ${errors.message ? 'border-white' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none`}
        ></textarea>
        {errors.message && <p className="text-white text-xs mt-1">{errors.message}</p>}
      </div>

      {submitStatus && (
        <div className={`px-4 py-2 border ${submitStatus.type === 'success' ? 'border-white bg-white/10' : 'border-gray-500'} text-white text-sm`}>
          {submitStatus.message}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-700 disabled:text-gray-500"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </div>
  );
};

const Portfolio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [profile, setProfile] = useState(null);

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О себе' },
    { id: 'projects', label: 'Проекты' },
    { id: 'skills', label: 'Навыки' },
    { id: 'experience', label: 'Опыт' },
    { id: 'contact', label: 'Контакты' }
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
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProfile(getMockProfile());
        setProjects([]);
        setSkills([]);
        setExperience([]);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setProfile(getMockProfile());
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
    setSidebarOpen(false);
  };

  const getSkillIcon = (category) => {
    switch (category) {
      case 'frontend': return <FaCode size={20} />;
      case 'backend': return <FaServer size={20} />;
      case 'database': return <FaDatabase size={20} />;
      case 'tools': return <FaWrench size={20} />;
      default: return <FaLaptop size={20} />;
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent mb-4 mx-auto"></div>
          <p className="text-white text-sm">Загрузка...</p>
        </div>
      </div>
    );
  }

  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeSkills = Array.isArray(skills) ? skills : [];
  const safeExperience = Array.isArray(experience) ? experience : [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Сайдбар */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-xl font-bold">{profile?.name?.split(' ')[0] || 'Portfolio'}</h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <FaTimes size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <FaGithub size={16} className="mr-2" /> GitHub
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={16} className="mr-2" /> LinkedIn
              </a>
            )}
            {profile?.telegram_url && (
              <a href={profile.telegram_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <FaPaperPlane size={16} className="mr-2" /> Telegram
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка меню для мобильных */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-40 w-10 h-10 flex items-center justify-center bg-white text-black"
      >
        <FaBars size={20} />
      </button>

      {/* Основной контент */}
      <div className="lg:ml-64">
        {/* Герой */}
        <section id="home" className="min-h-screen flex items-center px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 border border-white mb-6 text-xs">
              ДОСТУПЕН ДЛЯ РАБОТЫ
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{profile?.name}</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">{profile?.title}</p>
            <div className="flex gap-4 mb-12">
              <button onClick={() => handleScroll('contact')} className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                Связаться
              </button>
              <button onClick={() => handleScroll('projects')} className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors">
                Проекты
              </button>
            </div>
            <div className="flex gap-8 text-sm">
              <div>
                <div className="text-3xl font-bold">{safeProjects.length}</div>
                <div className="text-gray-500">Проектов</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{safeExperience.length}</div>
                <div className="text-gray-500">Опыта</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{safeSkills.length}</div>
                <div className="text-gray-500">Навыков</div>
              </div>
            </div>
          </div>
        </section>

        {/* О себе */}
        <section id="about" className="min-h-screen flex items-center px-6 md:px-12 border-t border-gray-800">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">О себе</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">{profile?.bio}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {profile?.email && (
                <div className="border border-gray-800 p-4">
                  <div className="text-gray-500 mb-1">Email</div>
                  <div>{profile.email}</div>
                </div>
              )}
              {profile?.location && (
                <div className="border border-gray-800 p-4">
                  <div className="text-gray-500 mb-1">Локация</div>
                  <div>{profile.location}</div>
                </div>
              )}
              {profile?.phone && (
                <div className="border border-gray-800 p-4">
                  <div className="text-gray-500 mb-1">Телефон</div>
                  <div>{profile.phone}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Проекты */}
        <section id="projects" className="min-h-screen px-6 md:px-12 py-20 border-t border-gray-800">
          <h2 className="text-4xl font-bold mb-12">Проекты</h2>
          {safeProjects.length === 0 ? (
            <div className="border border-gray-800 p-12 text-center">
              <FaCode size={48} className="mx-auto mb-4 text-gray-700" />
              <p className="text-gray-500">Проекты не добавлены</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {safeProjects.map((project, index) => (
                <div key={project.id || index} className="border border-gray-800 hover:border-white transition-colors group">
                  <div className="h-48 bg-gray-900 overflow-hidden">
                    <img src={project.image_url || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop'} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{project.short_description || project.description}</p>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {(project.technologies_list || []).map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 border border-gray-800 text-xs">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-sm">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-400">
                          <FaGithub size={16} className="mr-1" /> Код
                        </a>
                      )}
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-400">
                          <FaExternalLinkAlt size={16} className="mr-1" /> Демо
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Навыки */}
        <section id="skills" className="min-h-screen px-6 md:px-12 py-20 border-t border-gray-800">
          <h2 className="text-4xl font-bold mb-12">Навыки</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeSkills.length === 0 ? (
              <div className="col-span-3 border border-gray-800 p-12 text-center">
                <p className="text-gray-500">Навыки не добавлены</p>
              </div>
            ) : (
              safeSkills.map((skill, index) => (
                <div key={skill.id || index} className="border border-gray-800 p-6 hover:border-white transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-3">{getSkillIcon(skill.category)}</div>
                      <div>
                        <div className="font-bold">{skill.name}</div>
                        <div className="text-xs text-gray-500">{skill.category}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{skill.level}%</div>
                  </div>
                  <div className="h-1 bg-gray-800">
                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Опыт */}
        <section id="experience" className="min-h-screen px-6 md:px-12 py-20 border-t border-gray-800">
          <h2 className="text-4xl font-bold mb-12">Опыт работы</h2>
          {safeExperience.length === 0 ? (
            <div className="border border-gray-800 p-12 text-center">
              <FaBriefcase size={48} className="mx-auto mb-4 text-gray-700" />
              <p className="text-gray-500">Опыт работы не добавлен</p>
            </div>
          ) : (
            <div className="space-y-8">
              {safeExperience.map((exp, index) => (
                <div key={exp.id || index} className="border border-gray-800 p-8 hover:border-white transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{exp.position}</h3>
                      <p className="text-gray-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.start_date)} - {exp.is_current ? 'Сейчас' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Контакты */}
        <section id="contact" className="min-h-screen px-6 md:px-12 py-20 border-t border-gray-800">
          <h2 className="text-4xl font-bold mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            <div className="space-y-4">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="block border border-gray-800 p-4 hover:border-white transition-colors">
                  <div className="flex items-center">
                    <FaEnvelope size={20} className="mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="font-medium">{profile.email}</div>
                    </div>
                  </div>
                </a>
              )}
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="block border border-gray-800 p-4 hover:border-white transition-colors">
                  <div className="flex items-center">
                    <FaGithub size={20} className="mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">GitHub</div>
                      <div className="font-medium">Профиль на GitHub</div>
                    </div>
                  </div>
                </a>
              )}
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="block border border-gray-800 p-4 hover:border-white transition-colors">
                  <div className="flex items-center">
                    <FaLinkedin size={20} className="mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">LinkedIn</div>
                      <div className="font-medium">Профиль на LinkedIn</div>
                    </div>
                  </div>
                </a>
              )}
              {profile?.telegram_url && (
                <a href={profile.telegram_url} target="_blank" rel="noopener noreferrer" className="block border border-gray-800 p-4 hover:border-white transition-colors">
                  <div className="flex items-center">
                    <FaPaperPlane size={20} className="mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">Telegram</div>
                      <div className="font-medium">Написать в Telegram</div>
                    </div>
                  </div>
                </a>
              )}
            </div>

            <div className="border border-gray-800 p-6">
              <h3 className="text-xl font-bold mb-6">Написать сообщение</h3>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Футер */}
        <footer className="border-t border-gray-800 px-6 md:px-12 py-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>© {new Date().getFullYear()} {profile?.name}</div>
            <div>Made by dev</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;