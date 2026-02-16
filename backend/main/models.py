from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Exam(models.Model):
    exam_name = models.CharField(max_length=100)
    subject_name = models.CharField(max_length=100)
    exam_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

class Classroom(models.Model):
    room_number = models.CharField(max_length=20)
    capacity = models.IntegerField()

class HallAllotment(models.Model):
    student_name = models.CharField(max_length=100)
    register_number = models.CharField(max_length=20)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=10)
