# PREREQUISITES

NODE
POSTGRESQL

# STEPS TO PERFORM BEFORE ACCESSING THE API

STEP 1 - Run the below Postgresql queries on any postgres tool to create tables with data

CREATE TABLE customers (
ID SERIAL PRIMARY KEY,
name VARCHAR(30),
email VARCHAR(30)
);

INSERT INTO customers (name, email)
VALUES ('Jerry', 'jerry@gmail.com'), ('George', 'george@gamil.com'),
('Simon', 'simon@gmail.com'), ('Gabriel', 'gabriel@gmail.com'),
('Patrick', 'patrick@gmail.com');

CREATE TABLE account_type (
ID SERIAL PRIMARY KEY,
type VARCHAR(30)
);

INSERT INTO account_type (type)
VALUES ('Savings'), ('Current'), ('basicSavings');

CREATE TABLE accounts (
ID SERIAL PRIMARY KEY,
amount INTEGER,
customer_id INTEGER,
account_type INTEGER,
updated_at timestamp not null default now(),
CONSTRAINT fk_customer
FOREIGN KEY(customer_id)
REFERENCES customers(id)
ON DELETE CASCADE,
CONSTRAINT fk_account_type
FOREIGN KEY(account_type)
REFERENCES account_type(id)
ON DELETE CASCADE
);

INSERT INTO accounts (amount, customer_id, account_type, updated_at)
VALUES (20000, 1, 3, now() ), (25000, 2, 2, now() ), (30000, 3, 3, now() ), (35000, 4, 1, now() ),
(40000, 5, 1, now() ), (45000, 1, 2, now() ), (50000, 2, 3, now() ), (55000, 3, 1, now() ),
(60000, 4, 1, now() ), (65000, 5, 2, now() );

STEP 2 - Update db-connector.js file with database connection details under path 'node-express-postgres\db-config'

STEP 3 - RUN command 'npm start' to initiate node process

# API DETAILS

ENDPOINT - /account/transfer
METHOD - PATCH
SAMPLE REQUEST PAYLOAD -
{
"fromAccountId": 7, // Integer
"toAccountId": 5, // Integer
"amount": 2000 // Integer (in paisa)
}

SAMPLE RESPONSE -
{
"newSrcBalance": 2900000, // Integer (in paisa)
"totalDestBalance": 12120000, // Integer (in paisa)
"transferredAt": "2021-09-25T14:13:53.988Z" // Timestamp
}
