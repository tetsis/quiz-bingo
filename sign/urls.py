from django.conf.urls import url
from . import views
from .forms import LoginForm

urlpatterns = [
    url(r'^regist/$', views.regist, name='regist'),
    url(r'^regist_save/$', views.regist_save, name='regist_save'),
    ]
