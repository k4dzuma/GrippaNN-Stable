"""Общие миксины для views."""
from django.utils import timezone
from core.models import ChangeHistory


class SoftDeleteMixin:
    """Миксин для мягкого удаления: вместо DELETE ставит deleted_at."""

    def perform_destroy(self, instance):
        instance.deleted_at = timezone.now()
        instance.save(update_fields=['deleted_at'])


class ChangeHistoryMixin:
    """Миксин для автоматической записи истории изменений."""

    history_object_type = None  # переопределить в наследнике

    def _get_object_type(self):
        return self.history_object_type

    def _record_history(self, instance, old_data, new_data, user):
        changed_fields = []
        old_values = {}
        new_values_dict = {}

        for field in new_data:
            old_val = old_data.get(field)
            new_val = new_data.get(field)
            if str(old_val) != str(new_val):
                changed_fields.append(field)
                old_values[field] = str(old_val) if old_val is not None else None
                new_values_dict[field] = str(new_val) if new_val is not None else None

        if changed_fields:
            ChangeHistory.objects.create(
                user=user,
                object_type=self._get_object_type(),
                object_id=instance.pk,
                changed_fields=changed_fields,
                old_values=old_values,
                new_values=new_values_dict,
            )

    def perform_create(self, serializer):
        instance = serializer.save()
        new_data = serializer.data
        ChangeHistory.objects.create(
            user=self.request.user,
            object_type=self._get_object_type(),
            object_id=instance.pk,
            changed_fields=list(new_data.keys()),
            old_values={},
            new_values={k: str(v) if v is not None else None for k, v in new_data.items()},
        )

    def perform_update(self, serializer):
        instance = serializer.instance
        old_data = self.get_serializer(instance).data
        instance = serializer.save()
        new_data = self.get_serializer(instance).data
        self._record_history(instance, old_data, new_data, self.request.user)

    def perform_destroy(self, instance):
        instance.deleted_at = timezone.now()
        instance.save(update_fields=['deleted_at'])
        ChangeHistory.objects.create(
            user=self.request.user,
            object_type=self._get_object_type(),
            object_id=instance.pk,
            changed_fields=['deleted_at'],
            old_values={'deleted_at': None},
            new_values={'deleted_at': str(instance.deleted_at)},
        )
