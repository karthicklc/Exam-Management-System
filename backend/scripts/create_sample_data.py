import os
import django
from datetime import date, time

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from main.models import Exam, Classroom, HallAllotment

# Create sample exam
exam, _ = Exam.objects.get_or_create(
    exam_name='Sample Exam',
    subject_name='Mathematics',
    exam_date=date.today(),
    start_time=time(9, 0),
    end_time=time(12, 0),
)

# Create sample classroom
classroom, _ = Classroom.objects.get_or_create(
    room_number='A101',
    defaults={'capacity': 50},
)

# Create hall allotment
hall, created = HallAllotment.objects.get_or_create(
    register_number='REG123',
    defaults={
        'student_name': 'Test Student',
        'exam': exam,
        'classroom': classroom,
        'seat_number': 'A1',
    }
)

print('Exam id:', exam.id)
print('Classroom id:', classroom.id)
print('HallAllotment id:', hall.id)
print('Created new HallAllotment:' , created)
