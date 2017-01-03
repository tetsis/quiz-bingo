from django.db import models
from django.contrib.auth.models import User

# Create your models here.
#class bingo(models.Model):
#    name = models.CharField(unique=True, max_length=128)
#    display_name = models.CharField(max_length=128)
#    password = models.CharField(max_length=128)
#
#    def __str__(self):
#        return self.display_name

class quiz(models.Model):
    user = models.ForeignKey(User)
    quiz_number = models.PositiveIntegerField(default=0)
    question = models.TextField()
    answer = models.TextField()
    genre = models.CharField(max_length=128)
    solved = models.BooleanField(default=False)

    def __str__(self):
        return self.question

