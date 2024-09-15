# Hotel Booking Application

## Overview

This is a full-featured hotel booking application developed with React.js for the frontend and Spring Boot for the backend. It provides a comprehensive solution for managing hotel bookings, including functionalities for room management, booking management, and user interactions.

## Features

- User Features:
  - Search for available rooms based on check-in and check-out dates and room type.
  - View and book available rooms.
  - Cancel bookings.

- **Admin Features**:
  - Add, update, and delete rooms.
  - Retrieve all rooms and bookings.
  - Filter rooms by room type.
  - Get bookings by ID and confirmation code.

- **Common Features**:
  - Pagination for room and booking listings.
  - Data validation for all inputs.
  - Image upload and retrieval for room photos.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Spring Boot
- **Database**: MySQL
- **APIs**: RESTful APIs
- **Build Tools**: Maven
- **Image Handling**: Base64 encoding for room photos

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- MySQL Database

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/hotel-booking-app.git
    cd hotel-booking-app
    ```

2. **Backend Setup**:
    - **Navigate to the backend directory**:
      ```bash
      cd backend
      ```
    - **Configure the Database**:
      - Install and run MySQL server.
      - Create a new database (e.g., `hotel_booking`).
      - Update the database settings in `src/main/resources/application.properties`:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/hotel_booking
        spring.datasource.username=your-username
        spring.datasource.password=your-password
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
        ```
    - **Run the Backend Application**:
      ```bash
      mvn spring-boot:run
      ```

3. **Frontend Setup**:
    - **Navigate to the frontend directory**:
      ```bash
      cd ../frontend
      ```
    - **Install Dependencies**:
      ```bash
      npm install
      ```
    - **Run the Frontend Application**:
      ```bash
      npm start
      ```

## API Endpoints

### Room Management

- **Add a New Room**:
  - **Endpoint**: `POST /api/v1/room/add`
  - **Parameters**:
    - `photo` (optional): `MultipartFile`
    - `roomType`: `String`
    - `roomPrice`: `double`

- **Get All Room Types**:
  - **Endpoint**: `GET /api/v1/room/room-types`
  - **Response**: `List<String>`

- **Get All Rooms**:
  - **Endpoint**: `GET /api/v1/room/all-rooms`
  - **Response**: `List<RoomDTO>`

- **Get Room by ID**:
  - **Endpoint**: `GET /api/v1/room/room/{id}`
  - **Parameters**:
    - `id`: `int`
  - **Response**: `RoomDTO`

- **Update Room**:
  - **Endpoint**: `PUT /api/v1/room/update/{id}`
  - **Parameters**:
    - `id`: `int`
    - `roomType` (optional): `String`
    - `roomPrice` (optional): `double`
    - `photo` (optional): `MultipartFile`

- **Delete Room**:
  - **Endpoint**: `DELETE /api/v1/room/delete/{id}`
  - **Parameters**:
    - `id`: `int`

- **Get Available Rooms**:
  - **Endpoint**: `GET /api/v1/room/available-rooms`
  - **Parameters**:
    - `checkInDate`: `LocalDate` (format `yyyy-MM-dd`)
    - `checkOutDate`: `LocalDate` (format `yyyy-MM-dd`)
    - `roomType`: `String`
  - **Response**: `List<RoomDTO>`

### Booking Management

- **Get All Bookings**:
  - **Endpoint**: `GET /api/v1/bookings/all-bookings`
  - **Response**: `List<BookedRoomDTO>`

- **Get Booking by Confirmation Code**:
  - **Endpoint**: `GET /api/v1/bookings/confirmation/{bookingConfirmationCode}`
  - **Parameters**:
    - `bookingConfirmationCode`: `String`
  - **Response**: `BookedRoomDTO`

- **Create a Booking**:
  - **Endpoint**: `POST /api/v1/bookings/room/{id}/booking`
  - **Parameters**:
    - `id`: `int`
  - **Request Body**: `BookedRoom` object

- **Cancel Booking**:
  - **Endpoint**: `DELETE /api/v1/bookings/booking/{bookingId}/delete`
  - **Parameters**:
    - `bookingId`: `int`

## Contact

For any questions or support, please contact chethanawijesinghe10@gmail.com

## Acknowledgments

- Thanks to the Spring community for excellent documentation.
- Credits to the developers of React, Spring Boot, and MySQL for their outstanding tools and frameworks.


