from django.db import models

# Create your models here.
class bingo(models.Model):
    hash = models.CharField(max_length=128)

class quiz(models.Model):
    bingo_id = models.ForeignKey(bingo)
    question = models.TextField()
    answer = models.TextField()
    genre = models.CharField(max_length=128)
    solved = models.BooleanField(default=False)

