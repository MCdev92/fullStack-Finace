# Finance-App 🏦
This is a fullstack web application built on Python using "FastAPI" for the backend and "ReactJS" for the frontend. This project uses SQLite as a relational database to establish the connection port from the SQLite application to the fastAPI application.

## Installation 🏗️

### Prerequisites
* Python 3.7+ -> https://www.python.org/downloads/
* FastApi -> https://fastapi.tiangolo.com/
* React -> https://react.dev/learn/installation
* Nodejs-> https://nodejs.org/en
* Bootstrap 5 -> https://getbootstrap.com/docs/5.0/getting-started/introduction/

### Setup
1. Clone the repo
   bash <br>git clone https://github.com/MCdev92/React-FinanceApp.git<br>
2. Create virtual environment:
   `python3 -m venv env`
   `source env/bin/activate` 
4. Install project dependencies:
   `pip install fastapi uvicorn sqlalchemy` 
   `npm install axios`
5. Enable cors in the backend:
    `from fastapi.middleware.cors import CORSMiddleware` 
5. Run the app
    (backend): `python main.py` 
    (frontend):`react App.js` 
4. Head over to the Web browser and take a look at the finance app in action [localhost:3000] (http://localhost:3000/)

## Walkthrough/Demo

![walkthrough](finance-app.gif)
