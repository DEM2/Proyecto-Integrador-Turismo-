# Backend Project Structure

## Overview

This backend uses a **layered architecture**. Each folder has one responsibility. This makes the project easier to read, maintain, test, and expand.

---

# Folder Structure

```text
backend/
│
├── database/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── querys/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# database/

This folder contains the SQL files used to create and initialize the database.

The backend does **not** read these files while the application is running.

Example:

```text
database/
│
├── schema/
│   ├── users.sql
│   ├── places.sql
│   ├── events.sql
│
├── seeds/
│   ├── users.sql
│   ├── categories.sql
│
└── README.md
```

### Purpose

* Create database tables
* Insert initial data
* Keep the database structure organized

---

# src/

This folder contains the application source code.

---

# config/

This folder contains the project configuration.

Example:

* Database connection
* Environment configuration

Example file:

```text
config/
└── db.js
```

Responsibilities:

* Connect to PostgreSQL
* Export the database connection
* Keep configuration in one place

---

# routes/

This folder defines the API endpoints.

Example:

```text
routes/
├── auth.routes.js
├── user.routes.js
├── place.routes.js
└── event.routes.js
```

Responsibilities:

* Define endpoints
* Connect routes with controllers
* Register middlewares

Routes should **not** contain business logic or SQL queries.

Example:

```javascript
router.post("/register", validateRegister, register);
```

---

# controllers/

Controllers receive HTTP requests.

Example:

```text
controllers/
├── auth.controller.js
├── user.controller.js
└── place.controller.js
```

Responsibilities:

* Receive request data
* Call services
* Return HTTP responses

Controllers should not access the database directly.

---

# services/

Services contain the business logic.

Example:

```text
services/
├── auth.service.js
├── user.service.js
└── place.service.js
```

Responsibilities:

* Apply business rules
* Validate application logic
* Call repositories

Examples:

* Check if an email already exists
* Encrypt passwords
* Generate JWT tokens
* Verify permissions

Services should not contain SQL queries.

---

# querys/

Querys communicate with PostgreSQL.

Example:

```text
repositories/
└── user.querys.js
```

Responsibilities:

* Execute SQL queries
* Insert data
* Update data
* Delete data
* Retrieve data

Repositories should not contain business logic.

---

# validators/

Validators check the input data before it reaches the controller.

Example:

```text
validators/
├── auth.validator.js
├── user.validator.js
└── place.validator.js
```

Responsibilities:

* Validate required fields
* Validate email format
* Validate password rules
* Validate request data

Validators should not access the database.

---

# middlewares/

Middlewares run before the controller.

Example:

```text
middlewares/
├── auth.middleware.js
├── permission.middleware.js
└── error.middleware.js
```

Responsibilities:

* Authenticate users
* Check permissions
* Handle errors
* Process requests before the controller

Example:

```text
Request
   ↓
Authentication
   ↓
Permission
   ↓
Controller
```

---

# app.js

This file creates the Express application.

Responsibilities:

* Create the Express app
* Register global middlewares
* Register application routes
* Export the app

Example:

```text
Create Express
        ↓
Load Middlewares
        ↓
Load Routes
        ↓
Export App
```

---

# server.js

This file starts the application.

Responsibilities:

* Connect to PostgreSQL
* Start the Express server
* Listen on the application port

This is the application entry point.

---

# .env

This file stores environment variables.

Example:

```text
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tourism_baq
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=mi_clave_secreta_para_firmar_tokens
JWT_EXPIRES_IN=1h
```

This file should never be uploaded to GitHub.

---

# package.json

This file manages the project.

Responsibilities:

* Store dependencies
* Define scripts
* Configure the Node.js project

Example scripts:

```text
npm run dev

```

---

# Complete Request Flow

```text
Client
   │
   ▼
Routes
   │
   ▼
Validators
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Querys
   │
   ▼
Database Connection
   │
   ▼
PostgreSQL
```

Each layer has one responsibility:

* **Routes** → Define API endpoints.
* **Validators** → Validate input data.
* **Controllers** → Handle HTTP requests and responses.
* **Services** → Apply business logic.
* **Querys**→ Execute SQL queries.
* **Config** → Configure the application.
* **Database** → Store and manage application data.

# Ai integration 

routes/ai.routes.js
    defines the route

controllers/ai.controller.js
    receives the message and responds

services/deepseek.service.js
    calls DeepSeek

prompts/tourism.prompt.js
   Ai's prompt for the context 

utils/deepseek-error.js
    translates technical errors