# Axios CRUD — Session 11

A React + Vite frontend that performs full CRUD operations against a Spring Boot REST API using Axios.

## Prerequisites

- Node.js installed
- The [Spring Boot backend](../backend) running on `http://localhost:8080`

## Setup

### 1. Install dependencies

```bash
npm install
```

This installs all dependencies including `axios`.

### 2. Get a JWT token

The API requires a valid JWT. Obtain one by logging in against the backend:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

Copy the token from the response.

### 3. Paste the token into `src/api/axios.js`

Open `src/api/axios.js` and replace the value of the `TOKEN` constant with your token:

```js
const TOKEN = 'paste-your-jwt-here'
```

> **Note:** The token will expire. If you see a 401 Unauthorized error in the UI, generate a new token and update this file.

### 4. Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Backend

This project requires the Spring Boot fullstack/backend project to be running. Make sure it is started before launching the frontend. The backend is expected at `http://localhost:8080`.

---

## Exercises

Pick one or two to try after reading through the code.

**1. Add a description column to the product list**
`ProductList.jsx` currently shows the product name, price, and stock quantity, but not the description. Display it below the product name in a smaller, muted style.

**2. Add a delete confirmation**
Right now clicking Delete removes the product immediately. Update `ProductList.jsx` so it asks `window.confirm('Delete this product?')` before calling `onDelete`. Notice where in the component this should go.

**3. Add a second validation rule to the form**
`ProductForm.jsx` already validates that name is non-empty and price is positive. Add a rule that rejects a `stockQuantity` below zero and shows an appropriate error message under the form.

**4. Extract the error banner into its own component**
The red error `<div>` in `App.jsx` and the error `<p>` in `ProductForm.jsx` both display error messages, but with different markup. Create a shared `ErrorMessage.jsx` component and use it in both places.
