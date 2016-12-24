from rest_framework import serializers
from .models import quiz
from .models import bingo

class quizSerializer(serializers.ModelSerializer):
    class Meta:
        model = quiz
        fields = ('bingo_id', 'question', 'answer', 'genre', 'solved')

class bingoSerializer(serializers.ModelSerializer):
    class Meta:
        model = bingo
        fields = ('hash')
