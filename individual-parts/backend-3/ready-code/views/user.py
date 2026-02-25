from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from core.models import User
from core.serializers import UserSerializer, UserCreateSerializer
from core.permissions import IsAdmin


class UserViewSet(viewsets.ModelViewSet):
    """CRUD для пользователей (только для администраторов)."""

    permission_classes = [IsAuthenticated, IsAdmin]
    search_fields = ['username', 'last_name', 'first_name']
    ordering_fields = ['last_name', 'username']

    def get_serializer_class(self):
        if self.action in ('create', 'update', 'partial_update'):
            return UserCreateSerializer
        return UserSerializer

    def get_queryset(self):
        qs = User.objects.all()
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Защита от самоудаления
        if instance.id == request.user.id:
            raise ValidationError({
                "detail": "Вы не можете удалить свою собственную учетную запись. Обратитесь к другому администратору."
            })
            
        # Защита системного админа
        if instance.username == 'admin':
            raise ValidationError({
                "detail": "Удаление главного системного администратора (admin) запрещено для обеспечения безопасности системы."
            })
            
        return super().destroy(request, *args, **kwargs)

    def perform_destroy(self, instance):
        instance.deleted_at = timezone.now()
        instance.is_active = False
        instance.save(update_fields=['deleted_at', 'is_active'])
