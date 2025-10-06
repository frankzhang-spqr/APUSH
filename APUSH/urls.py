"""
URL configuration for APUSH project.
"""
from django.urls import path, include
from articles import views

urlpatterns = [
    path('documents/', include('document_viewer.urls')),
    path('', views.index, name='index'),
    path('articles/', include('articles.urls')),
]
