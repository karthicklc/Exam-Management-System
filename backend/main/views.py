from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Exam, Classroom, HallAllotment
import json
import jwt
from django.conf import settings
from functools import wraps
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt

# GET Exams
def get_exams(request):
    exams = list(Exam.objects.values())
    return JsonResponse(exams, safe=False)


# GET Classrooms
def get_classrooms(request):
    rooms = list(Classroom.objects.values())
    return JsonResponse(rooms, safe=False)


# GET Hall Allotments
def get_halls(request):
    halls = list(HallAllotment.objects.values())
    return JsonResponse(halls, safe=False)


# POST Create Exam
def create_exam(request):
    if request.method == "POST":
        data = json.loads(request.body)

        exam = Exam.objects.create(
            exam_name=data["exam_name"],
            subject_name=data["subject_name"],
            exam_date=data["exam_date"],
            start_time=data["start_time"],
            end_time=data["end_time"],
        )

        return JsonResponse({"message": "Exam Created"})

# AUTH ENDPOINTS
@csrf_exempt
def register(request):
    """Register a new user"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")
            print(f"Registering user: {name}, {email}, {password}")

            if not name or not email or not password:
                return JsonResponse(
                    {"message": "Name, email, and password are required"},
                    status=400
                )

            if User.objects.filter(email=email).exists():
                return JsonResponse(
                    {"message": "Email already exists"},
                    status=400
                )

            user = User.objects.create_user(
                username=name,
                email=email,
                password=password,
                first_name=name
            )

            return JsonResponse({
                "message": "User registered successfully",
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.email
                }
            }, status=201)

        except Exception as e:
            return JsonResponse(
                {"message": f"Registration failed: {str(e)}"},
                status=400
            )
    return JsonResponse({"message": "Method not allowed"}, status=405)


# def signup(request):
#     if request.method == "POST":
#         data = json.loads(request.body)

#         username = data.get("username")
#         password = data.get("password")

#         if User.objects.filter(username=username).exists():
#             return JsonResponse({"error": "User already exists"}, status=400)

#         User.objects.create_user(
#             username=username,
#             password=password
#         )

#         return JsonResponse({"message": "User created successfully"})
    
#     return JsonResponse({"error": "Invalid request"}, status=400)

# LOGIN
@csrf_exempt
def login_view(request):
    """Login user and return JWT token"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            print(f"Attempting login for email: {email}")

            # Find user by email
            user = User.objects.filter(email=email).first()

            if not user or not user.check_password(password):
                return JsonResponse(
                    {"message": "Invalid email or password"},
                    status=401
                )

            # Generate JWT token
            payload = {
                "user_id": user.id,
                "email": user.email,
                "exp": datetime.utcnow() + timedelta(days=7)
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

            return JsonResponse({
                "token": token,
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.email
                }
            }, status=200)

        except Exception as e:
            return JsonResponse(
                {"message": f"Login failed: {str(e)}"},
                status=400
            )
    return JsonResponse({"message": "Method not allowed"}, status=405)


def get_user_info(request):
    """Get current user info from JWT token"""
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JsonResponse({"message": "No token provided"}, status=401)

        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user = User.objects.get(id=payload["user_id"])

        return JsonResponse({
            "user": {
                "id": user.id,
                "name": user.first_name,
                "email": user.email
            }
        }, status=200)

    except jwt.ExpiredSignatureError:
        return JsonResponse({"message": "Token expired"}, status=401)
    except jwt.InvalidTokenError:
        return JsonResponse({"message": "Invalid token"}, status=401)
    except Exception as e:
        return JsonResponse(
            {"message": f"Error: {str(e)}"},
            status=400
        )