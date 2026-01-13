FROM python:3.11-slim

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY backend/portfolio/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy and build frontend
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm ci && npm run build

WORKDIR /app

# Copy backend code
COPY backend/portfolio/ ./

# Run Django migrations and collect static
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
