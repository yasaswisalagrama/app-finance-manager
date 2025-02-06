# Personal Finance Manager (MVP)

## Folder Structure

The project follows a modular structure for easy management and scalability. Here's an overview:

finance-manager-backend/
│── app/
│   ├── main.py               # Entry point for FastAPI
│   ├── database.py           # Database connection
│   ├── models.py             # SQLAlchemy models
│   ├── schemas.py            # Pydantic schemas
│   ├── crud.py               # Database operations
│   ├── routes/
│   │   ├── auth.py           # Authentication routes
│   │   ├── transactions.py   # Expense/Income routes
│   ├── utils.py              # Helper functions (e.g., hashing passwords)
│── .env                      # Environment variables
│── requirements.txt
│── README.md


### **Explanation**:
- **app/**: Contains the core application code (FastAPI app, MongoDB interaction, route handling, etc.)
- **main.py**: The entry point for FastAPI where the app is initialized.
- **database.py**: Connects the app to MongoDB and handles database interactions.
- **models.py**: Defines the structure of the data (e.g., User, Transaction) as MongoDB documents.
- **schemas.py**: Defines Pydantic models to validate data going into and out of the API.
- **crud.py**: Contains the database interaction logic (e.g., creating a user, adding a transaction).
- **utils.py**: Utility functions like password hashing and token generation.
- **routes/**: Contains the routes for the API:
  - **auth.py**: Handles user authentication (Login, Register).
  - **transactions.py**: Handles transaction-related operations (Add/View transactions).
- **.env**: Stores environment variables (e.g., database URL, secret keys).
- **requirements.txt**: Lists all Python dependencies.
- **README.md**: This file—provides an overview of the project and its structure.

## Future Enhancements
- **Recurring Transactions**: Ability to add recurring income or expenses automatically.
- **Data Visualization**: Implementing graphs and charts for spending summaries.
- **Third-party API Integration**: Integrating external financial data from services like banks or stock market APIs.
