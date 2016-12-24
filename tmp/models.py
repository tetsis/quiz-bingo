from django.db import models

# Create your models here.
class quiz(models.Model):
    bingo_id = models.IntegerField()
    question = models.TextField()
    answer = models.TextField()
    genre = models.CharField(max_length=128)
