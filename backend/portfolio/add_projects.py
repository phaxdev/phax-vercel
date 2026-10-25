import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from api.models import Project

p1, created1 = Project.objects.update_or_create(
    title="COSMOVPN",
    defaults={
        "description": "Быстрый и надежный VPN-сервис для безопасного доступа в интернет.",
        "short_description": "VPN-сервис нового поколения.",
        "technologies": "VPN, Security",
        "is_published": True,
        "order": 1
    }
)
print(f"COSMOVPN created: {created1}")

p2, created2 = Project.objects.update_or_create(
    title="agy",
    defaults={
        "description": "Базовый шаблон для проекта agy. Вы можете изменить это описание в панели администратора.",
        "short_description": "Проект agy",
        "technologies": "React, Python, Django",
        "is_published": True,
        "order": 2
    }
)
print(f"agy created: {created2}")

print("Current projects:")
for p in Project.objects.all():
    print(f"- {p.title}")
