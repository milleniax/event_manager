from django.apps import AppConfig
from .tasks import event_send_mail


class MainConfig(AppConfig):
    name = 'main'

    async def ready(self):
        await event_send_mail.delay()