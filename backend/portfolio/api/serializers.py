from rest_framework import serializers
from .models import Project, Skill, Experience, Profile, ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at', 'status']
        read_only_fields = ['created_at', 'status']

class ProjectSerializer(serializers.ModelSerializer):
    technologies_list = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'technologies', 'technologies_list', 'image', 'image_url',
            'github_url', 'live_url', 'created_at', 'updated_at', 'order'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']

    def get_technologies_list(self, obj):
        if obj.technologies:
            return [tech.strip() for tech in obj.technologies.split(',')]
        return []

    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            request = self.context.get('request')
            if request:
                url = request.build_absolute_uri(obj.image.url)
                return url.replace('http://', 'https://')
            return obj.image.url.replace('http://', 'https://')
        return None

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level', 'order', 'is_active']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'description',
            'start_date', 'end_date', 'is_current', 'order'
        ]

class ProfileSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()  # ← Переопределяем photo
    cv_file = serializers.SerializerMethodField()  # ← И cv_file тоже

    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'bio', 'email', 'phone', 'location',
            'github_url', 'linkedin_url', 'telegram_url', 'photo', 'photo_url',
            'cv_file', 'updated_at'
        ]

    def get_photo(self, obj):
        if obj.photo and hasattr(obj.photo, 'url'):
            request = self.context.get('request')
            if request:
                url = request.build_absolute_uri(obj.photo.url)
                return url.replace('http://', 'https://')
            return obj.photo.url.replace('http://', 'https://')
        return None

    def get_photo_url(self, obj):
        # Используем тот же метод
        return self.get_photo(obj)
    
    def get_cv_file(self, obj):
        if obj.cv_file and hasattr(obj.cv_file, 'url'):
            request = self.context.get('request')
            if request:
                url = request.build_absolute_uri(obj.cv_file.url)
                return url.replace('http://', 'https://')
            return obj.cv_file.url.replace('http://', 'https://')
        return None