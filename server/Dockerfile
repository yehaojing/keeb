FROM python:3.10

WORKDIR /usr/src/app

COPY . .

RUN pip install -r ./requirements.txt

CMD ["sh", "-c", "(cd src && alembic upgrade head) ; uvicorn src.app.main:app --host 0.0.0.0 --port 3001 ;"]