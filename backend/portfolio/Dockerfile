FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libjpeg-dev \
    zlib1g-dev \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput || true

# Создаём суперпользователя при старте если переменные заданы
CMD python manage.py migrate && \
    (python manage.py createsuperuser --noinput 2>/dev/null || echo "Superuser already exists") && \
    python manage.py runserver 0.0.0.0:$PORT