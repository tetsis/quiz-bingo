from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, 'index.html')

def quick(request):
    return render(request, 'quick.html')

@login_required
def edit(request):
    return render(request, 'edit.html')

def login(request):
    return render(request, 'login.html')

def unauthorized(request):
    return render(request, '401.html')

def register(request):
    return render(request, 'register.html')

def auth(request):
    bingo_name = request.POST['bingo_name']
    password = request.POST['password']
    bingo = authenticate(username=bingo_name, password=password)
    if bingo is not None:
        if bingo.is_active:
            django_login(request, bingo)
            return redirect('index')
        else:
            return redirect('401')
    else:
        return redirect('401')
