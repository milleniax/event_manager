from datetime import timedelta
from celery.schedules import crontab


CELERYBEAT_SCHEDULE = {
    'send_mail': {
        'task': 'send_mail',
        'schedule': timedelta(minutes=1),
    },
}
