from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Position
from core.serializers import PositionSerializer
from core.mixins import ChangeHistoryMixin
from core.permissions import IsAdminOrHrManager


class PositionViewSet(ChangeHistoryMixin, viewsets.ModelViewSet):
    """CRUD для должностей (с soft-delete и историей)."""

    serializer_class = PositionSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    search_fields = ['name']
    ordering_fields = ['name', 'id']
    history_object_type = 'position'

    def get_queryset(self):
        qs = Position.objects.all()
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs
