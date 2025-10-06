from django.shortcuts import render
import os
from django.conf import settings

def document_gallery(request, document_name):
    image_files = []
    title = ""
    
    # Define the directory where your static images are collected
    image_dir = os.path.join(settings.BASE_DIR, 'static', 'images')
    
    # Check if the directory exists to avoid errors
    if os.path.exists(image_dir):
        if document_name == 'articles-of-confederation':
            title = "The Articles of Confederation"
            # Find all files related to the Articles of Confederation
            for f in sorted(os.listdir(image_dir)):
                if f.startswith('00305_page-'):
                    image_files.append('images/' + f)
                    
        elif document_name == 'treaty-of-paris':
            title = "The Treaty of Paris"
            # Find all files related to the Treaty of Paris
            for f in sorted(os.listdir(image_dir)):
                if f.startswith('05477_2008_pages-to-jpg-'):
                    image_files.append('images/' + f)

    context = {
        'title': title,
        'image_files': image_files,
    }
    
    return render(request, 'document_viewer/gallery.html', context)
