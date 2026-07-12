# Database Setup

Before running the backend, create and initialize the PostgreSQL database.

---

## 1. Create the database

Open PostgreSQL and run:

```sql
CREATE DATABASE tourism_db;
```

---

## 2. Create the users table

Project structure:

```text
database/
│
├── schema/
│   └── users.sql
│
└── seeds/
    └── users.sql
```

Run the schema file:

```bash
psql -U dev_mateo -d tourism_db -f database/schemas/init.sql
```

---

## Example Schema

File: `database/schema/users.sql`

```sql
CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    profile_picture TEXT,

    biography TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

## 3. Insert sample data (optional)

Run the seed file:

```bash
psql -U postgres -d tourism_db -f database/seeds/users.sql
```

---

## Example Seed

File: `database/seeds/users.sql`

```sql
INSERT INTO users
(
    first_name,
    last_name,
    email,
    password
)
VALUES
(
    'Daniel',
    'Mendoza',
    'daniel@example.com',
    '123456'
);
```

---

## 4. Create the environment file

Create a `.env` file inside the backend folder.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=tourism_db
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## 5. Install dependencies

```bash
npm install
```

---

## 6. Start the development server

```bash
npm run dev
```

If everything is correct, you should see:

```text
Database connected successfully.
Server running on http://localhost:3000
```