from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'index.html')

def quick(request):
    return render(request, 'quick.html')

def make(request):
    return render(request, 'make.html')

#def make_quizes(request):



## Viewset class


