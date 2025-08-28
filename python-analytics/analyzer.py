# 1. Import the FastAPI class
from fastapi import FastAPI

# 2. Create an "instance" of the FastAPI application
# This 'app' variable is the main point of interaction for our API
app = FastAPI()

# 3. Define an endpoint using a "decorator"
# This tells FastAPI that when someone visits the main URL ("/"),
# the function right below it should handle the request.
@app.get("/")
async def root():
    # 4. Return a simple JSON response
    return {"message": "Hello from the Python Analytics Service!"}