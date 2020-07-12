from celery import shared_task
from .models import Event
from datetime import datetime, timedelta
from django.core.mail import send_mail
from celery.decorators import periodic_task
from celery.task.schedules import crontab


@periodic_task(run_every=(crontab(minute='*')), name="event_send_mail")
def event_send_mail():
    events = Event.objects.filter(event_date__range=(datetime.now() + timedelta(minutes=59),datetime.now() + timedelta(minutes=61)))
    print(events)
    for event in events:
        try:
            send_mail("Напоминание о событии", str(event.title) + "начинаеся через час",
                                     "abdullinmarsel31@gmail.com", ["marsel.abdullin.00@mail.ru",])
        except Exception as e:
            print(e)
