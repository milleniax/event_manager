from rest_framework import serializers
from .models import Event
from django.conf import settings


class EventSerializer(serializers.Serializer):
    title = serializers.CharField()
    content = serializers.CharField()
    event_date = serializers.DateTimeField()


    def create(self, validated_data):
        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get(
            'content', instance.content)
        instance.event_date = validated_data.get('event_date',
             instance.event_date)
        instance.save()
        return instance
    
