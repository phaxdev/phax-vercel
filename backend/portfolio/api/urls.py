from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet

router = DefaultRouter()
router.register(r'contact-messages', ContactMessageViewSet, basename='contact-messages')

from .views import (
    ProjectListAPIView, 
    ProfileDetailAPIView,
    test_view,
    health_check
)

urlpatterns = [
    path('', test_view, name='api-root'),
    path('projects/', ProjectListAPIView.as_view(), name='projects'),
    path('profile/', ProfileDetailAPIView.as_view(), name='profile'),
    path('health/', health_check, name='health-check'),
    path('', include(router.urls)),
]