import os
from pathlib import Path
from decouple import config
import cloudinary
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Загружаем переменные из .env (только для локальной разработки)
from dotenv import load_dotenv
load_dotenv()

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-your-secret-key-here')

DEBUG = True

# Настройки сайта
SITE_URL = os.environ.get('SITE_URL', 'https://phax-vercel-ghostmaresaos-projects.vercel.app/')

# Email администратора
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'phaxdev.info@internet.ru')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'phaxdev.info@internet.ru')

ALLOWED_HOSTS = [
    'phax-vercel-production-e515.up.railway.app',
    'localhost',
    '127.0.0.1',
    '*'
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
    'cloudinary_storage',
    'cloudinary',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
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

# ========== БАЗА ДАННЫХ - ИСПРАВЛЕНО! ==========
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# Fallback на SQLite для локальной разработки (если нет DATABASE_URL)
if not os.environ.get('DATABASE_URL'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
# ================================================

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

frontend_static = os.path.join(BASE_DIR, 'frontend', 'build', 'static')
if os.path.exists(frontend_static):
    STATICFILES_DIRS.append(frontend_static)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# НАСТРОЙКИ CORS
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    'https://phax-vercel-production-e515.up.railway.app',
    'http://localhost:3000',
]

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
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ]
}

# Cloudinary
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME', 'ddear0jsu'),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY', '469328817995718'),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET', 'jIQRjFpJVBi_Z45DInN2ZEDIprw')
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Email настройки
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mail.ru'
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_HOST_USER = 'phaxdev.info@internet.ru'
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD')  # ⚠️ ИСПРАВЛЕНО!
DEFAULT_FROM_EMAIL = 'phaxdev.info@internet.ru'
SERVER_EMAIL = 'phaxdev.info@internet.ru'