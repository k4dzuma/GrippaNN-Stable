from rest_framework import serializers
from core.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            'id', 'last_name', 'first_name', 'middle_name', 'full_name',
            'birth_date',
            'passport_series', 'passport_number', 'passport_issue_date',
            'passport_issued_by', 'passport_code',
            'address_region', 'address_city', 'address_street',
            'address_house', 'address_building', 'address_flat',
            'deleted_at',
        ]
        read_only_fields = ['id', 'deleted_at']

    def get_full_name(self, obj):
        return f'{obj.last_name} {obj.first_name} {obj.middle_name}'.strip()
