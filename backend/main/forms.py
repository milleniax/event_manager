from django.forms import ModelForm
from .models import Event


class EventForm(ModelForm):
    """Form for creating event"""
    class Meta:
        model = Event
        fields = ('title', 'content', 'event_date' , 'email')
