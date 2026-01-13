from django.db import models
from django.utils.text import slugify
from django.core.mail import send_mail
from django.conf import settings

class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новое'),
        ('read', 'Прочитано'),
        ('replied', 'Ответ отправлен'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new')
    admin_reply = models.TextField(blank=True, verbose_name="Ответ администратора")
    
    def save(self, *args, **kwargs):
        # Если добавлен ответ администратора, отправляем email
        is_new = self._state.adding
        if not is_new and self.pk:
            old_instance = ContactMessage.objects.get(pk=self.pk)
            if old_instance.admin_reply != self.admin_reply and self.admin_reply:
                self.send_reply_email()
                self.status = 'replied'
        
        super().save(*args, **kwargs)
    
    def send_reply_email(self):
        """Отправка ответа на email пользователя"""
        subject = f"Ответ на ваше сообщение от PhaxDev"
        message = f"""Здравствуйте, {self.name}!

Спасибо за ваше сообщение.

Наш ответ:
{self.admin_reply}

---
С уваженimportm,
Команда PhaxDev"""
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[self.email],
            fail_silently=False,
        )
    
    def __str__(self):
        return f"{self.name} - {self.email}"
    
    class Meta:
        verbose_name = "Контактное сообщение"
        verbose_name_plural = "Контактные сообщения"
        ordering = ['-created_at']

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название проекта")
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField(verbose_name="Описание")
    short_description = models.CharField(max_length=300, verbose_name="Краткое описание")
    technologies = models.CharField(max_length=500, verbose_name="Технологии (через запятую)")
    image = models.ImageField(upload_to='projects/', verbose_name="Изображение")
    github_url = models.URLField(blank=True, verbose_name="GitHub ссылка")
    live_url = models.URLField(blank=True, verbose_name="Демо ссылка")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")
    order = models.IntegerField(default=0, verbose_name="Порядок отображения")

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_technologies_list(self):
        return [tech.strip() for tech in self.technologies.split(',')]

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Базы данных'),
        ('tools', 'Инструменты'),
        ('other', 'Другое'),
    ]

    name = models.CharField(max_length=100, verbose_name="Название навыка")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Категория")
    level = models.IntegerField(default=50, verbose_name="Уровень (0-100)")
    order = models.IntegerField(default=0, verbose_name="Порядок отображения")
    is_active = models.BooleanField(default=True, verbose_name="Активный")

    class Meta:
        verbose_name = "Навык"
        verbose_name_plural = "Навыки"
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

class Experience(models.Model):
    company = models.CharField(max_length=200, verbose_name="Компания")
    position = models.CharField(max_length=200, verbose_name="Должность")
    description = models.TextField(verbose_name="Описание обязанностей")
    start_date = models.DateField(verbose_name="Дата начала")
    end_date = models.DateField(null=True, blank=True, verbose_name="Дата окончания")
    is_current = models.BooleanField(default=False, verbose_name="Текущее место работы")
    order = models.IntegerField(default=0, verbose_name="Порядок отображения")

    class Meta:
        verbose_name = "Опыт работы"
        verbose_name_plural = "Опыт работы"
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"

class Profile(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    title = models.CharField(max_length=200, verbose_name="Должность/Специализация")
    bio = models.TextField(verbose_name="Биография")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Телефон")
    location = models.CharField(max_length=100, blank=True, verbose_name="Местоположение")
    github_url = models.URLField(blank=True, verbose_name="GitHub")
    linkedin_url = models.URLField(blank=True, verbose_name="LinkedIn")
    telegram_url = models.URLField(blank=True, verbose_name="Telegram")
    photo = models.ImageField(upload_to='profile/', blank=True, verbose_name="Фото")
    cv_file = models.FileField(upload_to='cv/', blank=True, verbose_name="Файл резюме")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профиль"

    def __str__(self):
        return self.name