# batch-3-assignment-3

# Assignment 3

An Express.js project using MongoDB, Mongoose and TypeScript with Zod validation.

## Prerequisites

- Node.js v14.x or later
- npm v6.x or later / yarn v1.x or later
- MongoDB

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/imoncoc/sports-facility-booking-platform-backend.git
   cd assignment-3
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory:

4. **Compile TypeScript**

   ```bash
   npm run build
   ```

5. **Run the Project**
   ```bash
   npm run start:dev
   ```

The application will run on `http://localhost:5000`.

- **Objective**: Developing the backend for a sports facility booking platform. This assignment focuses on implementing the following key functionalities: Error Handling, CRUD operations, Authentication & Authorization, and Transaction & Rollback if needed.

### Set up VERCEL live link

- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/`**

### **1. POST /api/auth/signup**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/auth/signup`**
- **Method: `POST`**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
```

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
```

### **2. POST /api/auth/login**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/auth/signup`**
- **Method: `POST`**

```json
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
```

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Ban Myeni, Dhaka"
  }
}
```

### **3. POST /api/facility**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/facility`**
- **Method: `POST`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

```json
{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
```

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

### **4. PUT /api/facility/:id**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/facility/:id`**
- **Method: `PUT`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

```json
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
```

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
```

### **5. DELETE /api/facility/:id**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/facility/:id`**
- **Method: `DELETE`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": true
  }
}
```

### **6. GET /api/facility**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/facility`**
- **Method: `GET`**

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
```

### **7. GET /api/check-availability**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/check-availability?date=2024-06-15`**
- **Method: `GET`**

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
    {
      "startTime": "08:00",
      "endTime": "10:00"
    },
    {
      "startTime": "14:00",
      "endTime": "16:00"
    }
  ]
}
```

### **8. POST /api/bookings**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/bookings`**
- **Method: `POST`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00",
  "endTime": "13:00"
}
```

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
```

### **9. GET /api/bookings**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/bookings`**
- **Method: `GET`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero",
        "email": "programming.hero@example.com",
        "phone": "+1234567890",
        "role": "user",
        "address": "456 Elm Street"
      },
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

### **10. GET /api/bookings/user**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/bookings`**
- **Method: `GET`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court",
        "description": "Outdoor tennis court with professional-grade surface.",
        "pricePerHour": 30,
        "location": "123 Main Street",
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": "60d9c4e4f3b4b544b8b8d1c4",
      "payableAmount": 90,
      "isBooked": " confirmed"
    }
  ]
}
```

### **11. DELETE /api/bookings/:id**

- **Sample Request Body**:
- **Endpoint**: **`https://sports-facility-booking-platform-backend.vercel.app/api/bookings/:id`**
- **Method: `GET`**
- **Headers: `Authorization: Bearer JWT_TOKEN`**

- **Sample Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking cancelled successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with professional-grade surface.",
      "pricePerHour": 30,
      "location": "123 Main Street",
      "isDeleted": false
    },
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "canceled"
  }
}
```
