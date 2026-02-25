from rest_framework import serializers
from core.models import ChangeHistory


class ChangeHistorySerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.__str__', read_only=True, default=None)
    object_type_display = serializers.CharField(
        source='get_object_type_display', read_only=True
    )

    class Meta:
        model = ChangeHistory
        fields = [
            'id', 'date', 'user', 'user_name',
            'object_type', 'object_type_display',
            'object_id', 'changed_fields',
            'old_values', 'new_values',
        ]
        read_only_fields = fields
