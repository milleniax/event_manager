from django.contrib import admin
from django.urls import path
from . import views


app_name = 'main'


urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('create_event/', views.create_event, name='create_event'),
    path('event_list/', views.event_list, name='event_list'),
    path('rest/', views.EventView.as_view()),
    path('rest/<int:pk>/', views.EventView.as_view()),
]
