FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# System dependencies for mysqlclient and general build tools
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       default-libmysqlclient-dev \
       gcc \
       curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

# Copy project
COPY . /app

# Collect static files (non-fatal if not configured)
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

# Use the PORT environment variable provided by Render; fallback to 8000 if not set
CMD ["sh", "-c", "gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3"]
