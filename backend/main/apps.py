from django.apps import AppConfig
from .tasks import event_send_mail


class MainConfig(AppConfig):
    name = 'main'

    async def ready(self):
        """Start celery worker to control email sending"""
        await event_send_mail.delay()