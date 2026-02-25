from rest_framework import serializers
from core.models import Department


class DepartmentSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    parent_name = serializers.CharField(source='parent.name', read_only=True, default=None)

    class Meta:
        model = Department
        fields = [
            'id', 'organization', 'organization_name',
            'name', 'parent', 'parent_name',
            'comment', 'deleted_at',
        ]
        read_only_fields = ['id', 'deleted_at']
