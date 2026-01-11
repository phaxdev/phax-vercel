from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Skill, Experience, Profile
from .serializers import (
    ProjectSerializer, SkillSerializer, 
    ExperienceSerializer, ProfileSerializer
)

@api_view(['GET'])
def test_view(request):
    return Response({
        'message': 'Django API работает!',
        'endpoints': {
            'profile': '/api/profile/',
            'projects': '/api/projects/',
            'skills': '/api/skills/',
            'experience': '/api/experience/'
        }
    })

class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

class SkillListAPIView(generics.ListAPIView):
    queryset = Skill.objects.filter(is_active=True).order_by('order')
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]

class ExperienceListAPIView(generics.ListAPIView):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]

class ProfileDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_object(self):
        # Получаем или создаем профиль по умолчанию
        profile, created = Profile.objects.get_or_create(
            defaults={
                'name': 'Алексей Петров',
                'title': 'Full Stack разработчик',
                'bio': 'Добавьте информацию о себе в админ-панели Django',
                'email': 'example@email.com'
            }
        )
        return profile