# 1. Start with the official Python image
FROM python:3.9-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the requirements file
COPY requirements.txt .

# 4. Install any dependencies (right now, this won't do anything)
RUN pip install -r requirements.txt

# 5. Copy the rest of the application code
COPY . .

# 6. Tell Docker what command to run when the container starts
CMD ["uvicorn", "analyzer:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]