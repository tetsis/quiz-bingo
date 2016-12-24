from django.shortcuts import render
from rest_framework import viewsets
from .models import quiz
from .serializer import quizSerializer


# Create your views here.
class quizViewSet(viewsets.ModelViewSet):
    queryset = quiz.objects.all()
    serializer_class = quizSerializer
