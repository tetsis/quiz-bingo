from django.shortcuts import render
from rest_framework import viewsets
from .models import quiz
#from .models import bingo
from .serializer import quizSerializer
#from .serializer import bingoSerializer

# Create your views here.
class quizViewSet(viewsets.ModelViewSet):
    queryset = quiz.objects.all()
    serializer_class = quizSerializer
    filter_fields = ('user',)

#class bingoViewSet(viewsets.ModelViewSet):
#    queryset = bingo.objects.all()
#    serializer_class = bingoSerializer
