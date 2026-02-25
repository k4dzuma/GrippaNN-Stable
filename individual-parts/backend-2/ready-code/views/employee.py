from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Employee
from core.serializers import EmployeeSerializer
from core.mixins import ChangeHistoryMixin
from core.permissions import IsAdminOrHrManager


class EmployeeViewSet(ChangeHistoryMixin, viewsets.ModelViewSet):
    """CRUD для сотрудников (с soft-delete и историей)."""

    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    search_fields = ['last_name', 'first_name', 'middle_name']
    ordering_fields = ['last_name', 'first_name', 'id']
    history_object_type = 'employee'

    def get_queryset(self):
        qs = Employee.objects.all()
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs
