from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Department
from core.serializers import DepartmentSerializer
from core.mixins import ChangeHistoryMixin
from core.permissions import IsAdminOrHrManager


class DepartmentViewSet(ChangeHistoryMixin, viewsets.ModelViewSet):
    """CRUD для отделов (с soft-delete и историей)."""

    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    search_fields = ['name']
    ordering_fields = ['name', 'id']
    filterset_fields = ['organization']
    history_object_type = 'department'

    def get_queryset(self):
        qs = Department.objects.select_related('organization', 'parent')
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs
