from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from .forms import RegisterForm

# Create your views here.

def regist(request):
    form = RegisterForm(request.POST or None)
    context = {
        'form': form,
    }
    return render(request, 'regist.html', context)

def regist_save(request):
    form = RegisterForm(request.POST)
    if form.is_valid():
        form.save()
        return redirect('login')

    context = {
        'form': form,
    }
    return render(request, 'regist.html', context)
