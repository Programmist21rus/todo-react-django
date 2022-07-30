from django.contrib import admin
from .models import Author, Record, Tag_record


admin.site.register(Author)
admin.site.register(Record)
admin.site.register(Tag_record)
