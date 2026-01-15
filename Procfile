release: python manage.py migrate --noinput && python manage.py loaddata data.json || true
web: gunicorn portfolio.wsgi