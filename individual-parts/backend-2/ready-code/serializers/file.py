from rest_framework import serializers
from core.models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'employee', 'title', 'file', 'uploaded_at', 'deleted_at']
        read_only_fields = ['id', 'uploaded_at', 'deleted_at']
