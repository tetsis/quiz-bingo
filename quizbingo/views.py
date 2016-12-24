from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse

def index(request):
    return render(request, 'index.html')

def quick(request):
    return render(request, 'quick.html')

def make(request):
    return render(request, 'make.html')
