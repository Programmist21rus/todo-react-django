from rest_framework import serializers
from .models import *


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class Tag_recordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag_record
        fields = "__all__"
