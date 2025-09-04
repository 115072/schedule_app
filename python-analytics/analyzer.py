# 1. Import the FastAPI class
from fastapi import FastAPI
import os         # For reading environment variables
import psycopg2   # For connecting to PostgreSQL
from pydantic import BaseModel
from typing import List 

# 2. Create an "instance" of the FastAPI application
# This 'app' variable is the main point of interaction for our API
app = FastAPI()

class DateRequest(BaseModel):
    dates: List[str]
#    user: int

@app.post("/pie")
async def root(dates: DateRequest):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        sql_query = ( "SELECT EXTRACT(EPOCH FROM SUM(evententry.duration)/60), tag.name FROM evententry "
                      "JOIN tag ON evententry.tag = tag.id "
                      "WHERE evententry.day = ANY (%s::date[]) " # <-- AND evententry.users = %s
                      "GROUP BY  tag.name" )
        parameters = (dates.dates,) # <--- , dates.user
        cursor.execute(sql_query, parameters)

        results = cursor.fetchall()
        conn.close()

        piechartData = {
            "labels": [],
            "minutes":[]

        }
        for x in results:
            piechartData["minutes"].append(x[0])
            piechartData["labels"].append(x[1])
        
        return piechartData

    
    


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



