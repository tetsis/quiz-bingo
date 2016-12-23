from django.db import models

class quiz(models.Model):
    bingo_id = models.IntegerField()
    question = models.CharField()
    answer = models.CharField()
    genre = models.CharField()
