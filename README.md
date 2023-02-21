# Keeb
Keeb is a simple full stack web application that represents a social platform for mechanical keyboard enthusiasts.

# Demo

## Run with Docker
### Dev Build
```
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up
```
The dev build frontend and backend containers bind mount their respective source code volumes onto your local machine. Because they are both running dev servers, you can make development code changes and see them reflected by the container.
### Prod Build
```
docker compose build
docker compose up
```

## Access
| Service | Where |
| -- | -- |
| Frontend (nginx) | `http://localhost:80/` |
| API docs | `http://localhost:3001/docs` (Swagger UI) or `http://localhost:3001/redoc` (ReDoc) |
| pgAdmin | `http://localhost:5050/` (see `docker-compose.yml` for login credentials for pgAdmin and PostgreSQL) |

# Tech Stack
## Frontend
- React - FE framework based on reusable components
    - Material UI - component library
    - React Router - client side routing
    - Axios - HTTP client to make requests to the backend

## Backend
- FastAPI - BE framework with OpenAPI and Pydantic support out of the box
    - Uvicorn - ASGI web server
    - Pydantic - request and response schemas
- SQLAlchemy - ORM for database operations
    - Alembic - schema migration for new columns and foreign keys

## Database
- PostgreSQL - SQL RDBMS
- pgAdmin - admin GUI for database to generate ERDs and make adhoc queries

## Reverse Proxy
- nginx - reverse proxy to handle andincoming requests

## Deployment
- Docker - containerise stack for portability