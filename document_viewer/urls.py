from django.urls import path
from . import views

app_name = 'document_viewer'

urlpatterns = [
    path('<str:document_name>/', views.document_gallery, name='document_gallery'),
]
