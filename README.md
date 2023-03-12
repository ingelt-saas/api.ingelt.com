# InGelt Board Server

This is the server side of InGelt Board. This script serves ReactJS based Frontend for:

- STUDENT
- TEACHER
- ADMIN
- PRODUCT PAGE

### Our Software uses following tech-stack:

- NodeJS: for the run-time environment.
- ExpressJS: application framework.
- MySQL: database
- Docker: for containerizing the application.

### Directory Structure

    / config (stores DB configuration).
        / config.json

    / models (stores model files & index.js).
        / associations (contains all association rules for Database).

    / services (contains all services i.e. API endpoints with functionality created using utils).

    / utils (contains all utils i.e. CRUD functions for all Models).

    - server.js
    - Dockerfile
    - .env
    - package.json
    - package-lock.json
    - .gitignore
    - README

### More Information:

**IMPORTANT:** Use camelCase for naming any variable, model, file, attribute, etc.

**Type of API:** REST

**Recommended:** Install and use MySQL Workbench to work smoothly with the database.
