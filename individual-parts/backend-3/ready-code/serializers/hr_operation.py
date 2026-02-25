from rest_framework import serializers
from core.models import HrOperation


class HrOperationSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.__str__', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True, default=None)
    position_name = serializers.CharField(source='position.name', read_only=True, default=None)
    created_by_name = serializers.CharField(source='created_by.__str__', read_only=True, default=None)
    operation_type_display = serializers.CharField(
        source='get_operation_type_display', read_only=True
    )

    class Meta:
        model = HrOperation
        fields = [
            'id', 'employee', 'employee_name',
            'operation_type', 'operation_type_display',
            'department', 'department_name',
            'position', 'position_name',
            'salary', 'effective_date',
            'created_by', 'created_by_name',
            'deleted_at',
        ]
        read_only_fields = ['id', 'created_by', 'deleted_at']
