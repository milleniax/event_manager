from celery import shared_task
from .models import Event
from datetime import datetime, timedelta
from django.core.mail import send_mail


@shared_task
def event_send_mail():
    events = Event.objects.filter(event_date=datetime.now() + timedelta(minutes=60))
    for event in events:
        print("Событие")
        send_mail("Напоминание о событии", str(event.title) + "начинаеся через час",
                                     "marsel.abdullin.00@mail.ru", [event.user.email, ])
