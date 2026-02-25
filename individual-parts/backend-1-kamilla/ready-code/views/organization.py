from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Organization
from core.serializers import OrganizationSerializer
from core.mixins import ChangeHistoryMixin
from core.permissions import IsAdminOrHrManager


class OrganizationViewSet(ChangeHistoryMixin, viewsets.ModelViewSet):
    """CRUD для организаций (с soft-delete и историей)."""

    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    search_fields = ['name']
    ordering_fields = ['name', 'id']
    history_object_type = 'organization'

    def get_queryset(self):
        qs = Organization.objects.all()
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs
