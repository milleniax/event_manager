from django.shortcuts import get_object_or_404, redirect, render
from .forms import EventForm
from .models import Event
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .serializers import EventSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
import logging



logger = logging.getLogger(__name__)


@login_required
def dashboard(request):
    return render(request, 'main/dashboard.html')

@login_required
def create_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            user = request.user
            title = form.cleaned_data['title']
            content = form.cleaned_data['content']
            event_date = form.cleaned_data['event_date']
            Event.objects.create(user=user,title=title, content=content,
                                            event_date=event_date)
            
            message = 'Событие успешно создано'
            context = {"message": message}
            messages.success(request, 'Событие успешно добавлено')
            return redirect("main:event_list")
    else:
        form = EventForm()

    context = {'form': form}
    return render(request, 'main/create_event.html', context)

@login_required
def event_list(request):
    events = Event.objects.filter(user=request.user)
    context = {'events': events}
    return render(request, 'main/event_list.html', context)


class EventView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response({"events": serializer.data})

    def post(self, request):
        event = request.data.get('event')
        event.user = self.context['view'].request.user
        serializer = EventSerializer(data=event)
        if serializer.is_valid(raise_exception=True):
            event_saved = serializer.save()
        return Response({"success": "Event created successfully"})
    
    def put(self, request, pk):
        saved_event = get_object_or_404(Event.objects.all(), pk=pk)
        data = request.data.get('event')
        serializer = EventSerializer(
            instance=saved_event, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            event_saved = serializer.save()
        else:
            logger.error("Сериализатор неккоректен")
        return Response({
            "success": "Event '{}' updated successfully".format(event_saved.title)
        })
    
    def delete(self, request, pk):
        event = get_object_or_404(Event.objects.all(), pk=pk)
        event.delete()
        return Response({
            "message": "Event with title `{}` has been deleted.".format(event.title)
        }, status=204)

  



