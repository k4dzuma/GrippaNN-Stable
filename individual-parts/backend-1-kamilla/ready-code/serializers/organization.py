from rest_framework import serializers
from core.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'comment', 'deleted_at']
        read_only_fields = ['id', 'deleted_at']
