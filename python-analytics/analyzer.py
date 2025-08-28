# 1. Import the FastAPI class
from fastapi import FastAPI
import os         # For reading environment variables
import psycopg2   # For connecting to PostgreSQL

# 2. Create an "instance" of the FastAPI application
# This 'app' variable is the main point of interaction for our API
app = FastAPI()

def get_db_connection():
    try:
        conn = psycopg2.connect(dbname = os.getenv("DB_NAME"), user = os.getenv("DB_USER"), password = os.getenv("DB_PASS"), host = os.getenv("DB_HOST"))
        print("Database connection successful!") # It's good to keep this for debugging
        return conn
    except Exception as e:
        print("Database connection failed.")
        print(e)
        return None

@app.get("/")
async def root():
    conn = get_db_connection()
    if conn:
        # Don't forget to close the connection when you're done with it!
        conn.close() 
        return {"message": "Hello! I successfully connected to the database."}
    else:
        return {"message": "Hello! I failed to connect to the database."}