release: cd backend/portfolio && python manage.py migrate --noinput && python manage.py loaddata ../../data.json
web: cd backend/portfolio && gunicorn portfolio.wsgi