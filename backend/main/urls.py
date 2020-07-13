from django.contrib import admin
from django.urls import path
from . import views


app_name = 'main'


urlpatterns = [
    path('rest/', views.EventView.as_view()),
    path('rest/<int:pk>/', views.EventView.as_view()),
]
