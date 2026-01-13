from rest_framework import generics, permissions
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Skill, Experience, Profile
from .serializers import (
    ProjectSerializer, SkillSerializer,
    ExperienceSerializer, ProfileSerializer
)
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django.core.mail import send_mail
from django.conf import settings
from django.http import HttpResponse
import os
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]  # Разрешить всем
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Сохраняем сообщение
            self.perform_create(serializer)
            
            # Просто выводим в консоль
            data = serializer.data
            print(f"✅ Сообщение сохранено: {data['name']} ({data['email']})")
            
            return Response({
                'success': True,
                'message': 'Сообщение отправлено!',
                'data': data
            }, status=status.HTTP_201_CREATED)
        
        # Если ошибка валидации
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

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

def serve_react(request):
    index_path = os.path.join(settings.BASE_DIR, 'frontend', 'build', 'index.html')
    with open(index_path, 'r') as f:
        return HttpResponse(f.read(), content_type='text/html')

def health_check(request):
    return JsonResponse({
        'status': 'ok',
        'message': 'Backend is running',
        'service': 'portfolio-api'
    })