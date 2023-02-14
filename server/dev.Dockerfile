FROM python:3.10

WORKDIR /usr/src/app

COPY ./requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

CMD [ \
    # "cd", "src", "&&", "python", "-m", "alembic", "upgrade", "head", ";" \
    "python", "-m", "uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload" \
    ]