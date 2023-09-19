# Use the official Python base image
FROM python:3.11-slim    

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY ./requirements.txt /app/requirements.txt

# Install the project dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the application code to the working directory
COPY . /app/

ENV ENVIRONMENT=prod

# Expose the port that the FastAPI application will run on
EXPOSE 8000

# Set the command to run the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
