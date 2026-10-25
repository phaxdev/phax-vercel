import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from django.apps import apps

with open('../../data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    model_name = item.get('model')
    pk = item.get('pk')
    fields = item.get('fields', {})
    
    if model_name in ['api.project', 'api.profile', 'api.contactmessage']:
        try:
            Model = apps.get_model(model_name)
            obj, created = Model.objects.update_or_create(
                pk=pk,
                defaults=fields
            )
            print(f"Loaded {model_name} pk={pk}")
        except Exception as e:
            print(f"Failed to load {model_name} pk={pk}: {e}")

# Since COSMOVPN and agy were also requested and we already created them, let's make sure they are preserved.
# Wait, if they are in data.json (COSMOVPN is pk=2, gEcology is pk=3), we might overwrite them.
# Let's fix agy explicitly.
from api.models import Project
p = Project.objects.filter(title="gEcology").first()
if p:
    p.title = "agy"
    p.slug = "agy"
    p.save()
    print("Renamed gEcology to agy.")

print("All valid models loaded.")
