# URL Shortener API Documentation

## Overview
This API allows users to shorten URLs, manage their shortened links, and generate QR codes for easy sharing. It provides endpoints for creating, fetching, updating, and deleting URLs, as well as user authentication features.

## Base URL
The base URL for the API is `http://localhost:8080`.

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Users must sign up and log in to receive a token, which must be included in the headers of subsequent requests.

### Endpoints

### 1. User Authentication
- **POST /auth/signup**
  - **Description**: Create a new user account.
  - **Request Body**:
    ```json
    {
      "firstname": "string",
      "lastname": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - Status: 201 Created
    - Body:
    ```json
    {
      "status": "Successful",
      "data": {
        "user": { ... }
      }
    }
    ```

- **POST /auth/login**
  - **Description**: Log in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - Status: 200 OK
    - Body:
    ```json
    {
      "status": "Successful",
      "data": {
        "user": { ... }
      }
    }
    ```

### 2. URL Management
- **POST /url/shorten**
  - **Description**: Shorten a single URL.
  - **Request Body**:
    ```json
    {
      "originalUrl": "string",
      "customAlias": "string (optional)",
      "expiresAt": "date (optional)"
    }
    ```
  - **Response**:
    - Status: 201 Created
    - Body:
    ```json
    {
      "status": "success",
      "message": "URL Shortened Successfully",
      "url": "shortened_url"
    }
    ```

- **POST /url/shorten/multiple**
  - **Description**: Shorten multiple URLs at once.
  - **Request Body**:
    ```json
    {
      "urls": [
        {
          "originalUrl": "string",
          "customAlias": "string (optional)",
          "expiresAt": "date (optional)"
        }
      ]
    }
    ```
  - **Response**:
    - Status: 201 Created
    - Body:
    ```json
    {
      "status": "success",
      "message": "Urls Shortened Successfully",
      "urls": [
        {
          "originalUrl": "string",
          "shortUrl": "shortened_url"
        }
      ]
    }
    ```

- **GET /url/:id**
  - **Description**: Fetch the original URL using the shortened ID.
  - **Response**:
    - Status: 200 OK
    - Body:
    ```json
    {
      "status": "success",
      "redirect": "original_url"
    }
    ```

- **PUT /url/:id**
  - **Description**: Update an existing shortened URL.
  - **Request Body**:
    ```json
    {
      "originalUrl": "string",
      "customAlias": "string (optional)",
      "expiresAt": "date (optional)"
    }
    ```
  - **Response**:
    - Status: 200 OK
    - Body:
    ```json
    {
      "status": "success",
      "message": "URL updated successfully",
      "url": "shortened_url"
    }
    ```

- **DELETE /url/:id**
  - **Description**: Delete a shortened URL.
  - **Response**:
    - Status: 200 OK
    - Body:
    ```json
    {
      "status": "success",
      "message": "URL deleted successfully"
    }
    ```

### 3. QR Code Generation
- **POST /url/:id/qrcode**
  - **Description**: Generate a QR code for a shortened URL.
  - **Response**:
    - Status: 200 OK
    - Body:
    ```json
    {
      "status": "success",
      "message": "QRCode created successfully",
      "qrCode": "data_url"
    }
    ```

## Error Handling
The API returns appropriate HTTP status codes and error messages for various scenarios, such as invalid input, unauthorized access, and resource not found.

## Future Enhancements
- Password protected URLs
- Click analytics with geographical data
- URL collections/folders
- A/B testing support

## Conclusion
This documentation provides a comprehensive overview of the URL Shortener API, including its endpoints, request/response formats, and future enhancements. For any questions or issues, please refer to the support team.




