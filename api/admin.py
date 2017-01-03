from django.contrib import admin
from .models import quiz
#from .models import bingo

# Register your models here.

@admin.register(quiz)
class quiz(admin.ModelAdmin):
    pass

#@admin.register(bingo)
#class bingo(admin.ModelAdmin):
#    pass
