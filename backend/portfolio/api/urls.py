from django.urls import path
from .views import (
    ProjectListAPIView, 
    SkillListAPIView,
    ExperienceListAPIView, 
    ProfileDetailAPIView,
    test_view
)

urlpatterns = [
    path('', test_view, name='api-root'),
    path('projects/', ProjectListAPIView.as_view(), name='projects'),
    path('skills/', SkillListAPIView.as_view(), name='skills'),
    path('experience/', ExperienceListAPIView.as_view(), name='experience'),
    path('profile/', ProfileDetailAPIView.as_view(), name='profile'),
]