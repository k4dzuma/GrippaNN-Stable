from rest_framework import serializers
from core.models import Position


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['id', 'name', 'comment', 'deleted_at']
        read_only_fields = ['id', 'deleted_at']
