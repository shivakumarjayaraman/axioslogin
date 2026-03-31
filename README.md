# Axios Login — Demo Project

A React + Vite app that demonstrates JWT authentication and CRUD operations using Axios. Built as a teaching example.

## What this project covers

- Creating a configured **Axios instance** with a base URL and default headers
- **Request interceptors** — automatically attaching a JWT from `localStorage` to every outgoing request
- **Response interceptors** — detecting 401 errors, clearing the stored token, and notifying the app via a custom DOM event
- A clean **API layer** (`src/api/`) that centralises all HTTP calls so components never import Axios directly
- Full **CRUD** (Create, Read, Update, Delete) for a products resource

## Project structure

```
src/
├── api/
│   ├── axios.js       # Axios instance + interceptors
│   ├── auth.js        # login() — posts credentials, returns JWT
│   └── products.js    # getProducts, createProduct, updateProduct, deleteProduct
├── components/
│   ├── LoginForm.jsx  # Login screen (shown when no token is stored)
│   ├── ProductForm.jsx # Create / edit form (dual-mode)
│   └── ProductList.jsx # Renders the product list with Edit / Delete buttons
└── App.jsx            # State management and wiring
```

## How it works

1. **Login** — `auth.js` posts credentials to `/api/auth/login` and returns the JWT string. `App.jsx` saves it to `localStorage` and state.
2. **Authenticated requests** — every call made through the shared `api` instance in `axios.js` automatically gets an `Authorization: Bearer <token>` header via the request interceptor.
3. **Token expiry** — when the server returns a 401, the response interceptor removes the token from `localStorage` and dispatches an `auth:logout` DOM event. `App.jsx` listens for that event and returns the user to the login screen.
4. **CRUD** — `products.js` wraps the four HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`). Components call these functions and never touch Axios directly.

## Getting started

You need a backend running at `http://localhost:8080/api` that provides:

- `POST /auth/login` → `{ token: "<jwt>" }`
- `GET /products` → array of products
- `POST /products` → created product
- `PUT /products/:id` → updated product
- `DELETE /products/:id` → 204 No Content

```bash
npm install
npm run dev
```

---

## Student exercises

These exercises build on the concepts shown in this project. Complete them in order.

### 1. Add a `register` function
In `src/api/auth.js`, add a `register(username, password)` function that posts to `/api/auth/register`. Then add a simple "Register" button to `LoginForm.jsx` that calls it and logs the response to the console.

**Goal:** practice making a POST request and reading the response.

### 2. Add a loading spinner to the login button
In `LoginForm.jsx`, add a `submitting` state variable. Set it to `true` before the `login()` call and back to `false` in a `finally` block. Disable the button and change its text to `"Logging in..."` while `submitting` is true.

**Goal:** practice async state management with `try/finally`.

### 3. Add a `getProduct(id)` call
`src/api/products.js` already has a `getProduct(id)` function but the UI never uses it. Make clicking a product name fetch that single product from the API and `console.log` the result.

**Goal:** practice using an existing API function and wiring it to a UI event.

### 4. Show the error message from the server
In `ProductForm.jsx`, the catch block currently shows a generic fallback message. Change it so that if the server returns a message in `err.response.data.message`, that exact message is shown instead of the fallback.

**Goal:** practice reading nested error response data.

### 5. Add a second resource
Create `src/api/categories.js` with `getCategories()` and `createCategory(name)` functions, following the same pattern as `products.js`. Then display the list of categories somewhere in the UI.

**Goal:** practice creating a new API module from scratch.

### 6. Log all requests in the console
Add a second request interceptor in `axios.js` (you can have more than one) that `console.log`s the HTTP method and URL of every outgoing request before it is sent.

**Goal:** understand that interceptors can be chained and are useful for debugging.
