FROM python:3.7-slim

ENV WORK_DIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
