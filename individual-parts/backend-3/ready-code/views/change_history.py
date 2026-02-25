from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from core.models import ChangeHistory
from core.serializers import ChangeHistorySerializer
from core.permissions import IsAdminOrHrManager


class ChangeHistoryViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Только чтение истории изменений."""

    serializer_class = ChangeHistorySerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    filterset_fields = ['object_type', 'object_id', 'user']
    ordering_fields = ['date']

    def get_queryset(self):
        return ChangeHistory.objects.select_related('user')
