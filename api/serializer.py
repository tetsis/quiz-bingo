from rest_framework import serializers
from .models import quiz

class quizSerializer(serializers.ModelSerializer):
    class Meta:
        model = quiz
        fields = ('bingo_id', 'question', 'answer', 'genre')
