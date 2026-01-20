from rest_framework import generics, permissions
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Experience, Profile
from .serializers import (
    ProjectSerializer, ExperienceSerializer, ProfileSerializer
)
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.core.mail import send_mail
from django.conf import settings
import os
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            data = serializer.data
            print(f"✅ Сообщение сохранено: {data['name']} ({data['email']})")
            
            return Response({
                'success': True,
                'message': 'Сообщение отправлено!',
                'data': data
            }, status=status.HTTP_201_CREATED)
        
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
            'experience': '/api/experience/'
        }
    })

class ProjectListAPIView(generics.ListAPIView):
    queryset = Project.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

class ExperienceListAPIView(generics.ListAPIView):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]

class ProfileDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        profile, created = Profile.objects.get_or_create(
            defaults={
                'name': 'phax',
                'title': 'Full Stack разработчик',
                'bio': 'Специализируюсь на разработке сайтов под ключ. занимаюсь версткой по макету, пишу скрипты на Lua, немного знаю C++ и C#',
                'email': 'phaxdev.info@internet.ru'
            }
        )
        return profile

def serve_react(request):
    # Фронтенд развернут отдельно
    return JsonResponse({
        'message': 'API is running',
        'admin': '/admin/',
        'api': '/api/',
        'health': '/api/health/'
    })

def health_check(request):
    return JsonResponse({
        'status': 'ok',
        'message': 'Backend is running',
        'service': 'portfolio-api'
    })