FROM python:3.9

WORKDIR /usr/src/app

COPY . .

RUN pip install -r ./requirements.txt

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]