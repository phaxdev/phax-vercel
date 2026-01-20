from django.contrib import admin
from .models import Project, Experience, Profile, ContactMessage
from django.utils.html import format_html
    
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at', 'status', 'short_message')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('name', 'email', 'phone', 'message', 'created_at')
    fieldsets = (
        ('Информация от пользователя', {
            'fields': ('name', 'email', 'phone', 'message', 'created_at', 'status')
        }),
        ('Ответ администратора', {
            'fields': ('admin_reply',),
            'description': '⚠️ После сохранения ответ будет отправлен на email пользователя автоматически!'
        }),
    )
    
    def short_message(self, obj):
        return obj.message[:50] + "..." if len(obj.message) > 50 else obj.message
    short_message.short_description = "Сообщение"

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'order', 'created_at', 'image_preview')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'description')
    list_editable = ('is_published', 'order')
    prepopulated_fields = {'slug': ('title',)}
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover;" />', obj.image.url)
        return "Нет изображения"
    image_preview.short_description = "Превью"

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'company')
    search_fields = ('position', 'company', 'description')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'updated_at')
    
    def has_add_permission(self, request):
        # Разрешить только один профиль
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)