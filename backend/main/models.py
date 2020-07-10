from django.db import models
from django.conf import settings


class Event(models.Model):
    """Event which create user"""
    title = models.CharField(max_length=70, verbose_name="Название")
    content = models.CharField(max_length=300, verbose_name="Содержание")
    event_date = models.DateTimeField(verbose_name="Дата события")
    email = models.EmailField()

    def __str__(self):
        return self.title
