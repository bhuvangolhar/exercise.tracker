# Exercise Tracker

## Overview

This project is a backend microservice that allows users to track exercises using JavaScript and Node.js.  
It provides REST API endpoints to create users, add exercise records, and retrieve exercise logs in JSON format.

The service focuses on handling user data, storing exercise details, applying optional query filters, and returning structured responses suitable for frontend or API testing use.

---

## User Preferences

- **Preferred communication style**: Simple, everyday language.

---

## System Architecture

### Backend Architecture
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **API Design**: RESTful API with JSON responses
- **Routing**: Endpoint-based routing using Express
- **Data Storage**: In-memory storage or database (depending on implementation)
- **Error Handling**: Validation for missing or invalid inputs

---

## Exercise and User Handling

- Users are created with a unique username.
- Each user is assigned a unique ID.
- Exercises include:
  - Description
  - Duration (in minutes)
  - Date (optional)
- If no date is provided while adding an exercise, the current date is used.
- Exercise logs can be retrieved using optional query parameters:
  - `from` (start date)
  - `to` (end date)
  - `limit` (number of records)
- All dates in responses are returned in a human-readable format.

---

## API Specification

### Endpoints

POST /api/users  
POST /api/users/:_id/exercises  
GET /api/users/:_id/logs

### Request Parameters

#### Create User
- **username** (required):
  - String representing the user name

#### Add Exercise
- **description** (required):
  - Description of the exercise
- **duration** (required):
  - Duration in minutes (number)
- **date** (optional):
  - Date string in `YYYY-MM-DD` format

#### Get Logs (optional query params)
- **from**:
  - Start date filter
- **to**:
  - End date filter
- **limit**:
  - Maximum number of log entries

---

## Response Examples

#### Create User
```json
{
  "username": "john",
  "_id": "64f123abc456"
}

Add Exercise
{
  "username": "john",
  "description": "Running",
  "duration": 15,
  "date": "Mon Jan 01 2024",
  "_id": "64f123abc456"
}

Get Exercise Logs
{
  "username": "john",
  "count": 2,
  "_id": "64f123abc456",
  "log": [
    {
      "description": "Swimming",
      "duration": 30,
      "date": "Thu Nov 17 2023"
    },
    {
      "description": "Cycling",
      "duration": 45,
      "date": "Wed Aug 23 2022"
    }
  ]
}
