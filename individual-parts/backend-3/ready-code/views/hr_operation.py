from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import HrOperation
from core.serializers import HrOperationSerializer
from core.mixins import ChangeHistoryMixin
from core.permissions import IsAdminOrHrManager


class HrOperationViewSet(ChangeHistoryMixin, viewsets.ModelViewSet):
    """CRUD для кадровых операций (с soft-delete и историей)."""

    serializer_class = HrOperationSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    filterset_fields = ['employee', 'operation_type']
    search_fields = ['employee__last_name', 'employee__first_name']
    ordering_fields = ['effective_date', 'id']
    history_object_type = 'hr_operation'

    def get_queryset(self):
        qs = HrOperation.objects.select_related(
            'employee', 'department', 'position', 'created_by'
        )
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        # Вызываем запись истории из миксина
        instance = serializer.instance
        from core.models import ChangeHistory
        new_data = serializer.data
        ChangeHistory.objects.create(
            user=self.request.user,
            object_type=self._get_object_type(),
            object_id=instance.pk,
            changed_fields=list(new_data.keys()),
            old_values={},
            new_values={k: str(v) if v is not None else None for k, v in new_data.items()},
        )
