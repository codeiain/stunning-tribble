FROM python:3.8-slim-buster
COPY /src .

RUN pip install --no-cache-dir --upgrade -r requirements.txt
# RUN pipenv install --dev

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]



