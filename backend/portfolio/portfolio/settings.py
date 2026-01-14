import os
from pathlib import Path
from decouple import config
import cloudinary

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-your-secret-key-here')

DEBUG = True

# Настройки сайта
SITE_URL = os.environ.get('SITE_URL', 'https://phax-vercel-ghostmaresaos-projects.vercel.app/')

# Email администратора
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'phaxdev.info@internet.ru')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'noreply@example.com')

ALLOWED_HOSTS = [
    'phax-vercel-production-e515.up.railway.app',
    'localhost',
    '127.0.0.1',
    '*'  # для разработки, потом можно убрать
]

CSRF_TRUSTED_ORIGINS = [
    'https://phax-vercel-production-e515.up.railway.app',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cloudinary_storage',  # добавить ПЕРЕД django.contrib.staticfiles
    'cloudinary',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ДОЛЖНО БЫТЬ ПЕРВЫМ!
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'portfolio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portfolio.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = []

# Добавляем только если папка существует
frontend_static = os.path.join(BASE_DIR, 'frontend', 'build', 'static')
if os.path.exists(frontend_static):
    STATICFILES_DIRS.append(frontend_static)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# НАСТРОЙКИ CORS - ОЧЕНЬ ВАЖНО!
CORS_ALLOW_ALL_ORIGINS = True  # Для разработки разрешаем все
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    'https://phax-vercel-production-e515.up.railway.app',
    'http://localhost:3000',  # если фронтенд локально
    "https://phax-vercel-production-e515.up.railway.app",  # ваш Vercel домен
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# REST Framework настройки
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # Разрешаем всем на время разработки
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ]
}

cloudinary.config(cloudinary_url=os.getenv('CLOUDINARY_URL=cloudinary://<469328817995718>:<jIQRjFpJVBi_Z45DInN2ZEDIprw>@ddear0jsu'))

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
