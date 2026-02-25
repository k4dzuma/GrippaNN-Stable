from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from core.models import File
from core.serializers import FileSerializer
from core.mixins import SoftDeleteMixin
from core.permissions import IsAdminOrHrManager


class FileViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
    """CRUD для файлов сотрудников (загрузка / soft-delete)."""

    serializer_class = FileSerializer
    permission_classes = [IsAuthenticated, IsAdminOrHrManager]
    parser_classes = [MultiPartParser, FormParser]
    filterset_fields = ['employee']
    history_object_type = 'file'

    def get_queryset(self):
        qs = File.objects.select_related('employee')
        show_deleted = self.request.query_params.get('show_deleted', 'false')
        if show_deleted.lower() != 'true':
            qs = qs.filter(deleted_at__isnull=True)
        return qs
