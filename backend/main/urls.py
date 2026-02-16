from django.urls import path
from . import views

urlpatterns = [
    # Auth endpoints
    path('auth/register', views.register, name='register'),
    path('auth/login', views.login_view, name='login'),
    # path("signup/", views.signup),
    path('auth/me', views.get_user_info, name='get_user_info'),
    
    # Existing endpoints
    path('exams/', views.get_exams),
    path('classrooms/', views.get_classrooms),
    path('hall/', views.get_halls),
    path('create-exam/', views.create_exam),
]
